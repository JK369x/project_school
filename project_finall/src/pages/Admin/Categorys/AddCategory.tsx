
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { Button, ControllerTextField } from '../../../framework/control'

import Grid from '@mui/material/Grid/Grid'

import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'


//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

import { useForm } from 'react-hook-form'


import { storage } from '../../../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'

import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'

import { CategoryInput } from './Hook/useCreateCategory'

import '../Dashboard/Dashboard.scss'

import { useCreateCategory } from './Hook/useCreateCategory'



const AddCategory: FC = () => {


    //*Hook
    const { addCategory } = useCreateCategory()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()



    //? waiting set Default value form
    const myForm = useForm<CategoryInput>({
        //! can useDefault onChange

    })




    const { handleSubmit, getValues, setValue } = myForm
    const onSubmit = async () => {
        if (getValues()) {
            try {
                addCategory(getValues())
            } catch (err) {
                console.log("🚀 ~ file: addCategory.tsx:65 ~ onSubmit ~ err", err)
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
                        <Grid container>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h1" component="h1" ml={3}>
                                    Add Category
                                </Typography>
                                <Grid container justifyContent={'center'} alignItems={'center'} alignContent={'center'} spacing={1}>
                                    <Grid item xs={8}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"Category_Title"} label={'Category Title'} />

                                    </Grid>
                                    <Grid item xs={3} sx={{ mt: 2 }}>
                                        <Button label='Submit' type='submit' />
                                    </Grid>

                                </Grid>
                            </form>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddCategory