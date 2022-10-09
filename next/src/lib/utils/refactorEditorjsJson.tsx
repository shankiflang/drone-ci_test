export default function refactorEditorjsJson(object: any, add?: boolean) {
    let newObject = JSON.parse(JSON.stringify({ ...object }))

    if (newObject?.blocks?.length) {
        if (add) {
            for (let index = 0; index < newObject?.blocks?.length; index++) {
                const block = newObject.blocks[index];
    
                if (block?.data?.file?.url && !block?.data?.file?.url.includes(process.env.NEXT_PUBLIC_BACKEND_URL)) {
                    newObject.blocks[index].data.file.url = process.env.NEXT_PUBLIC_BACKEND_URL + block.data.file.url
                }
            }
        } else {
            for (let index = 0; index < newObject?.blocks?.length; index++) {
                const block = newObject.blocks[index];
    
                if (block?.data?.file?.url && block?.data?.file?.url.includes(process.env.NEXT_PUBLIC_BACKEND_URL)) {
                    newObject.blocks[index].data.file.url = block.data.file.url.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '')
                }
            }
        }
    }

    return newObject
}