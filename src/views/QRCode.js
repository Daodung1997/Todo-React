import * as React from 'react'
import {useEffect, useState} from "react";
import QRCode from "react-qr-code";

function RenderQr (){
    const [name, setName]= useState('Dung')
    const [address, setAddress] = useState('1997')
    const [valueQR , setValueQR] = useState('')

    const setQRCode = ()=>{
        let value = { name, address}
        setValueQR(JSON.stringify(value))
    }
    useEffect(()=>{
        setQRCode()
    }, [name, address])
    return (
        <div className="qr-box">
            <div className="qr-box__form">
                <div className="qr-box__input">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" value={name}  onChange={e => setName(e.target.value)}/><br/>
                </div>
                <div className="qr-box__input">
                    <label htmlFor="">Birth Day</label>
                    <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)}/>
                </div>
            </div>
            <QRCode value={valueQR} />
            <div className="qr-box__code">
                <code>{valueQR}</code>
            </div>
        </div>
    )
}

export default RenderQr
