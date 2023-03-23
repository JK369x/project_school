
import { useForm, SubmitHandler } from "react-hook-form";
//import register
//MUI
import { useEffect, useState } from "react";

import Typography from '@mui/material/Typography';
import { Lookup } from "../../types/type";
import Grid from '@mui/material/Grid';
import Button from "../../framework/control/Button/Button";
import Navbar from '../../components/componentsAdmin/navbar/Navbar'
//HOOK

//firebase
import { useAppDispatch, useAppSelector } from "../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../store/slices/loadingSlice";
//redux
import * as yup from 'yup'
import Sidebar from "../../components/componentsAdmin/sidebar/Side-bar";
import { ControllerAutocomplete, ControllerTextField, UploadButton } from "../../framework/control";
import { useLocationLookup } from "../Admin/Users/Hook/useLocationLookup";
import { Avatar, Stack, TextField } from "@mui/material";
import { useUploadFile } from "../../file/useUploadFile";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateTeacher } from "../Teacher/Hook/CreateTeacher";
import { TypeAdmin, useCreateAdmin } from "../Teacher/Hook/CreateAdmin";
import { openAlertError, openAlertSuccess } from "../../store/slices/alertSlice";



export const role: Lookup[] = [{
    id: '10',
    label: 'แอดมิน',
}
]



const RegisterAdmin = () => {
    const { displayName, uid, photoURL, favorite } = useAppSelector(({ auth }) => auth)
    const { uploadFile, uploadState } = useUploadFile()
    const onUploadImage = async (files: FileList | null) => {
        if (files) {
            const file = files[0]
            if (file.type === "image/jpeg" && file.size <= 5000000) {
                dispatch(openAlertSuccess('อัปโหลดรูปภาพเสร็จเรียบร้อย'))
                await uploadFile(file, `myImages/admin/${uid}/`)
                setValue('image_rul', uploadState.downloadURL ?? uploadState.downloadURL)
            } else {
                console.log("Please select a JPG file with size less than or equal to 5MB.")
                dispatch(openAlertError('ตรวจสอบว่า File ขนาดไม่เกิน 5MB และเป็น JPG'))
            }
        }
    }
    const { addAdmin } = useCreateAdmin()
    const schema = yup.object({
        email: yup.string()
            .required(('กรุณากรอกอีเมล') as string).lowercase().trim()
            .min(3, 'ความยาวอีเมลต้องมากกว่า 3 ตัวอักษร')
            .email('รูปแบบอีเมลไม่ถูกต้อง')
        ,
        password: yup.string().required(('กรุณากรอกรหัสผ่าน'))
            .min(4, ('ความยาวรหัสผ่านต้องมีความยาวมากกว่า 4 ตัวอักษร'))
            .max(20, ('ความยาวรหัสผ่านต้องมีความยาวน้อยกว่า 20 ตัวอักษร'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\*)(?=.*\S).*$/,
                'รหัสผ่านต้องประกอบด้วยตัวอักษรตัวเล็ก (a-z) และตัวใหญ่ (A-Z) อย่างน้อย 1 ตัว และสัญลักษณ์พิเศษ (*) อย่างน้อย 1 ตัว'
            )
        ,
        confirmPassword: yup.string()
            .required('กรุณากรอกยืนยันรหัสผ่าน')
            .oneOf([yup.ref('password'), ''], 'รหัสผ่านไม่ตรงกัน')
        ,
        firstName: yup.string().required('กรุณากรอกชื่อ').trim().lowercase().max(20, ('ชื่อมีความยาวได้ไม่เกิน 20 ตัวอักษร'))
        ,
        lastName: yup.string().required('กรุณากรอกนามสกุล').trim().lowercase().max(20, ('นามสกุลมีความยาวได้ไม่เกิน 20 ตัวอักษร'))
        ,

    })
    const myForm = useForm<TypeAdmin>({
        //! can useDefault onChange
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            image_rul: '',
        }

    })
    const { handleSubmit, getValues, setValue, watch, setError, clearErrors, } = myForm
    const password = watch('password')
    const confirmPassword = watch('confirmPassword')
    useEffect(() => {
        if (confirmPassword && password) {
            if (password !== confirmPassword)
                setError('confirmPassword', { message: ('รหัสผ่านไม่ตรงกัน') as string })
            else clearErrors(['confirmPassword'])
        }
    }, [password])




    //redux
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const onSubmit = async () => {
        console.log('getvaluse!!!!', getValues())

        if (getValues()) {
            try {
                dispatch(isShowLoading());
                const data = await addAdmin(getValues())
                if (data === true) {
                    // navigate(`/teacher`)
                } else {
                    console.log("🚀 ~ file: Register.tsx:180 ~ onSubmit ~ data:", data)
                    setError('email', { message: (`${data}`) })
                }
            } catch (error) {
                console.log(error)
            } finally {
                dispatch(isCloseLoading());
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
                                    Add Admin
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
                                        <ControllerTextField sx={{ mr: 1 }} fullWidth formprop={myForm} type="password" name={"password"} label={'Password'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField formprop={myForm} fullWidth name={"confirmPassword"} type="password" label={'Confirm Password'} />
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

export default RegisterAdmin