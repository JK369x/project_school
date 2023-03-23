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
import { Button, Chip } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { QuizGet, useGetAllQuiz } from './Hook/useGetAllQuiz'
import { useGetDetailQuiz } from './Hook/useDetailQuiz'
import { useDeleteQuiz } from './Hook/useDeleteQuiz'
import { useUpdateStatusQuiz } from './Hook/useUpdateStatusQuiz'
import { useGetQuizStatus } from './Hook/useGetQuizStatus'
import moment from 'moment'


const TableQuiz: FC<{ id_course: any }> = (props: any) => {
    const { updateStatusQuiz } = useUpdateStatusQuiz()
    const id_course_detail = props.id_course
    console.log("id_course_detail ==", id_course_detail)
    const { quiz, getQuiz } = useGetAllQuiz()
    console.log("🚀 ~ file: TableQuiz.tsx:28 ~ quiz", quiz)


    const { openConfirmDialog } = useDialog()
    const { deleteQuiz } = useDeleteQuiz()
    const navigate = useNavigate()


    const OpenQuiz = (quiz: QuizGet) => {
        let newcolor = quiz.status_quiz === 'true' ? true : false
        console.log("🚀 ~ file: TableQuiz.tsx:41 ~ OpenQuiz ~ newcolor", newcolor)
        let textContent = newcolor === true ? 'open' : 'close'
        openConfirmDialog({
            textContent: `ต้องการ${textContent}`,
            onConfirm: async () => {
                await updateStatusQuiz(id_course_detail, quiz.id_document, !newcolor)
                getQuiz()
            },
        })
    }
    const delItem = (quiz: QuizGet) => {
        openConfirmDialog({
            textContent: 'deleteQuiz',
            onConfirm: async () => {
                await deleteQuiz(id_course_detail, quiz.id_document)
                getQuiz()
            },
        })
    }

    const viewDetailUser = (quiz: QuizGet) => {
        console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", quiz)
        navigate(`/detailquiz/${id_course_detail}/${quiz.id_document}`)

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

            label: 'Status',
            value: 'Status',
        },
        {
            label: 'Start Quiz',
            value: 'startQuiz',
        },
        {
            alignValue: 'left',
            alignHeader: 'left',
            label: 'End Quiz',
            value: 'startEnd',
        },
        {
            width: '300',
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
                                startQuiz: moment(e.start_quiz).format('H:mm'),
                                startEnd: moment(e.end_quiz).format('H:mm'),
                                Status: <Chip label={e.status_quiz === "true" ? 'open quiz' : 'closs quiz'} color={e.status_quiz === 'true' ? 'primary' : 'error'} />,
                                delitem: <>
                                    <Button sx={{ mr: 1 }} color={e.status_quiz === 'true' ? 'primary' : 'error'} onClick={() => {
                                        OpenQuiz(e)
                                    }}>Lunch Quiz</Button>
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


