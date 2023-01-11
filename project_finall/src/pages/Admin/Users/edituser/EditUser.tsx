import React, { FC, useEffect, useState } from 'react'
import { Avatar, Box, IconButton, } from '@mui/material'
import Navbar from '../../../../components/componentsAdmin/navbar/Navbar'
import Sidebar from '../../../../components/componentsAdmin/sidebar/Side-bar'
import './EditUser.scss'
import Button from '../../../../framework/control/Button/Button'
import Grid from '@mui/material/Grid/Grid'
import { Typography } from '@mui/material'
import {
    ControllerAutocomplete,
    ControllerTextField,
    UploadButton

}
    from '../../../../framework/control';
import { useForm } from "react-hook-form";
import { UserListsType } from "../../../../Hook/user/useGetUserLists";
import { useGetDetailUser } from '../../../../Hook/user/useGetDetailUser'
import { useLocationLookup } from '../../../../Hook/useLocationLookup'
import { useUpdateUser } from '../../../../Hook/user/useUpdateUser'
import { useUploadFile } from '../../../../file/useUploadFile'
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice'
import { setAuthStore } from '../../../../store/slices/authSlice'

const EditUser: FC = () => {
    const [images, setImages] = useState<any>([]);
    const [imageURLs, setImageURLs] = useState<any>([]);
    const dispatch = useAppDispatch()

    const { state } = useGetDetailUser()
    const { updateUser } = useUpdateUser()




    const myForm = useForm<{ data: UserListsType }>({})

    const { uploadFile, uploadState } = useUploadFile()
    const { watch, handleSubmit, getValues, setValue } = myForm
    const { province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode } = useLocationLookup()
    const { displayName, uid, photoURL, favorite } = useAppSelector(({ auth }) => auth)
    const changeProvince = watch('data.province')
    const changeAmphure = watch('data.amphure')
    const changeTambon = watch('data.tambon')

    const onUploadImage = (files: FileList | null) => {
        if (files) {
            uploadFile(files[0], `myImages/${uid}/`)
        }
    }
    useEffect(() => {
        myForm.setValue('data', state
        )
        if (uploadState.downloadURL) {
            myForm.setValue('data.image_rul', uploadState.downloadURL)
        }
    }, [state, uploadState.downloadURL])

    //!error 
    useEffect(() => {
        if (changeProvince) {
            getAmphure(parseInt(`${changeProvince.id}`))
        }
    }, [changeProvince])
    //!error 
    useEffect(() => {
        if (changeProvince && changeAmphure) {
            getTambon(parseInt(`${changeProvince.id}`), parseInt(`${changeAmphure.id}`))
        }
    }, [changeAmphure])
    //!error 
    useEffect(() => {
        if (changeTambon) {
            getZipcode(parseInt(`${changeTambon.id}`))
        }
    }, [changeTambon])

    const onSubmit = async () => {


        if (getValues()) {
            console.log("🚀 ~ file: EditUser.tsx:90 ~ onSubmit ~ getValues", getValues)
            const id = myForm.getValues().data.id
            const firstName = getValues().data.firstName
            const lastName = getValues().data.lastName
            const ImageUrl = getValues().data.image_rul
            const statusUpdata = getValues().data.status

            const displayName = `${firstName} ${lastName}`
            if (await updateUser(getValues().data, id)) {

                dispatch(openAlertSuccess('changeProfileSuccess'))
                dispatch(
                    setAuthStore({
                        uid,
                        displayName,
                        status: statusUpdata,
                        favorite,
                        photoURL: ImageUrl,
                    }),)

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
                                        <Grid item xs={3} >
                                            <ControllerTextField formprop={myForm} fullWidth name={"data.email"} label={'Email'} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ControllerTextField formprop={myForm} fullWidth name={"data.job"} label={'Job'} />
                                        </Grid>
                                    </Grid>

                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}>
                                        <Grid item xs={3} >
                                            <ControllerAutocomplete

                                                formprop={myForm}
                                                name={'data.province'}
                                                label={'Province'}
                                                options={province} // load options
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <ControllerAutocomplete

                                                formprop={myForm}
                                                name={'data.amphure'}
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
                                                name={'data.tambon'}
                                                label={'Tambon'}
                                                options={tambon} // load options
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <ControllerAutocomplete
                                                formprop={myForm}
                                                name={'data.zipCode'}
                                                label={'Zip'}
                                                options={zipcode} // load options
                                                fullWidth
                                            />
                                        </Grid>

                                    </Grid>


                                    <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={2}  >
                                        <Grid item xs={2} >
                                            <ControllerTextField fullWidth formprop={myForm} name={"data.address"} label={'Address'} />
                                        </Grid>
                                        <Grid item xs={2} >
                                            <ControllerTextField fullWidth formprop={myForm} name={"data.agency"} label={'Agency'} />
                                        </Grid>
                                        <Grid item xs={2} >
                                            <ControllerTextField fullWidth formprop={myForm} name={"data.status.label"} label={'Status'} />
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

export default EditUser

