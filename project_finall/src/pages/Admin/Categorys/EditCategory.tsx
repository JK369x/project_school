
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
import { useGetDetailCategory } from './Hook/useGetDetailCategory'
import { useUpdateCategory } from './Hook/useUpdateCategory'



const EditCategory: FC = () => {


    //*Hook
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { state } = useGetDetailCategory()
    const { updateCategory } = useUpdateCategory()

    //? waiting set Default value form
    const myForm = useForm<{ data: CategoryInput }>({
        //! can useDefault onChange

    })


    useEffect(() => {
        myForm.setValue('data', state)
        console.log("🚀 ~ file: EditCourse.tsx:47 ~ useEffect ~ state", state)
    }, [state])

    const { handleSubmit, getValues, setValue } = myForm
    const onSubmit = async () => {

        if (getValues()) {
            const id = myForm.getValues().data.id
            try {
                updateCategory(getValues().data, id)
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
                                <ControllerTextField formprop={myForm} name={"data.Category_Title"} label={'Category Title'} />
                                <Button label='Submit' type='submit' />
                            </form>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditCategory