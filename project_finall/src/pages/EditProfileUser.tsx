import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Container, Stack, maxHeight } from '@mui/system'
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, TextField, Typography } from '@mui/material'
import { useGetFavorite } from './Admin/favorite/useGetFavorite'
import { CourseListsType, useGetCourseLists } from './Admin/Courses/Hook/useGetCourse'
import { useAppDispatch, useAppSelector } from '../store/useHooksStore'

import { setAuthStore } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useGetDetailUser } from './Admin/Users/Hook/useGetDetailUser'
import { Footer } from '../components/Footer'
import { useLocationLookup } from './Admin/Users/Hook/useLocationLookup'
import { UserListsType } from './Admin/Users/Hook/useGetUserLists'
import { useForm } from 'react-hook-form'
import { useUpdateUser } from './Admin/Users/Hook/useUpdateUser'
import { useUploadFile } from '../file/useUploadFile'
import { openAlertError, openAlertSuccess } from '../store/slices/alertSlice'
import { ControllerAutocomplete, ControllerTextField, UploadButton } from '../framework/control'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { role } from './Register'
const EditProfileUser = () => {
    const { province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode, data, getData } = useLocationLookup()
    const { state } = useGetDetailUser()
    console.log("🚀 ~ file: EditProfileUser.tsx:27 ~ EditProfileUser ~ state", state)
    const { uid, status, displayName, photoURL, favorite, email } = useAppSelector(({ auth }) => auth)
    const { uploadFile, uploadState } = useUploadFile()
    const newdate = state.birthday ? state.birthday : ''
    const [birthday, setBirthday] = useState<any | null>(newdate);


    const { updateUser } = useUpdateUser()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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
            agency: yup.string().required('กรุณากรอกหน่วยงาน หรือ ชื่อบริษัท')
            ,
        })
    })
    const myForm = useForm<{ data: UserListsType }>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })
    const { watch, handleSubmit, getValues, setValue } = myForm
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
                navigate(`/profiledetailuser_user/${id}`)
            } else {
                dispatch(openAlertError('changeProfileError'))
            }

        }
    }
    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
                <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4 }}>
                    <Grid sx={{ mt: 2 }} container justifyContent={'center'}>
                        <Typography gutterBottom variant="h1" mt={6}>
                            Profile
                        </Typography>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container justifyContent={'center'} >
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Avatar alt="Remy Sharp" src={uploadState.downloadURL ? uploadState.downloadURL : state.image_rul ? state.image_rul : ''} sx={{ width: 300, height: 300, mb: 4, mt: 3 }} />
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12} >
                                {uploadState.status !== 'none' ? `${uploadState.progress}%` : uploadState.fileName}
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12} sx={{ mb: 3 }}>
                                <UploadButton label={'Upload'} onUploadChange={onUploadImage} />
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Grid container justifyContent={'center'} item xs={12} >
                                    <ControllerTextField sx={{ mr: 2 }} formprop={myForm} name={"data.firstName"} label={'FirstName'} />
                                    <ControllerTextField formprop={myForm} name={"data.lastName"} label={'LastName'} />
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12}>
                                    <ControllerTextField sx={{ mr: 2 }} formprop={myForm} name={"data.email"} label={'Email'} />
                                    <ControllerTextField formprop={myForm} name={"data.job"} label={'Job'} />
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12} spacing={2}>
                                    <Grid item xs={2.35}>
                                        <ControllerAutocomplete
                                            formprop={myForm}
                                            name={'data.province'}
                                            label={'Province'}
                                            options={province} // load options
                                        />
                                    </Grid>
                                    <Grid item xs={2.35}>
                                        <ControllerAutocomplete
                                            formprop={myForm}
                                            name={'data.amphure'}
                                            label={'Amphure'}
                                            options={amphure} // load options
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12} spacing={2}>
                                    <Grid item xs={2.35}>
                                        <ControllerAutocomplete
                                            formprop={myForm}
                                            name={'data.tambon'}
                                            label={'Tambon'}
                                            options={tambon} // load options
                                        />
                                    </Grid>
                                    <Grid item xs={2.35}>
                                        <ControllerAutocomplete
                                            formprop={myForm}
                                            name={'data.zipCode'}
                                            label={'Zip'}
                                            options={zipcode} // load options
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12}>
                                    <ControllerTextField sx={{ width: 440 }} formprop={myForm} name={"data.address"} label={'Address'} />
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12}>
                                    <Grid item xs={2.35}>
                                        <ControllerTextField sx={{ mr: 2 }} formprop={myForm} name={"data.agency"} label={'Agency'} />

                                    </Grid>
                                    <Grid item xs={2.35}>
                                        <ControllerAutocomplete

                                            formprop={myForm}
                                            name={'data.status'}
                                            label={'Status'}
                                            options={role} // load options

                                        />

                                    </Grid>
                                    {/* <ControllerTextField formprop={myForm} name={"data.status.label"} label={'Status'} /> */}
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12}>
                                    <ControllerTextField sx={{ width: 440, mb: 1 }} formprop={myForm} name={"data.id_verify"} label={'ID CARD'} />
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12}>
                                    <Stack component="form" spacing={3}>
                                        <TextField
                                            id="date"
                                            label="Birthday"
                                            type="date"
                                            value={birthday}
                                            defaultValue={newdate}
                                            sx={{ width: 440 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(event) => setBirthday(event.target.value)}
                                        />
                                    </Stack>
                                </Grid>
                                <Button sx={{ mt: 2, width: 150, height: 50 }} type='submit' >Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
            <Footer />
        </>
    )
}


export default EditProfileUser