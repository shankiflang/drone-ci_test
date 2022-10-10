import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import { addApolloState, apolloClient, apolloClientClassic, initializeApollo } from "lib/apollo/withApollo";


const LIST_RECORDS = (collection: string, fields: string, options?: any) => gql`
        query ListRecords {
            ${collection}${options ? `(${JSON.stringify(options).slice(1, -1).replace(/"(\w+)"\s*:/g, '$1:').replace('"true"', 'true').replace('"false"', 'false')})` : ''} {
                ${fields}
            }
        }
    `;



export type ListRecordQuery = any;

export type ListRecordQueryVariables = any;


export const useListRecordQuery = (
    collection: string,
    fields: string,
    options?: any,
    baseOptions?: Apollo.QueryHookOptions<ListRecordQuery, ListRecordQueryVariables>,
    system?: Boolean
) => {
    const opts = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useQuery<ListRecordQuery, ListRecordQueryVariables>(LIST_RECORDS(collection, fields, options), opts)
}

export const useLazyListRecordQuery = (
    collection: string,
    fields: string,
    options?: any,
    baseOptions?: Apollo.LazyQueryHookOptions<ListRecordQuery, ListRecordQueryVariables>,
    system?: Boolean
) => {
    const opts = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useLazyQuery<ListRecordQuery, ListRecordQueryVariables>(LIST_RECORDS(collection, fields, options), opts)
}



export type PageListRecordComp = React.FC<{ data?: ListRecordQuery, error?: Apollo.ApolloError }>;

export async function getServerPageListRecord(
    collection: string,
    fields: string,
    options?: any,
    baseOptions?: Omit<Apollo.QueryOptions<ListRecordQueryVariables>, 'query'>,
    system?: Boolean,
) {
    // If system is true, we use the system client otherwise we use the client
    const apolloClient = system ? initializeApollo() : apolloClientClassic

    const data = await apolloClient.query<ListRecordQuery>({ ...baseOptions, query: LIST_RECORDS(collection, fields, options) })
    return addApolloState(apolloClient, {
        props: {
            data: data?.data[Object.keys(data?.data)[0]],
            error: data?.error ?? data?.error ?? null,
        }
    })
}

export const ssrListRecord = {
    getServerPage: getServerPageListRecord,
}