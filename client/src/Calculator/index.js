import React from 'react'
import io from "socket.io-client";
import './index.css'
import {Display, Button} from './Components'
import CalculationList from '../CalculationList'

const socket = io("http://localhost:4000")

const Calculator = () => {
    const [displayString, setDisplayString] = React.useState('0')
    const [calculationArray, setCalculationArray] = React.useState([])
    const [calculations, setCalculations] = React.useState([])

    React.useEffect(()=>{
        socket.on("calculations", calculation => {
            setCalculations(calculations => {
                return [calculation, ...calculations].length > 10 ? [calculation, ...calculations].slice(0,10) : [calculation, ...calculations]
            })
        })
    }, [])

    const postCalculation = (calculationString) => {
        socket.emit('send', calculationString)
    }

    const operation = ({target}) => {
        const calculationArrayCopy = calculationArray
        if(calculationArrayCopy.length > 0){
            if(!isNaN(calculationArrayCopy[calculationArrayCopy.length-1])){                
                calculationArrayCopy.push(`${target.value}`)
            } else {
                calculationArrayCopy[calculationArrayCopy.length-1] = target.value
            }
        } else {
            if(target.value === '-'){                
                calculationArrayCopy.push(`${target.value}`)
            }
        }
        setCalculationArray([...calculationArrayCopy])
        setDisplayString(calculationArrayCopy.join(''))
    }

    const clear = () => {
        setCalculationArray([])
        setDisplayString('0')
    }

    const number = ({target}) => {
        const calculationArrayCopy = calculationArray
        if(!isNaN(calculationArrayCopy[calculationArrayCopy.length-1])){
            calculationArrayCopy[calculationArrayCopy.length-1] = calculationArrayCopy[calculationArrayCopy.length-1]+target.value
        } else {
            calculationArrayCopy.push(`${target.value}`)
        }
        
        setCalculationArray([...calculationArrayCopy])
        setDisplayString(calculationArrayCopy.join(''))
    }

    const point = ({target}) => {
        const calculationArrayCopy = calculationArray
        if(!isNaN(calculationArrayCopy[calculationArrayCopy.length-1])){
            if(!calculationArrayCopy[calculationArrayCopy.length-1].includes('.')){
                calculationArrayCopy[calculationArrayCopy.length-1] = calculationArrayCopy[calculationArrayCopy.length-1]+target.value
            }
        } else {
            calculationArrayCopy.push(`0${target.value}`)
        }
        setCalculationArray([...calculationArrayCopy])
        setDisplayString(calculationArrayCopy.join(''))
    }

    const equals = () => {
        try{
            const calculationArrayCopy = calculationArray
            let result = isNaN(eval(calculationArrayCopy.join(''))) ? 0 : (eval(calculationArrayCopy.join(''))).toFixed(2)
            setDisplayString(result)
            setCalculationArray([result])
            postCalculation(displayString+'='+result)
        } catch(e){
            console.log('error: ', e)
            alert('You broke it!')
            setCalculationArray([])
            setDisplayString('0')
        }
    }
    
    return(
        
        <div>
            <div className="calculator-layout">
                <Display className='result' display={displayString}/>
                <div>
                    <div>
                        <Button id="clear" value="clear" display="AC" className="reset" onClick={clear} />
                    </div>
                    <div>
                        <Button id="seven" value="7" display="7" className="num" onClick={number} />
                        <Button id="eight" value="8" display="8" className="num" onClick={number} />
                        <Button id="nine" value="9" display="9" className="num" onClick={number} />
                        <Button id="divide" value="/" display="÷" className="ops" onClick={operation} />
                    </div>
                    <div>
                        <Button id="four" value="4" display="4" className="num" onClick={number} />
                        <Button id="five" value="5" display="5" className="num" onClick={number} />
                        <Button id="six" value="6" display="6" className="num" onClick={number} />
                        <Button id="multiply" value="*" display="×" className="ops" onClick={operation} />
                    </div>
                    <div>
                        <Button id="one" value="1" display="1" className="num" onClick={number} />
                        <Button id="two" value="2" display="2" className="num" onClick={number} />
                        <Button id="three" value="3" display="3" className="num" onClick={number} />
                        <Button id="subtract" value="-" display="−" className="ops" onClick={operation} />
                    </div>
                    <div>
                        <Button id="zero" value="0" display="0" className="num" onClick={number} />
                        <Button id="decimal" value="." display="." className="point" onClick={point} />
                        <Button id="equals" value="=" display="=" className="equals" onClick={equals} />
                        <Button id="add" value="+" display="+" className="ops" onClick={operation} />
                    </div>
                </div>
            </div>
            {calculations.length > 0 && <CalculationList list={calculations}/>}
        </div>
    )
}

export default Calculator