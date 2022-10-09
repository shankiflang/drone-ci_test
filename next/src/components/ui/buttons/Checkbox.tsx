import React from 'react'

interface Props {
    children: React.ReactNode,
    className?: string,
    onClick?: Function,
    checked?: Boolean,
    indeterminate?: Boolean,
}

const Checkbox = ({ children, className, onClick, checked, indeterminate }: Props) => {
    return (
        <button
            type={'button'}
            role={'checkbox'}
            aria-label={'checkbox'}
            data-checked={checked ? true : false}
            aria-checked={checked ? true : false}
            data-inteterminate={indeterminate ? true : false}
            className={
                className + ' relative transition-all w-5 h-5 cursor-pointer border-2 border-l-border-dark dark:border-d-border-light rounded-sm hover:border-l-primary-main dark:hover:border-d-primary-main'
                + (checked ? ' border-l-primary-main dark:border-d-primary-main' : '')
            }
            onClick={() => { onClick ? onClick() : null }}
        >
            {children}
        </button>
    )
}

export default Checkbox