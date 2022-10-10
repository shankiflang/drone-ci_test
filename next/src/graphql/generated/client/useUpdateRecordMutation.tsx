import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import { apolloClient, apolloClientClassic } from "lib/apollo/withApollo";


const UPDATE_RECORDS = (collection: string, fields: string, system?: Boolean) => gql`
    mutation Update${collection.charAt(0).toUpperCase() + collection.slice(1)}($ids: [ID!]!, $item: update_${system ? 'directus_' : ''}${collection}_input!) {
        update_${collection}_items(ids: $ids, data: $item) {
            ${fields}
        }
    }
`


interface UpdateRecordMutation {
    __typename?: "Mutation",
}

interface UpdateRecordMutationVariables {
    id?: string | Number
    ids?: Array<string | number>
    item: any,
    system?: Boolean
}


export const useUpdateRecordMutation = (collection: string, fields: string, baseOptions?: Apollo.MutationHookOptions<UpdateRecordMutation, UpdateRecordMutationVariables>, system?: Boolean, multiple?: Boolean) => {
    const options = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useMutation<UpdateRecordMutation, UpdateRecordMutationVariables>(
        UPDATE_RECORDS(
            collection,
            fields,
            system
        ),
        options
    )
}