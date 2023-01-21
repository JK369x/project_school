
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



const DetailCategory: FC = () => {


    //*Hook
    const { addCategory } = useCreateCategory()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { state } = useGetDetailCategory()


    const onClickEdit = () => {
        navigate(`/editcategory/${state.id}`)
    }
    //? waiting set Default value form
    const myForm = useForm<{ data: CategoryInput }>({
        //! can useDefault onChange

    })








    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Grid >
                            <Typography variant="h1" component="h1" ml={3}>
                                Add Category
                            </Typography>
                            <Typography variant="body2" mb={2}  >
                                {state.Category_Title}
                            </Typography>
                            <Button label='Edit' onClick={() => onClickEdit()} />
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DetailCategory