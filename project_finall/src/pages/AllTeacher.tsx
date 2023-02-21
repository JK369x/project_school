import { Box, Container } from "@mui/system"
import { Navbar } from "../components/Navbar"
import { useGetTeacherLists } from "./Admin/Teacher/Hook/useGetallteacher"
import { Avatar, Button, Card, CardActions, CardContent, Grid, ListItemIcon, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import logo from '../assets/user.png'
import { useNavigate } from "react-router-dom"
import SearchBar from "@mkyy/mui-search-bar"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";
import { TeacherType } from "./Teacher/Hook/CreateTeacher"
import { Footer } from "../components/Footer"
const AllTeacher = () => {
    const { teacherLists } = useGetTeacherLists()
    const navigate = useNavigate()
    const ClickDetail = (detailTeacher: any) => {
        navigate(`/detailtecher/${detailTeacher.id_document}`)
    }


    const [textFieldValue, setTextFieldValue] = useState<any>('')
    const title_name = teacherLists.map((item: any) => { return `${item.firstName} ${item.lastName}` })
    const handleSearch = async (labelOptionValue: any) => {
        let label = labelOptionValue.split(" ")
        console.log("🚀 ~ file: AllTeacher.tsx:23 ~ handleSearch ~ label", label)
        const newdata: any = teacherLists.filter((item: any) => item.firstName == label[0])
        console.log("newdata", newdata)
        console.log('+++++++', labelOptionValue);
        if (newdata.length > 0) {
            const id_doc = await newdata.map((item: any) => { return item.id_document })
            console.log("🚀 ~ file: CategoryCourse.tsx:111 ~ handleSearch ~ id_doc", id_doc)
            navigate(`/detailtecher/${id_doc[0]}`)
        } else {
            console.log("click again")
        }
    };

    const [datebefore, setDateBefore] = useState(moment());
    const [dateafter, setDateAfter] = useState(moment());
    const [btncalendar, setBtncalendar] = useState(false);
    const [datalist, setDataList] = useState<TeacherType[]>([])
    useEffect(() => {
        setDataList(teacherLists)
    }, [teacherLists])
    const handleBefore = (date: any) => {
        const date_time = new Date(date).toDateString()
        setDateBefore(moment(date_time))
    };
    const handleAfter = (date: any) => {
        const date_time = new Date(date).toDateString()
        setDateAfter(moment(date_time))
    };
    const clickcalendar = () => {
        console.log('btn =', btncalendar)
        setBtncalendar(!btncalendar)
    }
    const onclickSearch = () => {
        console.log(`before ${moment(datebefore)} after ${moment(dateafter)}`)
        const newdata = teacherLists.filter((item) => {
            let create_date = new Date(item.createDate._seconds * 1000)
            console.log("create date", create_date)
            console.log("create Date moment", moment(create_date))
            if (moment(create_date) >= moment(datebefore) && moment(create_date) <= moment(dateafter)) {
                console.log('true')
                return item
            } else {
                console.log('false')
                return false
            }
        })
        setDataList(newdata)
    }
    return (<>
        <Navbar />
        <Box sx={{ backgroundColor: '#1e1f1f', height: '100%', minHeight: '100vh', p: 4 }}>
            <Container>

                <Typography variant="h2" component="div" color={"#fff"} sx={{ ml: 6 }}>
                    รายชื่อวิทยากร
                </Typography>

                <Grid container justifyContent={'space-between'} alignContent={'flex-end'} alignItems={'flex-end'} sx={{ width: '100%' }} >
                    <Grid item sx={{ ml: 6 }}>
                        {btncalendar && <>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    label="Select Value"
                                    inputFormat="DD/MM/YYYY"
                                    value={datebefore}
                                    onChange={handleBefore}
                                    renderInput={(params) => <TextField {...params} sx={{
                                        input: { color: '#fff' },
                                        svg: { color: '#77baee' },
                                        label: { color: '#77baee' },
                                        mr: 3, ml: 0.5

                                        // border: '1px solid #ced4da',
                                    }} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    label="Select Value"
                                    inputFormat="DD/MM/YYYY"
                                    value={dateafter}
                                    onChange={handleAfter}
                                    renderInput={(params) => <TextField {...params} sx={{
                                        input: { color: '#fff' },
                                        svg: { color: '#77baee' },
                                        label: { color: '#77baee' },
                                        // border: '1px solid #ced4da',
                                    }} />}
                                />
                            </LocalizationProvider>

                            <Button onClick={onclickSearch} sx={{ ml: 1, mt: 1 }}> ค้นหา </Button>

                        </>}
                    </Grid>
                    <Grid item sx={{ mt: 2, mr: 6 }}>
                        <Grid container >
                            <ListItemIcon onClick={clickcalendar}>
                                <CalendarMonthIcon color="primary" fontSize="large" sx={{
                                    '&:hover': {
                                        color: '#77baee',
                                        cursor: 'pointer',
                                    }
                                    , mr: 1
                                }} />
                            </ListItemIcon>
                            <SearchBar
                                value={textFieldValue}
                                onChange={newValue => setTextFieldValue(newValue)}
                                onSearch={() => { handleSearch(textFieldValue) }}
                                options={title_name} />

                        </Grid>
                    </Grid>

                </Grid>
            </Container>

            {datalist.map((item: any, index: number) => {
                return (<React.Fragment key={index}>
                    <Grid container justifyContent={'center'}   >
                        <Card sx={{ width: 1045, mb: 2, mt: 3, p: 3 }}>
                            <CardContent >
                                <Typography variant="h4" component="div">
                                    ข้อมูลวิทยากร
                                </Typography>
                                <Grid container justifyContent={'space-between'} >
                                    <Grid item sx={{ m: 'auto' }}>
                                        <Avatar src={item.image_rul ? item.image_rul : logo} sx={{ width: 130, height: 130 }} />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'} >
                                    <Grid item >
                                        <Typography onClick={() => { ClickDetail(item) }} variant="h5" borderBottom={2} component="div" mt={2} color='primary' sx={{
                                            '&:hover': {
                                                color: '#77baee',
                                            }
                                        }}>
                                            {`${item.firstName}  ${item.lastName}`}
                                        </Typography>

                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Typography variant="h6" component="div" mt={2}>
                                        เกี่ยวกับวิทยากร
                                    </Typography>
                                    <Typography variant="h6" component="div" >
                                        {item.about ? item.about : 'รอการกรองข้อมูล'}
                                    </Typography>

                                </Grid>
                            </CardContent>
                            {/* <CardActions>
                                <Button >Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                </React.Fragment>)

            })}

        </Box>
        <Footer />
    </>)
}

export default AllTeacher