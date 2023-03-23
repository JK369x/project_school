import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../../framework/control";
import { useDialog } from "../../../Hook/dialog/useDialog";
import { TypeComment } from "./Hook/usePostComment";
import { TableColumnOptions } from "../../../framework/control/Table/Table";
import { useGetAllComment } from "./Hook/useGetAllComment";
import Sidebar from "../../../components/componentsAdmin/sidebar/Side-bar";
import Navbar from "../../../components/componentsAdmin/navbar/Navbar";
import { useDeleteComment } from "./Hook/useDeleteComment";
import ChartComment from "../Chart/ChartComment";
import moment from "moment";
const ViewAllComment = () => {
    const { id } = useParams<{ id: string }>();
    const id_course = id !== undefined ? id : ''
    const { viewcomment, getAllComment } = useGetAllComment(id_course)
    const data = viewcomment
    const { deleteComment } = useDeleteComment()

    const { openConfirmDialog } = useDialog()
    const navigate = useNavigate()



    const delItem = (dataComment: TypeComment) => {
        console.log("🚀 ~ file: ViewAllComment.tsx:26 ~ delItem ~ dataComment", dataComment)
        const new_id = dataComment.id_document !== undefined ? dataComment.id_document : ''
        openConfirmDialog({
            textContent: 'deleteQuiz',
            onConfirm: async () => {
                await deleteComment(id_course, new_id)
                getAllComment()
            },
        })
    }

    const viewDetailUser = (dataComment: TypeComment) => {
        console.log(dataComment)
        console.table(dataComment)
        navigate(`/replycomment/${id_course}/${dataComment.id_document}`)

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
            label: 'User Name',
            value: 'name_user',
        },

        {
            alignValue: 'center',
            alignHeader: 'center',
            label: 'Ratting',
            value: 'ratting',
        },

        {

            alignHeader: 'center',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },


    ]
    return (<>
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={5} >
                        <div className="listContainer">
                            <div className="listTitle">
                                <Typography variant="h1" component="h1" ml={3}>
                                    Chart Comment
                                </Typography>
                                <ChartComment score_props={data} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={7} sx={{ height: 800 }}>
                        <div className="listContainer">
                            <div className="listTitle">
                                <Typography variant="h1" component="h1" ml={3}>
                                    Comment Detail
                                </Typography>
                                <Table columnOptions={columnOptions} dataSource={data.map((e: any, index: number) => {
                                    return {
                                        ...e,
                                        countID: index + 1,
                                        Status: moment(e.date_comment).format('DD MM YYYY H:mm')
                                        ,
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

                            </div>
                        </div>
                    </Grid>

                </Grid>
            </div>
        </div>

    </>)
}

export default ViewAllComment