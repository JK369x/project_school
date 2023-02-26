import { Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../../framework/control";
import { useDialog } from "../../../Hook/dialog/useDialog";
import { TableColumnOptions } from "../../../framework/control/Table/Table";
import Sidebar from "../../../components/componentsAdmin/sidebar/Side-bar";
import Navbar from "../../../components/componentsAdmin/navbar/Navbar";
import { useGetAllNameCheck } from "./useGetAllNameCheck";
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment, { Moment } from 'moment'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useEffect, useState } from "react";
import { useDeleteCheckName } from "./useDeleteCheckName";
const ViewAllNameCheck = () => {
    const { id } = useParams<{ id: string }>();
    const id_course = id !== undefined ? id : ''
    const { viewnamecheck, getAllNameCheck } = useGetAllNameCheck(id_course)
    const data = viewnamecheck
    const { deleteCheckName } = useDeleteCheckName()

    const { openConfirmDialog } = useDialog()
    const navigate = useNavigate()



    const delItem = (data: any) => {
        const new_id = data.id_document !== undefined ? data.id_document : ''
        openConfirmDialog({
            textContent: 'deleteQuiz',
            onConfirm: async () => {
                await deleteCheckName(id_course, new_id)
                getAllNameCheck()
            },
        })
    }

    const viewDetailUser = (data: any) => {
        navigate(`/viewdetailuserincourse/${data.id_user}/${id_course}`)

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
            label: 'Email',
            value: 'email',
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
    const [datalist, setDataList] = useState<any>(data)
    console.log("🚀  datalist:", datalist)
    const [datebefore, setDateBefore] = useState(moment());
    const [dateafter, setDateAfter] = useState(moment());
    useEffect(() => {
        setDataList(data)
    }, [datebefore, dateafter, data])
    const handleBefore = (date: any) => {
        setDateBefore(moment(date))
    };
    const handleAfter = (date: any) => {
        setDateAfter(moment(date))
    };
    const onclickSearch = () => {
        console.log(`before ${moment(datebefore)} after ${moment(dateafter)}`)
        const coursedata = datalist.filter((item: any) => {
            let create_date = moment(item.date_check_name._seconds * 1000)
            console.log("date check", create_date)
            console.log("before check", datebefore)
            console.log("after check", dateafter)
            if (moment(create_date).isBetween(datebefore, dateafter)) {
                console.log('true')
                return item
            } else {
                console.log('false')
                return false
            }
        })
        if (coursedata.length > 0) {
            console.log("🚀 ~ file: Couse.tsx:130 ~ coursedata ~ coursedata", coursedata)
            setDataList(coursedata)

        } else {
            setDataList(coursedata)
            console.log("not found course")

        }
    }
    return (<>
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Grid container justifyContent={'space-between'} alignItems={'center'} >
                            <Typography variant="h1" component="h1" ml={3}>
                                Name Check
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'flex-end'} alignContent={'center'} alignItems={'center'} sx={{ pr: 3 }} >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    disableMaskedInput
                                    label="Select Value"
                                    inputFormat="D/MM/YYYY H:mm"
                                    ampm={false}
                                    value={datebefore}
                                    onChange={handleBefore}
                                    renderInput={(params: any) => <TextField {...params} sx={{
                                        // input: { color: '#fff' },
                                        // svg: { color: '#77baee' },
                                        // label: { color: '#77baee' },
                                        mr: 3, ml: 0.5

                                        // border: '1px solid #ced4da',
                                    }} />}
                                />

                                <DateTimePicker
                                    disableMaskedInput
                                    label="Select Value"
                                    inputFormat="D/MM/YYYY H:mm"
                                    ampm={false}
                                    value={dateafter}
                                    onChange={handleAfter}
                                    renderInput={(params) => <TextField {...params} sx={{
                                        // input: { color: '#fff' },
                                        // svg: { color: '#77baee' },
                                        // label: { color: '#77baee' },
                                        // border: '1px solid #ced4da',
                                    }} />}
                                />
                            </LocalizationProvider>
                            <Button onClick={onclickSearch} sx={{ ml: 3, mr: 2 }}> ค้นหา </Button>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Table columnOptions={columnOptions} dataSource={datalist.map((e: any, index: number) => {
                                    return {
                                        ...e,
                                        countID: index + 1,
                                        Status: moment(e.date_check_name).format('DD MM YYYY H:mm'),
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