import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import { apolloClient, apolloClientClassic, ApolloClientContext, initializeApollo } from 'lib/apollo/withApollo'




const GET_RECORD_BY_ID = (collection: string, fields: string) => gql`
    query get${collection.charAt(0).toUpperCase() + collection.slice(1).slice(0, -1)}ById($id: ID!) {
        ${collection}_by_id(id: $id) {
            ${fields}
        }
    }
`;


export type GetRecordQuery = any;

export type GetRecordQueryVariables = any;



export const useGetRecordQuery = (
    collection: string,
    fields: string,
    baseOptions?: Apollo.QueryHookOptions<GetRecordQuery, GetRecordQueryVariables>,
    system?: Boolean
) => {
    const opts = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useQuery<GetRecordQuery, GetRecordQueryVariables>(GET_RECORD_BY_ID(collection, fields), opts)
}



export const useLazyGetRecordQuery = (
    collection: string,
    fields: string,
    baseOptions?: Apollo.LazyQueryHookOptions<GetRecordQuery, GetRecordQueryVariables>,
    system?: Boolean
) => {
    const opts = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useLazyQuery<GetRecordQuery, GetRecordQueryVariables>(GET_RECORD_BY_ID(collection, fields), opts)
}



export type PageGetRecordComp = React.FC<{ data?: GetRecordQuery, error?: Apollo.ApolloError }>;

export async function getServerPageGetRecord(
    ctx: ApolloClientContext,
    collection: string,
    fields: string,
    baseOptions?: Omit<Apollo.QueryOptions<GetRecordQueryVariables>, 'query'>,
    system?: Boolean,
) {
    const apolloClient = system ?  initializeApollo() : apolloClientClassic

    const data = await apolloClient.query<GetRecordQuery>({ ...baseOptions, query: GET_RECORD_BY_ID(collection, fields) })

    const apolloState = apolloClient.cache.extract()

    return {
        props: {
            apolloState,
            data: data?.data[Object.keys(data?.data)[0]],
            error: data?.error ?? data?.error ?? null,
        }
    }
}

export const ssrGetRecord = {
    getServerPage: getServerPageGetRecord,
}