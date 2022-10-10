import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import { apolloClient, apolloClientClassic } from "lib/apollo/withApollo";


const CREATE_RECORD = (collection: string, fields: string) => gql`
    mutation Create${collection.charAt(0).toUpperCase() + collection.slice(1)}($item: create_${collection}_input!) {
        create_${collection}_item(data: $item) {
            ${fields}
        }
    }
`


interface CreateRecordMutation {
    __typename?: "Mutation",
}

interface CreateRecordMutationVariables {
    item: any,
}


export const useCreateRecordMutation = (
    collection: string,
    fields: string,
    baseOptions?: Apollo.MutationHookOptions<CreateRecordMutation, CreateRecordMutationVariables>,
    system?: Boolean
) => {
    const options = { ...baseOptions, client: system ? apolloClient : apolloClientClassic }

    return Apollo.useMutation<CreateRecordMutation, CreateRecordMutationVariables>(CREATE_RECORD(collection, fields), options)
}