import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FC } from 'react'
// /* Importing the type of the object returned by the useForm hook. */
import { UseFormReturn } from "react-hook-form";
import { useLocationLookup } from './Admin/Users/Hook/useLocationLookup';
// Lookup
import { role } from './Register'
import { IFormInput } from './Admin/Users/Hook/useCreateAcc';
//MUI
import Grid from '@mui/material/Grid';
import {
    ControllerAutocomplete,
    ControllerTextField,

}
    from '../framework/control';
// firebase
interface Props {
    handleNext: () => void
    myForm: UseFormReturn<IFormInput, object>
    handleComplete: () => void
    handleBack: () => void
    activeStep: number
}

export const RegisterStep1: FC<Props> = ({ handleNext, myForm, handleComplete, handleBack, activeStep }) => {

    const { register } = myForm
    return (
        <>
            <Grid container justifyContent={'center'} style={{ padding: '10px', }}>
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} name={"email"} label={'Email'} />
                </Grid>
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} type='password' name={"password"} label={'Password'} />
                </Grid>
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} type='password' name={"confirmPassword"} label={'ConfirmPassowrd'} />
                </Grid>
            </Grid>
            <Grid container justifyContent={'Right'} >
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
            </Grid>
        </>
    )
}

export const RegisterStep2: FC<Props> = ({ handleNext, myForm, handleComplete, handleBack, activeStep }) => {
    const { register, setValue } = myForm
    const [birthday, setBirthday] = useState<any>(new Date());
    setValue('birthday', birthday)
    return (
        <>
            <Grid container justifyContent={'center'} style={{ padding: '10px', }}>
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} name={"firstName"} label={'FirstName'} />
                </Grid>
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} name={"lastName"} label={'LastName'} />
                </Grid>
                {/* //?birthday */}
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} name={"job"} label={'Job'} /> </Grid>
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} name={"agency"} label={'Agency'} />
                </Grid>
                <Grid item xs={12}>
                    <ControllerAutocomplete fullWidth options={role} formprop={myForm} name={'status'} label={'Status'} />
                </Grid>
                <Grid item xs={12}>
                    <Stack component="form" noValidate spacing={3}>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            value={birthday}
                            defaultValue="2017-05-24"
                            sx={{ width: '100%' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setBirthday(event.target.value)}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <Grid container justifyContent={'Right'}>
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
            </Grid>
        </>
    )
}

export const RegisterStep3: FC<Props> = ({ handleNext, myForm, handleComplete, handleBack, activeStep }) => {
    const { watch } = myForm
    const { province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode } = useLocationLookup()

    const changeProvince = watch('province')
    const changeAmphure = watch('amphure')
    const changeTambon = watch('tambon')

    useEffect(() => {
        if (changeProvince) {
            getAmphure(parseInt(`${changeProvince.id}`))
        }
    }, [changeProvince])

    useEffect(() => {
        if (changeProvince && changeAmphure) {
            getTambon(parseInt(`${changeProvince.id}`), parseInt(`${changeAmphure.id}`))
        }
    }, [changeAmphure])

    useEffect(() => {
        if (changeTambon) {
            getZipcode(parseInt(`${changeTambon.id}`))
        }
    }, [changeTambon])


    return (
        <>
            <Grid container justifyContent={'center'} style={{ padding: '10px', }}>
                <Grid item xs={12}>
                    <ControllerTextField fullWidth formprop={myForm} name={"address"} label={'Address'} />
                </Grid>
                <ControllerAutocomplete
                    formprop={myForm}
                    name={'province'}
                    label={'จังหวัด'}
                    options={province} // load options
                    fullWidth
                />
                <ControllerAutocomplete
                    formprop={myForm}
                    name={'amphure'}
                    label={'อำเภอ'}
                    options={amphure} // load options
                    fullWidth
                />
                <ControllerAutocomplete
                    formprop={myForm}
                    name={'tambon'}
                    label={'ตำบล'}
                    options={tambon} // load options
                    fullWidth
                />

                <ControllerAutocomplete
                    formprop={myForm}
                    name={'zipCode'}
                    label={'รหัสไปรษณีย์'}
                    options={zipcode} // load options
                    fullWidth
                />


            </Grid>



            <Grid container justifyContent={'right'}>
                <Button type="button"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}>
                    Back
                </Button>
                <Button type="button" onClick={handleNext} sx={{ mr: 1 }}>Next</Button>
                <Button type="button" onClick={handleComplete}>Complete Step</Button>
            </Grid>


        </>

    )
}