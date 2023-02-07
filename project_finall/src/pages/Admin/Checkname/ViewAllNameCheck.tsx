import { Button, Chip, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../../framework/control";
import { useDialog } from "../../../Hook/dialog/useDialog";
import { TableColumnOptions } from "../../../framework/control/Table/Table";
import Sidebar from "../../../components/componentsAdmin/sidebar/Side-bar";
import Navbar from "../../../components/componentsAdmin/navbar/Navbar";
import { useGetAllNameCheck } from "./useGetAllNameCheck";
const ViewAllNameCheck = () => {
    const { id } = useParams<{ id: string }>();
    const id_course = id !== undefined ? id : ''
    const { viewnamecheck, getAllNameCheck } = useGetAllNameCheck(id_course)
    const data = viewnamecheck
    console.log("🚀 ~ file: viewAllNameCheck.tsx:14 ~ ViewAllNameCheck ~ data", data)
    // const { deleteComment } = useDeleteComment()

    const { openConfirmDialog } = useDialog()
    const navigate = useNavigate()



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
                                    Name Check
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Table columnOptions={columnOptions} dataSource={data.map((e: any, index: number) => {
                                    return {
                                        ...e,
                                        countID: index + 1,
                                        Status: <>
                                            {new Date(e.date_check_name).toLocaleString()}
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

export default ViewAllNameCheck