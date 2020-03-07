import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import CustomAlert from 'sweetalert2'

const Toast = CustomAlert.mixin({
    toast: true,
    position: 'center-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', CustomAlert.stopTimer)
      toast.addEventListener('mouseleave', CustomAlert.resumeTimer)
    }
  })

export const AddTransaction = () => {

    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)
    
    const {addTransaction} = useContext(GlobalContext)

    const onSubmit = e =>{
        e.preventDefault()
        if(text===""){
              Toast.fire({
                icon: 'error',
                title: 'You must type at least 1 character'
            })
        }
        else{
            const newTransaction = {
                id:Math.floor(Math.random() * 100000000),
                text,
                amount: +amount
            }

            addTransaction(newTransaction)
            Toast.fire({
                icon: 'success',
                title: "Transaction added"
            })
            setText('')
            setAmount('')
        }

    }
    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit ={onSubmit} >
                <div className="form-control">
                <label htmlFor="text">Transaction</label>
                <input type="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label htmlFor="amount">Amount <br />
                    (Negative = Expense | Positive = Income)</label>
                <input type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
