import React, { useEffect } from 'react';
import { Directus_Files } from 'graphql/generated/hooks';
import { directusFileUpdate } from 'lib/files';
import Img from 'components/ui/global/Img';


interface useImageProps {
    image?: Directus_Files | undefined | null | any,
    refetch?: () => void,
    key?: string,
    defaultImage?: string,
    defaultComponent?: any,
    loading?: Boolean,
    fileIcon?: Boolean,
}

interface handleUpdateImageProps {
    file?: Directus_Files,
    data?: object | Array<object>,
}


const icons = {
    'image': 'IMAGE',
    'audio': 'AUDIO',
    'video': 'VIDEO',
    'msword': 'WORD',
    'presentation': 'PPT',
    'vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'word': 'WORD',
    'xml': 'CODE',
    'x-rar-compressed': 'RAR',
    'zip': 'ZIP',
    'javascript': 'JS',
    'json': 'JSON',
    'ogg': 'OGG',
    'pdf': 'PDF',
    'html': 'HTML',
    'text/plain': 'TXT',
    '': 'FICHIER',
}


export const useImage = ({ image, refetch, key, defaultImage, defaultComponent, loading, fileIcon = true }: useImageProps) => {
    const [src, setSrc] = React.useState<string | undefined>(defaultImage && !loading ? defaultImage : undefined)
    const [iconType, setIconType] = React.useState<string | undefined>(undefined)

    useEffect(() => {
        if (image) {
            let cacheId = image.modified_on.replace(/[^A-Za-z0-9]+/g, '')
            let imageParams = ((key) ? ('?key=' + key) : ('')) + ((key) ? ('&cache=' + cacheId) : ('?cache=' + cacheId))
            let url = process.env.NEXT_PUBLIC_BACKEND_URL + '/assets/' + image.id + imageParams

            setSrc(url)
        } else if (defaultImage && !loading) {
            setSrc(defaultImage)
            return setIconType('IMAGE')
        } else if (!defaultImage && !loading) {
            setSrc(undefined)
        }
        handleFindIcon()
    }, [image, key, defaultImage, loading]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleFindIcon = () => {
        if (image && image.type) {
            let match = null

            for (const [key, value] of Object.entries(icons)) {
                if (image.type.includes(key)) {
                    match = value
                    break
                }
            }
            setIconType(match?.split('.')[0])
        } else {
            setIconType('')
        }
    }

    const handleUpdateImage = async ({ file, data }: handleUpdateImageProps) => {
        if (image && image.id && (file || data)) {
            await directusFileUpdate({ id: image.id, file, data })
            if (refetch) {
                let response = await refetch()
                return { success: true, data: response }
            }
            return { success: true }
        } else {
            return { error: "Impossible de mettre à jour le l'image sans toutes les informations nécessaires.", success: false }
        }
    }

    
    const ImageComponent = ({ ...props }) => {
        return (
            <Img src={src} {...props} defaultComponent={defaultComponent} fileIcon={fileIcon} fileType={iconType} />
        )
    }
    
    
    return {
        src,
        loading: !src,
        updateImage: handleUpdateImage,
        Image: ImageComponent as React.FunctionComponent<React.PropsWithChildren<any>>,
        iconType
    };
};