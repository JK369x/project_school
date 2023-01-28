
import { useForm, SubmitHandler } from "react-hook-form";
//import register
//MUI
import * as React from 'react';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { Lookup } from "../../types/type";
import Grid from '@mui/material/Grid';
import Button from "../../framework/control/Button/Button";
import Navbar from '../../components/componentsAdmin/navbar/Navbar'
//HOOK

//firebase
import { auth } from '../../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from "../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../store/slices/loadingSlice";
//redux
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import Sidebar from "../../components/componentsAdmin/sidebar/Side-bar";
import { TeacherType, useCreateTeacher } from "./Hook/CreateTeacher";
import { ControllerAutocomplete, ControllerTextField, UploadButton } from "../../framework/control";
import NativePickers from "../components/DatePicker";
import { useLocationLookup } from "../Admin/Users/Hook/useLocationLookup";
import { Avatar, Stack, TextField } from "@mui/material";
import { useUploadFile } from "../../file/useUploadFile";






export const role: Lookup[] = [{
    id: '4',
    label: 'อาจารย์',
},
]



const AddTeacher = () => {
    const { displayName, uid, photoURL, favorite } = useAppSelector(({ auth }) => auth)
    const { uploadFile, uploadState } = useUploadFile()
    const onUploadImage = (files: FileList | null) => {
        if (files) {
            uploadFile(files[0], `myImages/${uid}/`)
        }
    }
    const { addTeacher } = useCreateTeacher()
    const { province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode } = useLocationLookup()
    const myForm = useForm<TeacherType>({
        //! can useDefault onChange


    })
    const { handleSubmit, getValues, setValue, watch } = myForm


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


    //redux
    const dispatch = useAppDispatch()

    const [birthday, setBirthday] = useState<any>(new Date());

    const onSubmit = async () => {
        setValue('birthday', birthday)
        console.log('getvaluse!!!!', getValues())
        if (getValues()) {
            try {
                await addTeacher(getValues())
            } catch (error) {
                console.log(error)

            }
        }
    }
    return (
        <>
            <div className='home'>
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div className="listContainer">
                        <div className="listTitle">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h1" component="h1" ml={3}>
                                    Add Teacher
                                </Typography>

                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mb: 2 }}>
                                    <Avatar alt="Remy Sharp" src={uploadState.downloadURL && uploadState.downloadURL} sx={{ width: 120, height: 120, position: 'relative' }} />
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                                    {uploadState.status !== 'none' ? `${uploadState.progress}%` : uploadState.fileName}
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mb: 2 }}>
                                    <UploadButton label={'Upload'} onUploadChange={onUploadImage} />
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                    <Grid item xs={6}>
                                        <ControllerTextField formprop={myForm} name={"email"} label={'Email'} fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                    <Grid item xs={3}>
                                        <ControllerTextField sx={{ mr: 1 }} fullWidth formprop={myForm} name={"password"} label={'Password'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField formprop={myForm} fullWidth name={"confirmpassword"} label={'Confirm Password'} />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                    <Grid item xs={3}>
                                        <ControllerTextField sx={{ mr: 1 }} fullWidth formprop={myForm} name={"firstName"} label={'FirstName'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField formprop={myForm} fullWidth name={"lastName"} label={'LastName'} />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                    <Grid item xs={3} >
                                        <ControllerAutocomplete
                                            formprop={myForm}
                                            name={'status'}
                                            label={'Status'}
                                            options={role} // load options
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={3} sx={{ mt: 1.6 }}>
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
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                    <Grid item xs={3} >
                                        <ControllerAutocomplete

                                            formprop={myForm}
                                            name={'province'}
                                            label={'Province'}
                                            options={province} // load options
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete

                                            formprop={myForm}
                                            name={'amphure'}
                                            label={'Amphure'}
                                            options={amphure} // load options
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                    <Grid item xs={3} >
                                        <ControllerAutocomplete

                                            formprop={myForm}
                                            name={'tambon'}
                                            label={'Tambon'}
                                            options={tambon} // load options
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete
                                            formprop={myForm}
                                            name={'zipCode'}
                                            label={'Zip'}
                                            options={zipcode} // load options
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}  >
                                    <Grid item xs={3} >
                                        <ControllerTextField fullWidth formprop={myForm} name={"address"} label={'Address'} />
                                    </Grid>
                                    <Grid item xs={3} >
                                        <ControllerTextField fullWidth formprop={myForm} name={"agency"} label={'Agency'} />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mt: 2 }}>
                                    <Button label='Submit' type='submit' />
                                </Grid>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default AddTeacher