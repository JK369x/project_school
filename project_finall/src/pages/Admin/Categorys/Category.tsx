import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { IFormInput } from '../../../Hook/user/useCreateAcc'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from '../../../Hook/user/useGetUserLists'
import { useGetUserLists } from '../../../Hook/user/useGetUserLists'

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteCateGory } from '../../../Hook/user/useDeleteUser'
import { Button } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import { useGetCourseLists } from '../../../Hook/category/useGetCategory'
import { CategoryListsType } from '../../../Hook/category/useGetCategory'
const Category: FC = () => {

  const { CategoryLists, useGetCategory } = useGetCourseLists()
  const data = CategoryLists
  const { openConfirmDialog } = useDialog()
  const { deleteCategory } = useDeleteCateGory()
  const navigate = useNavigate()
  //  const [detailUser, setDetailUser] = useState<UserListsType>()
  console.log("🚀 ~ file: User.tsx:20 ~ data", data)


  const delItem = (data: CategoryListsType) => {
    openConfirmDialog({
      textContent: 'deleteCategory',
      onConfirm: async () => {
        await deleteCategory(data.id)
        useGetCategory()
      },
    })
  }

  const viewDetailUser = (data: CategoryListsType) => {
    console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
    // setDetailUser(data)
    navigate(`/detailuser/${data.id}`)

  }

  const onClickAddCategory = () => {
    navigate('/addcategory')
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
      label: 'Category',
      value: 'Category_Title',
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
                  Categorys
                </Typography>
                <Button sx={{ width: '140px', height: '40px', mr: 3 }} color='success' onClick={() => onClickAddCategory()} >+Add course</Button>
              </Grid>
              <Grid item xs={12}>
                <Table isSelectTable columnOptions={columnOptions} dataSource={data.map((e, index) => {
                  return {
                    ...e,
                    countID: index + 1,
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