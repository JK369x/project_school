import React, { FC, useEffect } from 'react'
import { Avatar, Box, } from '@mui/material'
import Navbar from '../../../../components/componentsAdmin/navbar/Navbar'
import Sidebar from '../../../../components/componentsAdmin/sidebar/Side-bar'
import './EditUser.scss'
import Button from '../../../../framework/control/Button/Button'
import Grid from '@mui/material/Grid/Grid'
import { Typography } from '@mui/material'
import {
    ControllerAutocomplete,
    ControllerTextField,

}
    from '../../../../framework/control';
import { useForm } from "react-hook-form";
import { UserListsType } from "../../../../Hook/user/useGetUserLists";
import { useGetDetailUser } from '../../../../Hook/user/useGetDetailUser'
import { useLocationLookup } from '../../../../Hook/useLocationLookup'
import { useUpdateUser } from '../../../../Hook/user/useUpdateUser'
import { doc, updateDoc } from "firebase/firestore";


const EditUser: FC = () => {

    const { state } = useGetDetailUser()
    const { updateUser } = useUpdateUser()
    useEffect(() => {
        myForm.setValue('data', state
        )
    }, [state])

    const myForm = useForm<{ data: UserListsType }>({})
    console.log("🚀 ~ file: EditUser.tsx:46 ~ myForm", myForm.getValues())



    const { watch, handleSubmit, getValues } = myForm
    const { province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode } = useLocationLookup()

    const changeProvince = watch('data.province')
    const changeAmphure = watch('data.amphure')
    const changeTambon = watch('data.tambon')


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
            try {
                const id = myForm.getValues().data.id
                updateUser(getValues().data, id)
            } catch (error) {
                console.log("🚀 ~ file: EditUser.tsx:55 ~ onClickSubmitEdit ~ error", error)

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
                                        <Avatar alt="Remy Sharp" src="" sx={{ width: 120, height: 120, }} />
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