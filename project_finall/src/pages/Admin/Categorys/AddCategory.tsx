
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { Button, ControllerTextField} from '../../../framework/control'

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

import { UseCreateCourse } from '../../../Hook/useCreateCourse'
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'

import { CategoryInput } from '../../../Hook/useCreateCategory'

import '../Dashboard/Dashboard.scss'






const AddCategory:FC = () => {


    //*Hook
    const { addCourse } = UseCreateCourse()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()



    //? waiting set Default value form
    const myForm = useForm<CategoryInput>({
        //! can useDefault onChange

    })




    const { handleSubmit, getValues, setValue } = myForm
    const onSubmit = async () => {


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
                                <Typography variant="h1" component="h2" ml={3}>
                                    Add Category 
                                </Typography>
                                <ControllerTextField formprop={myForm} name={"Category_Title"} label={'Category Title'} />
                                <Button label='Submit' type='submit' />     
                                </form>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddCategory