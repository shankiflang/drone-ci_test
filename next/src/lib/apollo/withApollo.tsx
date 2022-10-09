import { useMemo } from 'react';
import { ApolloClient, ApolloLink, concat, gql, HttpLink, InMemoryCache, makeVar, NormalizedCacheObject, useQuery } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { GetServerSidePropsContext } from 'next';
import moment from 'moment';
import { signOut } from 'next-auth/react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
export type ApolloClientContext = GetServerSidePropsContext & { system?: Boolean };


export let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;


const systemEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql/system';
const clientEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql';

export const getCacheVariables = gql`
    query getIsRefreshRequest {
        isRefreshRequest
        isRefreshRequestFinished
        lastRequestTime
        accessToken
    }
`
// isRefreshRequest helpers
const isRefreshRequest = makeVar<boolean>(true)
const toggleIsRefreshRequest = () => {
    isRefreshRequest(false);
}

const isRefreshRequestFinished = makeVar<boolean>(false)
const isRefreshRequestFinishedEnd = () => {
    isRefreshRequestFinished(true);
}
const isRefreshRequestFinishedStart = () => {
    isRefreshRequestFinished(false);
}

// lastRequestTime helpers
const lastRequestTime = makeVar<Date>(new Date())
const refreshLastRequestTime = () => {
    lastRequestTime(new Date())
}

// accessToken helpers
const accessToken = makeVar<string>('')


// @ts-ignore
const authMiddleware = new ApolloLink(async (operation, forward) => {
    if (typeof window === 'undefined') {
        return forward(operation);
    }

    let fetchNewSession = false
    let token = undefined
    let refreshFinished = true
    let isNotRefresh = true
    if (apolloClient) {
        let cacheVariables = apolloClient.readQuery({ query: getCacheVariables })
        // If first request fetch new session
        if (cacheVariables?.isRefreshRequest === true) {
            fetchNewSession = true
            isNotRefresh = false
            toggleIsRefreshRequest()
        }
        if (cacheVariables?.isRefreshRequestFinished === false) {
            refreshFinished = false
        }
        // If last request time of session was more than 1 minute ago fetch new session
        if (moment(apolloClient.readQuery({ query: getCacheVariables })?.lastRequestTime).add(5, 'seconds').isBefore(new Date()) && cacheVariables?.isRefreshRequestFinished === true) {
            refreshLastRequestTime()
            isRefreshRequestFinishedStart()
            fetchNewSession = true
            isNotRefresh = false
            refreshFinished = false
        }
        // no conditions met, use existing session
        if (!fetchNewSession) {
            token = cacheVariables?.accessToken
        }
    }

    if (fetchNewSession) {
        let uri = fetchNewSession ? 'https://localhost/api/auth/session?origin=apollo' : 'https://localhost/api/auth/session'

        const res = await fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const session = await res.json();
        
        isRefreshRequestFinishedEnd()

        accessToken(session?.user?.accessToken ?? 'Anonymous')
        token = session?.user?.accessToken

        if (session?.user?.accessToken === undefined) {
            signOut()
        }
    }

    // if is not first request, but first request is not finished, wait for it to finish
    let waiting = false
    if (isNotRefresh && !refreshFinished) {
        waiting = true
    }


    if ((token !== undefined || 'Anonymous') && (!waiting)) {
        if (token === 'Anonymous') {
            return forward(operation);
        }

        // @ts-ignore
        const formattedHeaders = {
            authorization: 'Bearer ' + token,
        }
        operation.setContext(() => ({
            headers: formattedHeaders,
        }))
        return forward(operation)
    } else {
        if (waiting) {
            await new Promise(resolve => {
                let interval = setInterval(() => {
                    if (apolloClient?.readQuery({ query: getCacheVariables })?.isRefreshRequestFinished) {
                        clearInterval(interval)
                        // @ts-ignore
                        resolve()
                    }
                }, 10)
            })
            const formattedHeaders = {
                authorization: 'Bearer ' + (apolloClient!.readQuery({ query: getCacheVariables }).accessToken),
            }
            operation.setContext(() => ({
                headers: formattedHeaders,
            }))
            return forward(operation)
        } else {
            return forward(operation)
        }
    }
})


function getHttpLink() {
    if (typeof window === undefined) {
        return new HttpLink({
            uri: clientEndpoint,
            credentials: 'same-origin'
        })
    }

    return concat(
        authMiddleware,
        new HttpLink({
            uri: clientEndpoint,
            credentials: 'same-origin'
        })
    )
}

export const apolloClientClassic = new ApolloClient({
    ssrMode: typeof window === undefined,
    link: getHttpLink(),
    cache: new InMemoryCache({}),
})


function createApolloClientSystem() {
    return new ApolloClient({
        ssrMode: typeof window === undefined,
        link: concat(
            authMiddleware,
            new HttpLink({
                uri: systemEndpoint,
                credentials: 'same-origin',
            })
        ),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        isRefreshRequest: {
                            read() {
                                return isRefreshRequest();
                            }
                        },
                        isRefreshRequestFinished: {
                            read() {
                                return isRefreshRequestFinished();
                            }
                        },
                        lastRequestTime: {
                            read() {
                                return lastRequestTime();
                            }
                        },
                        accessToken: {
                            read() {
                                return accessToken();
                            }
                        }
                    }
                }
            }
        }),
    })
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
    const _apolloClient = apolloClient ?? createApolloClientSystem()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}