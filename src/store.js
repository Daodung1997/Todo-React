import {configureStore} from '@reduxjs/toolkit'
import countReducer from "./reducers/counter";
export default  configureStore({
    reducer : {
        counter: countReducer
    }
})
