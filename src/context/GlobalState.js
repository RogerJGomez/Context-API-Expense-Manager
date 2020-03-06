import React, { createContext, useReducer, useEffect } from 'react'
import AppReducer from './AppReducer'

//Initial State

var initialState = {

    transactions:[]

}


// Create Context

export const GlobalContext = createContext(initialState)

const localState = JSON.parse(localStorage.getItem("transactions"))
//Provider Component

console.log(localState)
console.log(initialState)

export const GlobalProvider = ({ children }) =>{

    const [state, dispatch] = useReducer(AppReducer, initialState, () => {
        const localData = localStorage.getItem("transactions")
        return localData ? JSON.parse(localData) : []
    })

    useEffect(() =>{
        localStorage.setItem("transactions", JSON.stringify(state))
    }, [state])

    const deleteTransaction = id =>{
        dispatch({
            type:'DELETE_TRANSACTION',
            payload:id
        })
    }

    const addTransaction = transaction =>{
        dispatch({
            type:'ADD_TRANSACTION',
            payload:transaction
        })
    }

    return (

        <GlobalContext.Provider value={
            {transactions:state.transactions, 
            deleteTransaction,
            addTransaction}}>{children}
        </GlobalContext.Provider>
        
    )
}