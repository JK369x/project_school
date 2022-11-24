import React from 'react'
import { OutlinedInput } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {}

const Registor = (props: Props) => {
  
  return (
    <>
        <div className="container">
        <div className="form-registor">
        <h1>Registor</h1>
        <form>
          
        <input {...register("firstName")} />
          </form> 
        </div>
        </div>
       
    </>
    
  )
}

export default Registor