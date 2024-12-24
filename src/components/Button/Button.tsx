import React from 'react';

export const Button = ({children, onClick, variant}) => {
    const getButtonStyling = () => {
        if (variant === 'Primary') {
            return ({
                backgroundColor: '#0e2432', 
                color: '#dbded1'
            })
        };
        if (variant === 'Secondary') {
            return ({
                backgroundColor: '#9ba6a0',
                color: '#0e2432'
            })
        }
    }
    return (
        <button onClick={onClick} style={getButtonStyling()}>{children}</button>
    )
}