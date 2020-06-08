import React from 'react'

const CalculationList = ({list}) => {
    return(
        <div className="calculator-list-layout">
            <h2>Calculation List</h2>
            <ol>
                {list.length > 0 ? (
                    list.map((item, index)=><li key={index}>{item.text}</li>)
                ) : ''}
            </ol>
        </div>
    )
}

export default CalculationList