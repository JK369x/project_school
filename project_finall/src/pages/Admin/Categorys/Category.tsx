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
import { useDeleteCourse } from '../../../Hook/useDeleteUser'
import { Button } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import { CourseListsType, useGetCourseLists } from '../../../Hook/useGetCourse'

const  Category:FC = () => {
  
  const { CourseLists, getCourseLists } = useGetCourseLists()
  const data = CourseLists
  const { openConfirmDialog } = useDialog()
  const { deleteCourse } = useDeleteCourse()
  const navigate = useNavigate()
  //  const [detailUser, setDetailUser] = useState<UserListsType>()
  console.log("🚀 ~ file: User.tsx:20 ~ data", data)


  const delItem = (data: CourseListsType) => {
    openConfirmDialog({
      textContent: 'deleteUser',
      onConfirm: async () => {
        await deleteCourse(data.id)
        getCourseLists()
      },
    })
  }

  const viewDetailUser = (data: CourseListsType) => {
    console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
    // setDetailUser(data)
    navigate(`/detailuser/${data.id}`)

  }

  const onClickAddCategory = () =>{
    navigate('/addcategory')
  }

  const columnOptions: TableColumnOptions[] = [
    
    {
      alignHeader: 'left',
      alignValue: 'left', 
      label: 'ID',
      value: 'countID',
    },
    {
      
      label: 'Course',
      value: 'title',
    },
    {
      label: 'Category',
      value: 'subtitle',
    },
    {
      alignValue: 'left',
      alignHeader: 'left',
      label: 'Status',
      value: 'subtitle',
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
                Categorys
              </Typography>
              <Button sx={{width:'140px', height:'40px',mr:3}}  color='success' onClick={()=>onClickAddCategory()} >+Add course</Button>
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
                    </>,
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

export default Category