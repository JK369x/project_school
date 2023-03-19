import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'
import { CSVLink } from "react-csv";


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteCourse } from './Hook/useDeleteCourse'
import { Avatar, Button, Chip } from '@mui/material'
//react dom 
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import Testgrid from '../../test/Testgrid'
import Image from '../../../components/Image/Image'
import { Box } from '@mui/system'
import { CourseJoinType, useGetAllJoinCourse } from './Hook/useGetAllJoinCourse'
import { useUpdateApprovalJoinCourse } from './Hook/useUpdateApprovalJoinCourse'
import { useGetCourseDetail } from './Hook/useGetCourseDtail'
import { useGetAllJoinCourseApproval } from './Hook/useGetAllJoinCoruseApproval'
import { useDeleteJoinCourse } from './Hook/useDeleteJoinCourse'
import logo from '../../../assets/360_F_246677065_FY7a89FprqE1iKgPpEVSKDVOWMBTS2MX.jpg'
import ViewDetailTransaction from '../Approval/ViewDetailTransaction'
const ViewUserJoinCourse: FC = () => {
    const { JoinCourse, getUserJoinCourse } = useGetAllJoinCourse()
    const data = JoinCourse
    console.log("data_approval false", data)
    const { JoinCourseApproval, getUserJoinCourseApproval } = useGetAllJoinCourseApproval()
    const data_approval = JoinCourseApproval
    console.log("🚀 ~ file: ViewUserJoinCourse.tsx:33 ~ data_approval", data_approval)
    const username = data_approval.map((item: any, index: any) => {
        return { user_name: item.name_join, user_email: item.email_user, ID: index + 1 }
    })
    console.log("🚀 ~ file: ViewUserJoinCourse.tsx:38 ~ username ~ username", username)
    const { state } = useGetCourseDetail()

    const { openConfirmDialog } = useDialog()
    const { deleteJoinCourse } = useDeleteJoinCourse()
    const navigate = useNavigate()


    const delItem = (data: CourseJoinType) => {
        console.log('asdasdasd', data.id_document)
        openConfirmDialog({
            textContent: 'Delete User in Course ?',
            onConfirm: async () => {
                await deleteJoinCourse(state.id, data.id_document)
                getUserJoinCourse()
                getUserJoinCourseApproval()
            },
        })
    }
    const viewNameCheck = () => {
        navigate(`/viewnamecheck/${state.id}`)
    }
    const viewDetailCourse = (data_approval: CourseJoinType) => {
        console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
        navigate(`/viewdetailuserincourse/${data_approval.id_user}/${state.id}`)
    }

    const printReceipt = () => {

    }

    const approval = async (data: CourseJoinType) => {
        await useUpdateApprovalJoinCourse(state.id, data.id_document)
        getUserJoinCourseApproval()
        getUserJoinCourse()
    }
    const columnOptions1: TableColumnOptions[] = [

        {
            width: '100',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'ID',
            value: 'countID',
        },

        {
            width: '350',
            alignHeader: 'left',
            alignValue: 'right',
            label: 'User',
            value: 'imageTitle',
        },
        {
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Email',
            value: 'email_user',
        },


        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Transaction',
            value: 'transaction',
        },

        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Approval',
            value: 'approval',
        },

        {
            width: '300',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },

    ]
    const columnOptions: TableColumnOptions[] = [

        {
            width: '100',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'ID',
            value: 'countID',
        },

        {
            width: '200',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'Receipt',
            value: 'imageTitle',
        },

        {
            alignHeader: 'left',
            alignValue: 'left',
            label: 'User Name',
            value: 'name_join',
        },
        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Transaction',
            value: 'transaction',
        },

        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Approval',
            value: 'approval',
        },

        {
            width: '300',
            alignHeader: 'left',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },

    ]
    const headers = [
        { label: "ID", key: "ID" },
        { label: "Name", key: "user_name" },
        { label: "Email", key: "user_email" }
    ];


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
                            <Typography variant="h1" component="h1" ml={3}>
                                Users in Course
                            </Typography>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} >
                                <Button sx={{ ml: 3, mt: 2, mb: 2, mr: 2 }} color='success' onClick={() => {
                                    viewNameCheck()
                                }}>View Name Check</Button>
                                <Button>
                                    <CSVLink style={{ color: '#fff' }} data={username} headers={headers} filename={`username${new Date()}`}
                                        target="_blank">
                                        Export CSV
                                    </CSVLink>
                                </Button>
                            </Grid>

                        </Grid>
                        <Grid sx={{ height: 1200, maxHeight: 2000 }}>

                            <Table columnOptions={columnOptions1} dataSource={data_approval.map((e, index) => {
                                return {
                                    ...e,
                                    transaction: <Chip label={e.image ? 'ชำระเงินแล้ว' : 'รอการโอนเงิน'} color="success" />,
                                    approval: <Chip label={e.approval == true ? 'อนุมัติ' : true} color="primary" />,
                                    countID: index + 1,
                                    delitem: <>
                                        {/* <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                            approval(e)
                                        }}>Approval</Button> */}
                                        {/* <Button sx={{ mr: 1 }} color='info' onClick={() => {
                                            printReceipt()
                                        }}>Print Receipt</Button> */}
                                        <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                            viewDetailCourse(e)
                                        }}>View</Button>
                                        <Button sx={{ mr: 0 }} color='error' onClick={() => {
                                            delItem(e)
                                        }}>Delete</Button>
                                    </>,
                                    imageTitle: <Grid container justifyContent={'flex-start'} alignItems={'center'} >
                                        <Avatar src={e.image_user} sx={{ width: 50, height: 50, mr: 3 }}></Avatar>
                                        {e.name_join}
                                    </Grid>,
                                }
                            })} defaultRowsPerPage={10} />

                        </Grid>

                    </div>

                </div>

                <div className="listContainer">
                    <div className="listTitle">
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid container justifyContent={'space-between'} alignItems={'center'} >
                                <Typography variant="h1" component="h1" ml={3}>
                                    Wait Approval
                                </Typography>

                            </Grid>


                        </Grid>
                        <Grid sx={{ height: 1200, maxHeight: 2000 }}>
                            <Table columnOptions={columnOptions} dataSource={data.map((e, index) => {
                                return {
                                    ...e,
                                    transaction: <Chip label={e.image ? 'ชำระเงินแล้ว' : 'รอการโอนเงิน'} color={e.image ? 'primary' : 'error'} />,
                                    approval: <Chip label={e.approval == false ? 'รอการอนุมัติ' : true} color="warning" />,
                                    countID: index + 1,
                                    delitem: <>
                                        <Grid container justifyContent={'center'}>
                                            <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                                approval(e)
                                            }}>Approval</Button>
                                            <ViewDetailTransaction image={e.image} date={e.date_transaction} pricing={e.pricing} name={e.name_join} coursename={e.courseName} />
                                            <Button sx={{ ml: 1 }} color='error' onClick={() => {
                                                delItem(e)
                                            }}>Delete</Button>

                                        </Grid>
                                    </>,
                                    imageTitle: <Grid >
                                        <Image src={e.image ? e.image : logo} width={100} height={140} />
                                    </Grid>,
                                }
                            })} defaultRowsPerPage={10} />
                        </Grid>
                    </div>


                </div>
            </div>
        </div >

    )
}

export default ViewUserJoinCourse