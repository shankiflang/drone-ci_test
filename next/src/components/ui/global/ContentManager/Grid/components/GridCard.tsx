import { useImage } from 'components/hooks/useImage'
import React from 'react'
import clsx from 'clsx'
import { MdOutlineCircle, MdOutlineCheckCircleOutline } from 'react-icons/md/index'
import { useRouter } from 'next/router'
import { useResponsive } from 'components/hooks/useResponsive'



interface Props {
    collection: string,
    record: any,
    gridProperties: any,
    toggleSelected: any,
    index: number,
    selected: Array<any>,
    cardSize: {
        key: string,
        size: number,
    },
    mode: string,
    defaultUrl?: string,
}


const GridCard = ({ record, gridProperties, toggleSelected, index, selected, cardSize, mode, defaultUrl }: Props) => {
    const router = useRouter()
    const screen = useResponsive()

    const handleRedirectEdit = () => {
        if ((selected.length === 0 || !selected) && !mode.includes('pick')) {
            if (defaultUrl) {
                router.push(defaultUrl + '/' + record.id)
            } else {
                router.push(router.asPath + '/' + record.id)
            }
        }
    }

    let title = gridProperties.title.replace(/{{\w+}}/g, function (property: any) {
        return record[property.substring(2).slice(0, -2)]
    }).replaceAll('null', '').replaceAll('undefined', '').trim()
    let subTitle = gridProperties.subTitle.replace(/{{\w+}}/g, function (property: any) {
        return record[property.substring(2).slice(0, -2)]
    }).replaceAll('null', '').replaceAll('undefined', '').trim()
    let imageObject = gridProperties.image ? gridProperties.image.replace(/{{\w+}}/g, function (property: any) {
        let object = record[property.substring(2).slice(0, -2)]

        if (!object) {
            return undefined
        }

        return JSON.stringify(object)
    }) : JSON.stringify(record)

    const { Image } = useImage({
        image: imageObject === 'undefined' ? undefined : JSON.parse(imageObject),
        key: cardSize.key,
        defaultComponent: <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
                gridProperties.defaultIcon && (
                    <gridProperties.defaultIcon style={{
                        // color: `${theme.palette.text.disabled}`,
                        width: `${cardSize.size / 4}px`,
                        height: `${cardSize.size / 4}px`
                    }}
                    />
                )
            }
        </div>
    })

    return (
        <div
            className="cursor-pointer relative group transition-all"
            style={{
                width: cardSize.size,
            }}
            onClick={(e) => {
                if (selected.length > 0 || (selected.length === 0 && mode.includes('pick'))) {
                    e.stopPropagation()
                    toggleSelected(index)
                }
            }}
        >
            {
                !selected.includes(record.id) && (
                    <MdOutlineCircle
                        className={`absolute top-0 left-0 m-1 text-2xl text-white dark:text-d-100 dark:bg-d-default rounded-full z-[3] ${['sm', 'md'].includes(screen) ? 'opacity-50' : 'opacity-0'} group-hover:opacity-50 hover:opacity-100 transition-all`}
                        onClick={() => toggleSelected(index)}
                    />
                )
            }
            {
                selected.includes(record.id) && (
                    <MdOutlineCheckCircleOutline 
                        className="absolute top-0 left-0 m-1 text-2xl text-l-secondary-main dark:text-d-primary-main bg-default rounded-full z-[3] opacity-100"
                        onClick={() => toggleSelected(index)} 
                    />
                )
            }
            <div
                style={{
                    width: cardSize.size,
                    height: cardSize.size,
                    marginBottom: 8,
                }}
                onClick={() => handleRedirectEdit()}
                className={
                    clsx(
                        "relative z-[1] w-full rounded-lg bg-l-main dark:bg-d-dark flex items-center justify-center overflow-hidden group",
                        { ["border-[12px] border-solid border-l-secondary-main dark:border-d-primary-dark "]: selected.includes(record.id) }
                    )
                }
            >
                <div className="group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:w-full group-hover:h-12 group-hover:opacity-100 bg-linear-gradient"></div>
                <Image
                    alt="image"
                    className="text-500"
                />
            </div>
            <p
                onClick={() => handleRedirectEdit()}
                className="w-full h-5 text-[15px] leading-[20.8px] text-300 truncate"
                style={{
                    width: cardSize.size,
                }}
            >
                {
                    title === '' ? (
                        <span>--</span>
                    ) : (
                        <span>{title}</span>
                    )
                }
            </p>
            <p
                onClick={() => handleRedirectEdit()}
                className="w-full h-5 text-[15px] leading-[20.8px] text-500 truncate"
                style={{
                    width: cardSize.size,
                }}
            >
                {
                    subTitle === '' ? (
                        <span>--</span>
                    ) : (
                        <span>{gridProperties.subTitleFormatter ? gridProperties.subTitleFormatter(subTitle) : subTitle}</span>
                    )
                }
            </p>
        </div>
    )
}


export default GridCard