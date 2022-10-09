import React from 'react'
import { useTheme } from "next-themes";


interface Props {
    children: React.ReactNode,
    name: string,
    variant?: 'primary' | 'secondary',
    submit?: Boolean,
    disabled?: Boolean,
    className?: string,
    onClick?: Function,
    tooltip?: Boolean
}



const Button = ({ children, variant = 'primary', submit = false, disabled = false, className, onClick, name, tooltip }: Props) => {
    const { theme } = useTheme();

    return (
        <button
            onClick={() => { onClick ? onClick() : null }}
            aria-label={name}
            type={submit ? 'submit' : 'button'}
            className={
                variant === 'primary'
                    ?
                    className + ' primary-button'
                    + (disabled ? ' disabled-button' : '')
                    + (tooltip ? ` tooltip` : '')
                    :
                    className + ' secondary-button'
                    + (disabled ? ' disabled-button' : '')
                    + (tooltip ? ` tooltip` : '')
            }
            disabled={disabled ? true : false}
        >
            {children}
            {
                tooltip && (<span className={`tooltiptext ${theme === 'light' ? 'tooltiptext-light' : 'tooltiptext-dark'}`}>{name}</span>)
            }
        </button>
    )
}


export default Button