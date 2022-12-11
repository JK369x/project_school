import Sidebar from '../../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../../components/componentsAdmin/navbar/Navbar'
import './DetailUser.scss'
import {Table} from '../../../../framework/control'
import { TableColumnOptions } from '../../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { IFormInput } from '../../../../Hook/useCreateAcc'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from '../../../../Hook/useGetUserLists'
import { useGetUserLists } from '../../../../Hook/useGetUserLists'

//controller
import { useDialog } from '../../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../../../../Hook/useDeleteUser'
import { Button } from '@mui/material'
//react dom 
import { useNavigate,useParams } from 'react-router-dom'

//User
import User from '../User'
import { useGetDetailUser } from '../../../../Hook/useGetDetailUser'

const DetailUser: FC = () => {
  const {userLists,getUserLists} = useGetUserLists()
  const { id} = useParams<{ id: string}>() 
  const navigate = useNavigate()
  // const [state, setState] = useState<IFormInput>()
  const  {state}= useGetDetailUser()
  console.log("🚀 ~ file: DetailUser.tsx:29 ~ state", state)
  



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
            {/* detail{state} */}
          </div>

        </div>
      </div>
    </div>

  )
}

export default DetailUser


