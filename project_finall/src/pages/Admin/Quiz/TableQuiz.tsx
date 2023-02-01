import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import '../Dashboard/Dashboard.scss'
import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { IFormInput } from '../Users/Hook/useCreateAcc'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from '../Users/Hook/useGetUserLists'
import { useGetUserLists } from '../Users/Hook/useGetUserLists'

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../Users/Hook/useDeleteUser'
import { Button } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { QuizGet, useGetAllQuiz } from './Hook/useGetAllQuiz'


const TableQuiz: FC = () => {

    const { quiz, getQuiz } = useGetAllQuiz()
    console.log("🚀 ~ file: TableQuiz.tsx:28 ~ quiz", quiz)



    const { openConfirmDialog } = useDialog()
    const { deleteUser } = useDeleteUser()
    const navigate = useNavigate()


    const delItem = (quiz: QuizGet) => {
        openConfirmDialog({
            textContent: 'deleteUser',
            onConfirm: async () => {
                await deleteUser(quiz.id_document)
                getQuiz()
            },
        })
    }

    const viewDetailUser = (quiz: QuizGet) => {
        console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", quiz)
        navigate(`/detailuser/${quiz.id_document}`)

    }

    const columnOptions: TableColumnOptions[] = [

        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'ID',
            value: 'countID',
        },
        {

            label: 'Create Date',
            value: 'createDateTime',
        },
        {

            label: 'Title',
            value: 'title',
        },
        {
            label: 'Start Quiz',
            value: 'start_quiz',
        },
        {
            alignValue: 'left',
            alignHeader: 'left',
            label: 'End Quiz',
            value: 'end_quiz',
        },
        {
            width: '200',
            alignHeader: 'left',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },


    ]

    return (

        <div className="listContainer">
            <div className="listTitle">
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid container justifyContent={'space-between'} alignItems={'center'} >

                        <Typography variant="h1" component="h1" ml={3}>
                            Quiz
                        </Typography>

                    </Grid>
                    <Grid item xs={12}>
                        <Table columnOptions={columnOptions} dataSource={quiz.map((e, index) => {
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
                                </>
                            }
                        })} defaultRowsPerPage={10} />
                    </Grid>
                </Grid>
            </div>
        </div>


    )
}

export default TableQuiz


