import axios from 'axios'

interface buildFormDataInterface {
    file?: object | Array<object>,
    data?: object | Array<object>,
}

interface DirectusFileUpload {
    file: object | Array<object>,
    data?: object | Array<object>,
}

interface DirectusFileUpdate {
    id: string | number,
    file?: object | Array<object>,
    data?: object | Array<object>,
}


export const buildFormData = ({ file, data } : buildFormDataInterface) => {
    let formData = new FormData()

    if (!Array.isArray(file)) {
        if (data && !Array.isArray(data)) {
            Object.entries(data).forEach(([key, value]) => {
                return formData.append(key as string, value as any);
            })
        } else if (data && Array.isArray(data)) {
            Object.entries(data[0]).forEach(([key, value]) => {
                return formData.append(key as string, value as any)
            })
        }
        formData.append('file', file as Blob)
    } else if (Array.isArray(file)) {
        (file as []).forEach((f: Blob, index) => {
            if (data && !Array.isArray(data)) {
                Object.entries(data).forEach(([key, value]) => {
                    return formData.append(key as string, value as any);
                })
            } else if (data && Array.isArray(data)) {
                Object.entries(data[index]).forEach(([key, value]) => {
                    return formData.append(key as string, value as any)
                })
            }
            formData.append('file', f)
        });
    }

    return formData
}




export const directusFileUpload = ({ file, data }: DirectusFileUpload) => {
    let formData = buildFormData({ file, data })

    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files`, formData)
}


export const directusFileUpdate = ({ id, file, data }: DirectusFileUpdate) => {
    let formData = buildFormData({ file, data })

    return axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${id}`, formData)
}