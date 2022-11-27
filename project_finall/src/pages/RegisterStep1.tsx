import { Button } from '@mui/material';
import { useState } from 'react';
import { FC } from 'react'
// /* Importing the type of the object returned by the useForm hook. */
import { UseFormReturn } from "react-hook-form";
import {useHookProvince} from '../Hook/useHookProvince'
interface Props {
    handleNext: () => void
    myForm: UseFormReturn<any, object>
    handleComplete: () => void
    handleBack: () => void
    activeStep: number
   
}
export const RegisterStep1: FC<Props> = ({ handleNext, myForm, handleComplete, handleBack, activeStep }) => {

    const { register } = myForm
    return (
        <>
            <section>
                <label>Email</label>
                <input type='email' {...register('email',)} />
                <label>Password</label>
                <input type='password' {...register('password',)} />
                <label>ConfirmPassowrd</label>
                <input type='password' {...register('confirmPassword',)} />
            </section>
            <Button type="button"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Button type="button" onClick={handleNext} sx={{ mr: 1 }}>Next</Button>
            <Button type="button" onClick={handleComplete}>Complete Step</Button>
        </>
    )
}

export const RegisterStep2: FC<Props> = ({ handleNext, myForm, handleComplete, handleBack, activeStep }) => {
    const { register } = myForm
    return (
        <>
            <section>
                <label>FirstName</label>
                <input type='text' {...register('firstName',)} />
                <label>LastName</label>
                <input type='text' {...register('lastName',)} />
                <label>Birthday</label>
                <input type='date' {...register('birthday',)} />
                <label>Job</label>
                <input type='text' {...register('job',)} />
                <label>Agency</label>
                <input type='text' {...register('agency',)} />
                <label>Status</label>
                <input type='text' {...register('status',)} />
            </section>
            <Button type="button"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Button type="button" onClick={handleNext} sx={{ mr: 1 }}>Next</Button>
            <Button type="button" onClick={handleComplete}>Complete Step</Button>
        </>
    )
}

export const RegisterStep3: FC<Props> = ({ handleNext, myForm, handleComplete, handleBack, activeStep }) => {
    const { register } = myForm
    const {data,setData} = useHookProvince()
    const [amphure, setAmpure] = useState<any[]>([])
    console.log('asdad',amphure)
    const District = () =>{

    }
    const onChangeProvince = (id:string|number) =>{
        console.log(id)
        data.map((item,index)=>{
            if( item.id == id){
                setAmpure(item.amphure)
            }else{
                console.log('false')
            }
        })
    }   
    const onChangeAmphure = (id:string|number) =>{
        data.map((item,index)=>{

        })
 
    }
    
    return (
        <>
            <section>
                <label>Address</label>
                <input type='text' {...register('address',)} />
                <label>Province</label>
                <input type='text' {...register('province',)} />
                <select onChange={(e)=>onChangeProvince(e.target.value)}>
                    {data.map((item,index)=>
                        <option 
                        key={index} 
                        value={item.id}>
                            {item.name_th}
                        </option>
                    )}
                </select>
                <label>District</label>
                <select onChange={(e)=>onChangeAmphure(e.target.value)}>
                    {amphure.map((item,index)=>
                        <option 
                        key={index} 
                        value={item.id}>
                            {item.name_th}
                        </option>
                    )}
                </select>
                <label>Parish</label>
                <input type='text' {...register('parish',)} />
                <label>Zip Code</label>
                <input type='text' {...register('zipCode',)} />
            </section>
            <Button type="button"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Button type="button" onClick={handleNext} sx={{ mr: 1 }}>Next</Button>
            <Button type="submit">Finish</Button>
        </>
    )
}