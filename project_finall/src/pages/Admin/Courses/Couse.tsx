import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteCourse } from './Hook/useDeleteCourse'
import { Button } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import { CourseListsType, useGetCourseLists } from './Hook/useGetCourse'
import Testgrid from '../../test/Testgrid'
import Image from '../../../components/Image/Image'
import { Box } from '@mui/system'

const Course: FC = () => {

  const { CourseLists ,getCourseLists } = useGetCourseLists()
  const data = CourseLists
  const { openConfirmDialog } = useDialog()
  const { deleteCourse } = useDeleteCourse()
  const navigate = useNavigate()
  //  const [detailUser, setDetailUser] = useState<UserListsType>()
  console.log("🚀 ~ file: User.tsx:20 ~ data", data)


  const delItem = (data: CourseListsType) => {
    openConfirmDialog({
      textContent: 'deleteCourse',
      onConfirm: async () => {
        await deleteCourse(data.id_document)
        getCourseLists()
      },
    })
  }

  const viewDetailCourse = (data: CourseListsType) => {
    console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
    navigate(`/detailcourse/${data.id_document}`)
  }

  const onClickAddCourse = () => {
    navigate('/addcourses')
  }

  const columnOptions: TableColumnOptions[] = [

    {
      width:'100',
      alignHeader: 'center',
      alignValue: 'center',
      label: 'ID',
      value: 'countID',
    },

    {
      width:'50',
      alignHeader: 'center',
      alignValue: 'center',
      label: 'Course',
      value: 'imageTitle',
    },
    {
      alignValue: 'left',
      value: 'title',
    },
    {
      alignHeader: 'left',
      alignValue: 'left',
      label: 'Category',
      value: 'category.label',
    },

    {
      width:'200',
      alignHeader: 'left',
      alignValue: 'center',
      label: 'Action',
      value: 'delitem',
    },

  ]

  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">

        </div>
        <div className="charts">

        </div>
        <div className="listContainer">
          <div className="listTitle">
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid container justifyContent={'space-between'} alignItems={'center'} >
                <Typography variant="h1" component="h1" ml={3}>
                  Courses
                </Typography>
                <Button sx={{ width: '140px', height: '40px', mr: 3 }} color='success' onClick={() => onClickAddCourse()} >+Add course</Button>
              </Grid>


            </Grid>
            <Table isSelectTable columnOptions={columnOptions} dataSource={data.map((e, index) => {
              return {
                ...e,
                countID: index + 1,
                delitem: <>
                  <Button sx={{ mr: 1 }} color='success' onClick={() => {
                    viewDetailCourse(e)
                  }}>View</Button>
                  <Button sx={{ mr: 0 }} color='error' onClick={() => {
                    delItem(e)
                  }}>Delete</Button>
                </>,
                imageTitle: <Grid >
                  <Image src={e.image} width={90} height={60} />
                </Grid>,
              }
            })} defaultRowsPerPage={10} />
          </div>

        </div>
      </div>
    </div>

  )
}

export default Course