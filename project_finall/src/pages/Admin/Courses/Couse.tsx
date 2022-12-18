import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { IFormInput } from '../../../Hook/useCreateAcc'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from '../../../Hook/useGetUserLists'
import { useGetUserLists } from '../../../Hook/useGetUserLists'

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../../../Hook/useDeleteUser'
import { Button } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import './Course.scss'

const  Course:FC = () => {
  
  const { userLists, getUserLists } = useGetUserLists()
  const data = userLists
  const { openConfirmDialog } = useDialog()
  const { deleteUser } = useDeleteUser()
  const navigate = useNavigate()
  //  const [detailUser, setDetailUser] = useState<UserListsType>()
  console.log("🚀 ~ file: User.tsx:20 ~ data", data)


  const delItem = (data: UserListsType) => {
    openConfirmDialog({
      textContent: 'deleteUser',
      onConfirm: async () => {
        await deleteUser(data.id)
        getUserLists()
      },
    })
  }

  const viewDetailUser = (data: UserListsType) => {
    console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
    // setDetailUser(data)
    navigate(`/detailuser/${data.id}`)

  }

  const onClickAddCourse = () =>{
    navigate('/addcourses')
  }

  const columnOptions: TableColumnOptions[] = [
    
    {
      alignHeader: 'left',
      alignValue: 'left', 
      label: 'ID',
      value: 'countID',
    },
    {
      
      label: 'User',
      value: 'firstName',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      alignValue: 'left',
      alignHeader: 'left',
      label: 'Status',
      value: 'status.label',
    },
    {
      alignValue: 'right',
      alignHeader: 'center',
      label: 'Action',
      value: 'delitem',

    },


  ]

  return (
    <div className='home'>
      <Sidebar/> 
      <div className="homeContainer"> 
        <Navbar/>
        <div className="widgets">
   
        </div>
        <div className="charts">
   
        </div>
        <div className="listContainer">
          <div className="listTitle">
          <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid container justifyContent={'space-between'} alignItems={'center'} >

              <Typography variant="h1" component="h2" ml={3}>
                Users
              </Typography>
              <Button sx={{width:'140px', height:'40px',mr:3}}  color='success' onClick={()=>onClickAddCourse()} >+Add course</Button>
              
              </Grid>
              <Grid item xs={12}>
                <Table isSelectTable columnOptions={columnOptions} dataSource={data.map((e, index) => {
                  return {
                    ...e, 
                    countID:index + 1,
                     delitem: <>
                      <Button sx={{ mr: 1 }} color='success' onClick={() => {
                        viewDetailUser(e)
                      }}>View</Button>
                      <Button sx={{ mr: 0 }} color='error' onClick={() => {
                        delItem(e)
                      }}>Delete</Button>
                    </>
                  }
                })} defaultRowsPerPage={10} />
              </Grid>
            </Grid>
          </div>
      
        </div>
      </div> 
    </div>

  )
}

export default Course