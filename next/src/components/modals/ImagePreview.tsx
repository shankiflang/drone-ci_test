import React from 'react'
import { useImage } from 'components/hooks/useImage'
import { IoMdClose } from 'react-icons/io/index'


interface Props {
    file: any,
    handleClose?: any
}


const ImagePreview = ({ file, handleClose }: Props) => {
    const { Image } = useImage(
        {
            image: {
                ...file,
                modified_on: file.modified_on.toString(),
            }
        }
    )

    return (
        <div className="relative flex justify-center items-center flex-col bg-default rounded-lg overflow-hidden">
            <IoMdClose className="top-0 left-0 absolute bg-main rounded-full text-200 m-2 p-2 cursor-pointer transition-all w-10 h-10 hover:text-100 hover:bg-l-dark dark:hover:bg-d-light z-[210]" onClick={handleClose} />
            <Image className="max-w-full" alt={file?.title} />
        </div>
    )
}


export default ImagePreview