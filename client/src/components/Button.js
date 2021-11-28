import React from "react";
import "./button.css"

const STYLES = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--success--outline",
]

export const Button = ({
   children,
   type,
   onClick,
   buttonStyle,
   buttonSize
}) => {

    return (
        <button onClick={onClick} type={type}>
           {children}
        </button>
    )

};