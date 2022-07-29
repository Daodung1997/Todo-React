import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount} from "../reducers/counter";
import {useState} from "react";

function NumberCount (){

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(2)
    return (
        <div className="count-page">
            <div className="form-counter">
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
            <div className="form-amount">
                <div className="form-amount__input">
                    <label htmlFor="">Amount Number</label>
                    <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value) || 0)}/>
                </div>
                <button onClick={()=> dispatch(incrementByAmount(amount))}>Add amount</button>
            </div>
        </div>

    )
}
export default  NumberCount
