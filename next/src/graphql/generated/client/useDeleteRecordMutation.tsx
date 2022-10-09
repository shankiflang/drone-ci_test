import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import { apolloClient, apolloClientClassic } from "lib/apollo/withApollo";



const DELETE_RECORD_BY_IDS = (collection: string) => gql`
    mutation delete${collection.charAt(0).toUpperCase() + collection.slice(1).slice(0, -1)}ByIds($ids: [ID!]!) {
        delete_${collection}_items(ids: $ids) {
            ids
        }
    }
`;


interface DeleteRecordMutation {
    __typename?: "Mutation",
}

interface UpdateRecordMutationVariables {
    ids: Array<string | Number>
}


export const useDeleteRecordMutation = (
    collection: string, 
    baseOptions?: Apollo.MutationHookOptions<DeleteRecordMutation, UpdateRecordMutationVariables>, 
    system?: Boolean
) => {
    const opts = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useMutation<DeleteRecordMutation, UpdateRecordMutationVariables>(DELETE_RECORD_BY_IDS(collection), opts)
}

export const useLazyDeleteRecordMutation = (
    collection: string, 
    baseOptions?: Apollo.MutationHookOptions<DeleteRecordMutation, UpdateRecordMutationVariables>, 
    system?: Boolean
) => {
    const opts = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useMutation<DeleteRecordMutation, UpdateRecordMutationVariables>(DELETE_RECORD_BY_IDS(collection), opts)
}