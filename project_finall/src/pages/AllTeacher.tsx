import { Box, Container } from "@mui/system"
import { Navbar } from "../components/Navbar"
import { useGetTeacherLists } from "./Admin/Teacher/Hook/useGetallteacher"
import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import React, { useState } from "react"
import logo from '../assets/user.png'
import { useNavigate } from "react-router-dom"
import SearchBar from "@mkyy/mui-search-bar"


const AllTeacher = () => {
    const { teacherLists } = useGetTeacherLists()
    const [textFieldValue, setTextFieldValue] = useState<any>('')
    console.log("🚀 ~ file: AllTeacher.tsx:7 ~ AllTeacher ~ teacherLists", teacherLists)
    const navigate = useNavigate()
    const ClickDetail = (detailTeacher: any) => {
        navigate(`/detailtecher/${detailTeacher.id_document}`)
    }
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
    return (<>
        <Navbar />
        <Box sx={{ backgroundColor: '#1e1f1f', height: '100vh' }}>
            <Container>
                <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ width: '100%', }} >
                    <Grid item sx={{ mt: 2, ml: 6 }}>
                        <Typography variant="h2" component="div" color={"#fff"}>
                            รายชื่อวิทยากร
                        </Typography>

                    </Grid>
                    <Grid item sx={{ mt: 2, mr: 6 }}>
                        <SearchBar
                            value={textFieldValue}
                            onChange={newValue => setTextFieldValue(newValue)}
                            onSearch={() => { handleSearch(textFieldValue) }}
                            options={title_name} />
                    </Grid>

                </Grid>
            </Container>

            {teacherLists.map((item: any, index: number) => {
                return (<React.Fragment key={index}>
                    <Grid container justifyContent={'center'}  >
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
    </>)
}

export default AllTeacher