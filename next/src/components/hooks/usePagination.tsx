import React, { useEffect } from 'react';
import { useListRecordQuery } from 'graphql/generated/client/useListRecordQuery';


// props => function to get records, collection, options, nperpage
// returns => records, page, setPage, nrecords, 




interface Props {
    collection: string,
    options: any,
    recordsPerPage: number,
    isSystem?: boolean,
    defaultFilter?: any,
}


export const usePagination = ({ collection, options, recordsPerPage, isSystem, defaultFilter }: Props) => {
    const [numberOfRecords, setNumberOfRecords] = React.useState<any>([])
    const [page, setPage] = React.useState<number>(1)
    const [offset, setOffset] = React.useState<number>(0)

    const { data, refetch } = useListRecordQuery(
        collection,
        'id',
        {
            ...options,
            filter: {
                _and: (defaultFilter ?? []).concat(options?.filter?._and ?? [])
            },
            limit: 10000
        },
        {
            fetchPolicy: 'network-only',
            nextFetchPolicy: 'cache-first'
        },
        (isSystem ? true : false),
    )

    useEffect(() => {
        if (data && data[collection])  {
            setNumberOfRecords(data[collection].length)
        }
    }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

    // setpage should change offset too
    useEffect(() => {
        setOffset(recordsPerPage * (page - 1))
    }, [page])  // eslint-disable-line react-hooks/exhaustive-deps

    // an option for infinite scroll that load 1 page more than the current one

    return {
        offset,
        limit: recordsPerPage,
        page,
        setPage,
        refetchPagination: refetch,
        numberOfRecords: numberOfRecords,
        numberOfPages: Math.ceil(numberOfRecords / recordsPerPage),
    }
}


export default usePagination