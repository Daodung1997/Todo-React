import * as React from "react";
import {useEffect, useState} from "react";
function Calculator ()  {

    const [textCalculator, setTextCalculator] = useState('')
    const [result, setResult] = useState(null)
    const [arrayKey, setArrayKey] = useState([])


    useEffect(()=>{
        console.log('Effect Data')

    }, [[textCalculator, result]])

    const handleClickButton = (e) => {
        let keyButton= e.target.innerText
        let buttonNumbers = ['1','2','3','4','5','6','7','8','9','.']
        let buttonCC = ['(', ')']
        let buttonCalculationBasic = ['/', 'X', '-', '+']
        let arrayButtonCopy = [].concat(arrayKey)
        if(buttonNumbers.includes(keyButton)){
            arrayButtonCopy.push(keyButton)
        }else if (buttonCalculationBasic.includes(keyButton)){
            if(arrayButtonCopy && arrayButtonCopy.length >0){
                if(result){
                    arrayButtonCopy = []
                    arrayButtonCopy = (result + '').split('')
                    arrayButtonCopy.push(keyButton)
                }else{
                    let itemLast = arrayButtonCopy && arrayButtonCopy.length >0 ? arrayButtonCopy[arrayButtonCopy.length -1]: null
                    if(itemLast && buttonCalculationBasic.includes(itemLast))  {
                        arrayButtonCopy.splice(arrayButtonCopy.length -1, 1)
                        arrayButtonCopy.push(keyButton)
                    }else{
                        arrayButtonCopy.push(keyButton)
                    }
                }
            }
        }else if(buttonCC.includes(keyButton)){
            if(arrayButtonCopy && arrayButtonCopy.length >0 && buttonCC.includes(arrayButtonCopy[arrayButtonCopy.length -1])){
                return false
            }else{
                arrayButtonCopy.push(keyButton)
            }
        }else if(keyButton ==='AC'){
            setArrayKey([])
            arrayButtonCopy = []
            setResult(null)

        }else if(keyButton === 'CE'){
            if(arrayButtonCopy && arrayButtonCopy.length >=0){
                arrayButtonCopy.splice(arrayButtonCopy.length-1 , 1)
            }
        }else if( keyButton === '='){
            let itemLast = arrayButtonCopy && arrayButtonCopy.length >0 ? arrayButtonCopy[arrayButtonCopy.length -1]: null
            if(itemLast && buttonCalculationBasic.includes(itemLast))  {
                arrayButtonCopy.splice(arrayButtonCopy.length -1, 1)
            }
            let textResult = arrayButtonCopy.join('')
            let firstItem = arrayButtonCopy[0]
            let number = result
            let calculationThis = eval(textResult.replaceAll('X', '*')) || 0
            if(buttonCalculationBasic.includes(firstItem)){
                switch (firstItem){
                    case 'X':
                        number*= calculationThis
                        break
                    case '+':
                        number += calculationThis
                        break
                    case '-':
                        number -= calculationThis
                        break
                    case '/':
                        number /= calculationThis
                        break
                    default:
                        number *= 1
                }
            }else{
                number = calculationThis
            }
            setResult(number)
        }
        let textResult = arrayButtonCopy.join('')
        setArrayKey(arrayButtonCopy)
        setTextCalculator(textResult)

    }


    const buttons = ['(',')','CE','AC', '7', '8','9','/', '4', '5', '6', 'X','1', '2', '3', '-', '0', '.', '=', '+']
    let buttonRender = buttons.map(elm => <button key={elm} onClick={handleClickButton}>{elm}</button>)
    return (
        <div className="calculator">
                <div className="calculator__view">
                    <div className="calculator__view--text">{textCalculator}</div>
                    <div className="calculator__view--result">{result}</div>
                </div>
                <div className="calculator__buttons">
                    {buttonRender}
                </div>
        </div>

    )
}
export  default  Calculator;
