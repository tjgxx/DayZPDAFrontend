import React from "react"

export const Input = ({label, onChange, value}) => {
    return (
        <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
            {label && <div style={{color: '#dbded1', fontSize: 12}}>{label}</div>}
            <input 
                value={value}
                onChange={onChange}
                style={{backgroundColor: '#c4d1c8', padding: '8px 12px'}}
            />
        </div>
    )
}