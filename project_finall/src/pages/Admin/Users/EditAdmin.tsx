import React, { FC, useEffect, useState } from 'react'
import { Avatar, Box, IconButton, Stack, TextField, } from '@mui/material'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import './User.scss'
import Button from '../../../framework/control/Button/Button'
import Grid from '@mui/material/Grid/Grid'
import { Typography } from '@mui/material'
import {
    ControllerAutocomplete,
    ControllerTextField,
    UploadButton

}
    from '../../../framework/control';
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { UserListsType } from "./Hook/useGetUserLists";
import { useGetDetailUser } from './Hook/useGetDetailUser'
import { useLocationLookup } from './Hook/useLocationLookup'
import { useUpdateUser } from './Hook/useUpdateUser'
import { useUploadFile } from '../../../file/useUploadFile'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'
import { setAuthStore } from '../../../store/slices/authSlice'
import { yupResolver } from '@hookform/resolvers/yup'

const EditAdmin: FC = () => {
    const { province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode, data, getData } = useLocationLookup()
    const { state } = useGetDetailUser()

    const newdate = state.birthday ? state.birthday : ''
    const [birthday, setBirthday] = useState<any | null>(newdate);
    const schema = yup.object({
        data: yup.object({
            email: yup.string()
                .required(('กรุณากรอกอีเมล')).lowercase().trim()
                .min(3, 'ความยาวอีเมลต้องมากกว่า 3 ตัวอักษร')
                .email('รูปแบบอีเมลไม่ถูกต้อง')
            ,
            firstName: yup.string().required('กรุณากรอกชื่อ').trim().lowercase().max(20, ('ชื่อมีความยาวได้ไม่เกิน 20 ตัวอักษร'))
            ,
            lastName: yup.string().required('กรุณากรอกนามสกุล').trim().lowercase().max(20, ('นามสกุลมีความยาวได้ไม่เกิน 20 ตัวอักษร'))
            ,
        })
    })
    const myForm = useForm<{ data: UserListsType }>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })
    const { watch, handleSubmit, getValues, setValue } = myForm
    const { updateUser } = useUpdateUser()
    const dispatch = useAppDispatch()

    const { uploadFile, uploadState } = useUploadFile()

    const { displayName, uid, photoURL, favorite, about } = useAppSelector(({ auth }) => auth)


    const onUploadImage = (files: FileList | null) => {
        if (files) {
            const file = files[0]
            if (file.type === "image/jpeg" && file.size <= 5000000) {
                dispatch(openAlertSuccess('อัปโหลดรูปภาพเสร็จเรียบร้อย'))
                uploadFile(file, `myImages/receipt/${uid}/`)
            } else {
                console.log("Please select a JPG file with size less than or equal to 5MB.")
                dispatch(openAlertError('ตรวจสอบว่า File ขนาดไม่เกิน 5MB และเป็น JPG'))
            }
        }
    }




    useEffect(() => {
        myForm.setValue('data', state)
        if (uploadState.downloadURL, data) {
            myForm.setValue('data.image_rul', uploadState.downloadURL)
        }
        setBirthday(newdate)
    }, [data])

    const changeProvince = watch('data.province')
    const changeAmphure = watch('data.amphure')
    const changeTambon = watch('data.tambon')

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

    const onSubmit = async () => {
        setValue('data.birthday', birthday === "" ? newdate : birthday)
        setValue('data.image_rul', uploadState.downloadURL ? uploadState.downloadURL : state.image_rul)
        console.log('test')
        if (getValues()) {
            console.log("🚀 ~ file: EditUser.tsx:84 ~ onSubmit ~ getValues", getValues().data)
            const id = myForm.getValues().data.id_document
            const firstName = getValues().data.firstName
            const lastName = getValues().data.lastName
            const email = getValues().data.email
            const ImageUrl = getValues().data.image_rul
            const statusUpdata = getValues().data.status
            const about = getValues().data.about
            const displayName = `${firstName} ${lastName}`
            if (await updateUser(getValues().data, id)) {
                dispatch(openAlertSuccess('changeProfileSuccess'))
                if (uid === id) {
                    dispatch(
                        setAuthStore({
                            uid,
                            email,
                            displayName,
                            status: statusUpdata,
                            favorite,
                            photoURL: ImageUrl,
                            about
                        }),)

                } else {
                    console.log('id other')
                }

            } else {
                dispatch(openAlertError('changeProfileError'))
            }

        }

    }
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Box sx={{ width: '100%' }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid >
                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} >
                                        <Typography variant="h2" mb={2}  >
                                            INFORMATION
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mb: 2 }}>

                                        <Avatar alt="Remy Sharp" src={uploadState.downloadURL ? uploadState.downloadURL : state.image_rul ? state.image_rul : ''} sx={{ width: 120, height: 120, position: 'relative' }} />


                                    </Grid>
                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                                        {uploadState.status !== 'none' ? `${uploadState.progress}%` : uploadState.fileName}
                                    </Grid>
                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mb: 2 }}>
                                        <UploadButton label={'Upload'} onUploadChange={onUploadImage} />
                                    </Grid>


                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                        <Grid item xs={3}>
                                            <ControllerTextField sx={{ mr: 1 }} fullWidth formprop={myForm} name={"data.firstName"} label={'FirstName'} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ControllerTextField formprop={myForm} fullWidth name={"data.lastName"} label={'LastName'} />
                                        </Grid>
                                    </Grid>

                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                        <Grid item xs={6} >
                                            <ControllerTextField formprop={myForm} fullWidth name={"data.email"} label={'Email'} />
                                        </Grid>

                                    </Grid>


                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mt: 2 }}>
                                        <Button label='Submit' type='submit' />
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAdmin

