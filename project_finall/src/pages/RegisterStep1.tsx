import { Button } from '@mui/material';
import { useState } from 'react';
import { FC } from 'react'
// /* Importing the type of the object returned by the useForm hook. */
import { UseFormReturn } from "react-hook-form";
import { useHookProvince } from '../Hook/useHookProvince'
// Lookup
import {lookUpProvince} from './Register'
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
    const { data, setData } = useHookProvince()
    const [amphure, setAmpure] = useState<any[]>([])
    const [tambon, setTambon] = useState<any[]>([])
    const [zipcode, setZipCode] = useState<number | string>('')
    console.log('A', amphure)
    console.log('t', tambon)
    console.log('x', zipcode)

    const onChangeTambon = (id: string | number) => {
        console.log(id)
        tambon.map((item, index) => {
            if (item.id == id) {
                console.log('pass')
                setZipCode(item.zip_code)
                
            } else {
                console.log('false')
            }
        })
    }
    const onChangeProvince = (id: string | number) => {

        data.map((item, index) => {
            if (item.id == id) {
                setAmpure(item.amphure)

            } else {
                console.log('false')
            }
        })
    }
    const onChangeAmphure = (id: string | number) => {
        console.log(id)
        amphure.map((item, index) => {
            if (item.id == id) {
                console.log('pass')
                setTambon(item.tambon)


            } else {
                console.log('false')
            }
        })

    }

    return (
        <>
            <section>
                <label>Address</label>
                <input type='text' {...register('address',)} />
                <label>Province</label>

                <select  {...register('province')}  onChange={(e) => onChangeProvince(e.target.value)}>
                    <option value=''>-- Select Province --</option>
                    {data.map((item, index) =>
                        <option
                            key={index}
                            value={item.id}>
                            {item.name_th}
                        </option>
                        
                    )}
                    
                </select>

                <label>District</label>
                <select {...register('district')}  onChange={(e) => onChangeAmphure(e.target.value)}>
                <option value=''>-- Select District --</option>
                    {amphure.map((item, index) =>
                        <option
                            key={index}
                            value={item.id}>
                            {item.name_th}
                        </option>
                    )}
                </select>
                <label>Parish</label>
                <select {...register('parish')}  onChange={(e) => onChangeTambon(e.target.value)}>
                <option value=''>-- Select Parish --</option>
                    {tambon.map((item, index) =>
                        <option
                            key={index}
                            value={item.id}>
                            {item.name_th}
                        </option>
                    )}
                </select>
                <label>Zip Code</label>
                <select {...register('zipCode')} >
                <option value=''>-- Zip Code --</option>
                    <option value= {zipcode}>
                        {zipcode}
                    </option>
                </select>
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
            {/* <Button type="submit">Finish</Button>  */}

      
        </>

    )
}