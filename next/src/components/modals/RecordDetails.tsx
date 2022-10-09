import { useGetRecordQuery } from 'graphql/generated/client/useGetRecordQuery';
import humanize from 'lib/utils/humanize';
import React from 'react'
import { IoMdClose } from 'react-icons/io/index';
import omitDeep from 'omit-deep-lodash'
import schemas from 'graphql/schemas'
import { useGetAllFieldsInCollectionQuery } from 'graphql/generated/hooks';
import getValue from 'lib/utils/getValue'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


interface Props {
    recordId: any;
    collection: string,
    system?: Boolean,
    handleClose?: any,
}


const RecordDetails = ({ recordId, collection, system, handleClose }: Props) => {
    const { data, loading } = useGetRecordQuery(
        collection,
        schemas.find((schema: any) => (schema.name === collection) || (schema.name === ('directus_' + collection)))?.schema ?? 'id',
        {
            variables: {
                id: recordId
            }
        },
        system ?? false
    )
    const { data: { fields_in_collection: fields = {} } = {} } = useGetAllFieldsInCollectionQuery({
        variables: {
            collection: system ? 'directus_' + collection : collection
        }
    })

    return (
        <div className="h-screen max-w-full flex justify-start items-start flex-col">
            <div className="flex flex-col justify-start items-start">
                <div className="m-4 mt-8 ml-0 flex flex-row justify-start items-center">
                    <IoMdClose className="bg-main rounded-full p-2 ml-4 text-200 cursor-pointer transition-all w-10 h-10 hover:text-100 hover:bg-l-dark dark:hover:bg-d-light z-[210]" onClick={handleClose} />
                    <h2 className="text-2xl ml-2">{humanize(collection)}</h2>
                </div>
                {
                    !loading && data && (
                        Object.entries(omitDeep(data[Object.keys(data)[0]], 'id')).map(([key, value], index) => {
                            if (key === '__typename') {
                                return
                            }
                            let v = getValue(key, value, fields as any[])
                            if (v === '--') {
                                return
                            }
                            return (
                                <div className="m-4 flex flex-col justify-start items-start" key={index}>
                                    <h6 className="text-100">{humanize(key)}:</h6>
                                    <p className="text-400">{v}</p>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}


export default RecordDetails