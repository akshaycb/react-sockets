import React from 'react'

export const Display = (props) => {
    return (
        <div {...props}>
            {props.display}
        </div>
    )
}

export const Button = (props) => {
    return (        
        <button {...props}>{props.display}</button>
    )
}