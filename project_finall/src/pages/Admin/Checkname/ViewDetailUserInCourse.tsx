import { Avatar, Box, Button, Chip, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../../framework/control";
import { useDialog } from "../../../Hook/dialog/useDialog";
import { TableColumnOptions } from "../../../framework/control/Table/Table";
import Sidebar from "../../../components/componentsAdmin/sidebar/Side-bar";
import Navbar from "../../../components/componentsAdmin/navbar/Navbar";
import { useGetNameCheckById } from "./useGetNameCheckById";
import { useGetDetailuserById } from "./useGetDtailuserById";
import { useGetScoreById } from "./useGetScoreById";
import ChartUserQuiz from "../Chart/ChartUserQuiz";

const ViewDetailUserInCourse = () => {
    const { IdnameCheck, getNameCheckById } = useGetNameCheckById()
    const data = IdnameCheck
    // const { deleteComment } = useDeleteComment()
    const { state } = useGetDetailuserById()
    const { openConfirmDialog } = useDialog()
    const navigate = useNavigate()
    const { scoreall } = useGetScoreById(state.id_document)
    console.log("🚀 ~ file: ViewDetailUserInCourse.tsx:22 ~ ViewDetailUserInCourse ~ scoreall", scoreall)


    const delItem = (data: any) => {
        const new_id = data.id_document !== undefined ? data.id_document : ''
        openConfirmDialog({
            textContent: 'deleteQuiz',
            onConfirm: async () => {
                // await deleteComment(id_course, new_id)
                // getAllComment()
            },
        })
    }

    const viewDetailUser = (data: any) => {
        // navigate(`/viewdetailuserincourse/${data.id_user}/${id_course}`)

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
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Name',
            value: 'name',
        },

        {
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Date',
            value: 'Status',
        },

        {
            width: '200',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Delete',
            value: 'delitem',
        },
    ]

    const quizTable: TableColumnOptions[] = [

        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'ID',
            value: 'countID',
        },

        {

            alignValue: 'left',
            alignHeader: 'left',
            label: 'Title Quiz',
            value: 'title_quiz',
        },

        {
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Date',
            value: 'Status',
        },
        {
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Score',
            value: 'Score',
        },

        {
            width: '200',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Delete',
            value: 'delitem',
        },
    ]
    return (<>
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <div className="listContainer">
                            <div className="listTitle">
                                <Typography variant="h1" component="h1" ml={3}>
                                    Chart
                                </Typography>
                                <Box sx={{ height: 500 }}>
                                    <ChartUserQuiz score_props={scoreall} />
                                </Box>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={6}>
                        <div className="listContainer">
                            <div className="listTitle">
                                <Typography variant="h1" component="h1" ml={3}>
                                    User Detail
                                </Typography>
                                <Box sx={{ height: 500 }}>

                                    <Grid container justifyContent={'center'} sx={{}} >
                                        <Avatar src={state.image_rul ? state.image_rul : ''} sx={{ width: 250, height: 250, m: 'auto' }} />
                                    </Grid>
                                    <Grid container justifyContent={'center'} >
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Name: {`${state.firstName} ${state.lastName}`}
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} >
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Email: {state.email}
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} >
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Birthday: {state.birthday}
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} >
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Job: {state.job}
                                        </Typography>
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Agency: {state.agency}
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} >
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Province: {state.province?.label}
                                        </Typography>
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Amphure: {state.amphure?.label}
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} >
                                        <Typography variant="h6" component="h1" ml={3}>
                                            Tambon: {state.tambon?.label}
                                        </Typography>
                                        <Typography variant="h6" component="h1" ml={3}>
                                            zipCode: {state.zipCode?.label}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <div className="listContainer">
                            <div className="listTitle">
                                <Typography variant="h1" component="h1" ml={3}>
                                    Name Check
                                </Typography>
                                <Table columnOptions={columnOptions} dataSource={data.map((e: any, index: number) => {
                                    return {
                                        ...e,
                                        countID: index + 1,
                                        Status: <>
                                            {new Date(e.date_check_name).toLocaleString()}
                                        </>,

                                        delitem: <>
                                            {/* <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                                viewDetailUser(e)
                                            }}>View</Button> */}
                                            <Button sx={{ mr: 0 }} color='error' onClick={() => {
                                                delItem(e)
                                            }}>Delete</Button>
                                        </>
                                    }
                                })} defaultRowsPerPage={10} />
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={6}  >
                        <div className="listContainer">
                            <div className="listTitle">
                                <Typography variant="h1" component="h1" ml={3}>
                                    Quiz
                                </Typography>
                                <Table columnOptions={quizTable} dataSource={scoreall.map((e: any, index: number) => {
                                    return {
                                        ...e,
                                        countID: index + 1,
                                        Status: <>
                                            {new Date(e.createDate._seconds).toLocaleString()}
                                        </>,
                                        Score: <>
                                            <Typography variant="h6" component="h1" ml={3}>
                                                {`${e.total_score} / ${e.full_score}`}
                                            </Typography>
                                        </>,
                                        delitem: <>
                                            {/* <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                                viewDetailUser(e)
                                            }}>View</Button> */}
                                            <Button sx={{ mr: 0 }} color='error' onClick={() => {
                                                delItem(e)
                                            }}>Delete</Button>
                                        </>
                                    }
                                })} defaultRowsPerPage={10} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>

    </>)
}

export default ViewDetailUserInCourse