import useClickOutside from 'components/hooks/useClickOutside'
import React from 'react'


interface Props {
    children: React.ReactNode,
    open: boolean,
    content: React.ReactNode,
    onClose: () => void,
    className?: string,
    classNamePop?: string,
    onClick?: () => void,
}


const Popover = ({ children, content, open, onClose, className, classNamePop, onClick }: Props) => {
    const wrapperRef = React.useRef(null)

    useClickOutside(wrapperRef, () => {
        onClose()
    })

    return (
        <div className={className + " relative "} onClick={() => onClick ? onClick() : {}}>
            {children}
            {
                open && (
                    <div ref={wrapperRef} className={classNamePop + " absolute z-20"}>
                        {content}
                    </div>
                )
            }
        </div>
    )
}


export default Popover