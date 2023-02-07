import { Button, Chip, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../../framework/control";
import { useDialog } from "../../../Hook/dialog/useDialog";
import { TypeComment } from "./Hook/usePostComment";
import { TableColumnOptions } from "../../../framework/control/Table/Table";
import { useGetAllComment } from "./Hook/useGetAllComment";
import Sidebar from "../../../components/componentsAdmin/sidebar/Side-bar";
import Navbar from "../../../components/componentsAdmin/navbar/Navbar";
import { useDeleteComment } from "./Hook/useDeleteComment";
const ViewAllComment = () => {
    const { id } = useParams<{ id: string }>();
    const id_course = id !== undefined ? id : ''
    console.log("🚀 ~ file: ViewAllComment.tsx:12 ~ ViewAllComment ~ id_course", id_course)
    const { viewcomment, getAllComment } = useGetAllComment(id_course)
    const data = viewcomment
    console.log("🚀 ~ file: ViewAllComment.tsx:15 ~ ViewAllComment ~ data", data)
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
        // navigate(`/detailquiz/${id_course_detail}/${quiz.id_document}`)

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
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Date',
            value: 'Status',
        },
        {
            alignValue: 'center',
            alignHeader: 'center',
            label: 'Ratting',
            value: 'ratting',
        },
        {
            width: '300',
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Comment',
            value: 'comment_user',
        },
        {
            width: '300',
            alignHeader: 'left',
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
                <div className="listContainer">
                    <div className="listTitle">
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid container justifyContent={'space-between'} alignItems={'center'} >

                                <Typography variant="h1" component="h1" ml={3}>
                                    Comment
                                </Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <Table columnOptions={columnOptions} dataSource={data.map((e: any, index: number) => {
                                    return {
                                        ...e,
                                        countID: index + 1,
                                        Status: <>
                                            {new Date(e.date_comment).toLocaleString()}
                                        </>,
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

    </>)
}

export default ViewAllComment