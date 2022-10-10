import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


interface ImageProps {
    src?: string,
    alt?: string,
    className?: any,
    fileTypeClassName?: any,
    onClick?: any,
    defaultComponent?: any,
    fileIcon?: Boolean,
    fileType?: string,
}


const Img = ({ src, alt, className, fileTypeClassName, onClick, defaultComponent, fileIcon, fileType }: ImageProps) => {
    return (
        <div className={className} onClick={onClick}>
            {
                (!src) ? (
                    <>
                        {
                            (defaultComponent) ? (
                                defaultComponent
                            ) : (
                                <Skeleton className="w-full h-full" />
                            )
                        }
                    </>
                ) : (
                    (fileType !== 'IMAGE') ? (
                        (fileIcon) ? (
                            <p className={`text-md ${fileTypeClassName}`}>{fileType}</p>
                        ) : (
                            (defaultComponent) ? (
                                defaultComponent
                            ) : (
                                <Skeleton className="w-full h-full" />
                            )
                        )
                    ) : (
                        <img src={src} alt={alt} className="w-full h-full" /> // eslint-disable-line
                    )
                )
            }
        </div>
    )
}


export default Img