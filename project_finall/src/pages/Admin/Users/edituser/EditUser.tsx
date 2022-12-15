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
import { UserListsType } from "../../../../Hook/useGetUserLists";
import { useGetDetailUser } from '../../../../Hook/useGetDetailUser'
import { useLocationLookup } from '../../../../Hook/useLocationLookup'
import { useUpdateUser } from '../../../../Hook/useUpdateUser'
import { doc, updateDoc } from "firebase/firestore";


const EditUser: FC = () => {

    const { state } = useGetDetailUser()
    const {updateUser} = useUpdateUser()
    useEffect(() => {
        myForm.setValue('data', state
        )
    }, [state])

    const myForm = useForm<{ data: UserListsType }>({})
    console.log("🚀 ~ file: EditUser.tsx:46 ~ myForm", myForm.getValues())

    const onClickSubmitEdit = () => {
        if(getValues()){
            try{
                const id = myForm.getValues().data.id
                updateUser(getValues().data,id)
            }catch (error){
                console.log("🚀 ~ file: EditUser.tsx:55 ~ onClickSubmitEdit ~ error", error)
                
            }
        }
    }


    const { watch, handleSubmit,getValues } = myForm
    const { province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode } = useLocationLookup()

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
                                    <Grid container justifyContent={'space-between'} item xs={12} sx={{ m: 0, p: 0 }}>
                                        <Typography variant="h2" mb={2}  >
                                            Information
                                        </Typography>
                                        <Button label='Submit' onClick={() => onClickSubmitEdit()} />
                                       
                                    </Grid>
                                    <Grid container item>
                                        <Grid container ml={3} mr={3} item xs={1}>
                                            <Avatar alt="Remy Sharp" src="" sx={{ width: 120, height: 120, mr: 5 }} />
                                        </Grid>
                                        <Grid ml={1} item xs={6} >
                                            <Grid item container spacing={2} >
                                                <Grid>
                                                    <ControllerTextField sx={{ mr: 1 }} formprop={myForm} name={"data.firstName"} label={'FirstName'} />
                                                </Grid>
                                                <Grid>

                                                    <ControllerTextField formprop={myForm} name={"data.lastName"} label={'LastName'} />
                                                </Grid>
                                            </Grid>
                                            <Grid item container spacing={2} xs={6} mt={0}>
                                                <ControllerTextField formprop={myForm} name={"data.email"} label={'Email'} />
                                            </Grid>
                                            <Grid item container spacing={2} xs={6} mt={0}>
                                                <ControllerTextField formprop={myForm} name={"data.job"} label={'Job'} />
                                            </Grid>
                                            <Grid item container spacing={2} xs={6} mt={0}>
                                                <ControllerAutocomplete

                                                    formprop={myForm}
                                                    name={'data.province'}
                                                    label={'Province'}
                                                    options={province} // load options
                                                    fullWidth
                                                />
                                                <ControllerAutocomplete

                                                    formprop={myForm}
                                                    name={'data.amphure'}
                                                    label={'Amphure'}
                                                    options={amphure} // load options
                                                    fullWidth
                                                />
                                                <ControllerAutocomplete

                                                    formprop={myForm}
                                                    name={'data.tambon'}
                                                    label={'Tambon'}
                                                    options={tambon} // load options
                                                    fullWidth
                                                />

                                                <ControllerAutocomplete
                                                    formprop={myForm}
                                                    name={'data.zipCode'}
                                                    label={'รหัสไปรษณีย์'}
                                                    options={zipcode} // load options
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item container spacing={2} xs={6} mt={0}>
                                                <ControllerTextField formprop={myForm} name={"data.address"} label={'Address'} />
                                            </Grid>
                                            <Grid item container spacing={2} xs={6} mt={0}>
                                                <ControllerTextField formprop={myForm} name={"data.agency"} label={'Agency'} />
                                            </Grid>
                                            <Grid item container spacing={2} xs={6} mt={0}>
                                                <ControllerTextField formprop={myForm} name={"data.status.label"} label={'Status'} />
                                            </Grid>

                                        </Grid>
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