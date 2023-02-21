import { Box, Container, height } from "@mui/system"
import { Navbar } from "../components/Navbar"
import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useGetDetailUser } from "./Admin/Users/Hook/useGetDetailUser"
import logo from '../assets/user.png'
import { useGetcourseById } from "./Admin/Teacher/Hook/useGetcourseById"
import React from "react"
import { Footer } from "../components/Footer"
const DetailTeacher = () => {
    const { state } = useGetDetailUser()
    const { CourseLists } = useGetcourseById()
    const data = CourseLists
    console.log("🚀 ~ file: DetailTeacher.tsx:12 ~ DetailTeacher ~ data", data)
    const lengthdata = data.length
    return (<>
        <Navbar />

        <Box sx={{ backgroundColor: '#1e1f1f', display: "flex", alignItems: "start", pb: 3, minHeight: '100vh' }}>
            <Container >
                <Card sx={{ mt: 5, pt: 5, pl: 15, pr: 15, }}>
                    <CardContent>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item xs={8} >
                                <Typography variant="h6" component="div">
                                    วิทยากร
                                </Typography>
                                <Typography mb={3} variant="h2" color='#000000'>
                                    {`${state.firstName} ${state.lastName}`}
                                </Typography>
                                <Typography variant="h6" >
                                    จำนวนคอร์สทั้งหมด
                                </Typography>
                                <Typography mb={3} variant="h2" color='#000000'>
                                    {lengthdata}
                                </Typography>
                                <Typography variant="h6" >
                                    รายละเอียดวิทยากร
                                </Typography>
                                <Typography variant="h4" color='#000000'>
                                    {state.about ? state.about : "รอการกรอกข้อมูล"}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ mr: 2 }} >
                                <Avatar src={state.image_rul ? state.image_rul : logo} sx={{ width: 200, height: 200, m: 'auto' }} />
                                <Typography variant="h6" mt={5} >
                                    เกิดวันที่
                                </Typography>
                                <Typography ml={1} variant="h6" color='#000000'>
                                    {state.birthday ? new Date(state.birthday).toLocaleDateString() : ""}
                                </Typography>
                                <Typography variant="h6" mr={1}   >
                                    อีเมลย์
                                </Typography>
                                <Typography ml={1} variant="h6" color='#000000'>
                                    {state.email ? state.email : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" mt={3} >
                            {`คอร์สทั้งหมด(${lengthdata})`}
                        </Typography>
                    </CardContent>

                    {data.map((item: any, index: number) => {
                        return (<React.Fragment key={index}>
                            <Card sx={{ backgroundColor: '#ffffff', pt: 1, pl: 1, mb: 2 }}  >
                                <Grid container justifyContent={'space-between'} sx={{}} >
                                    <Grid item xs={3}>
                                        <img src={item.image} alt="" width='300' height='250' />
                                    </Grid>
                                    <Grid item xs={8} sx={{ pl: 3 }}>
                                        <Typography variant="h6" mr={2}  >
                                            Title
                                        </Typography>
                                        <Typography variant="h6" color='#000000'  >
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h6" mr={2} sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 1,
                                        }} >
                                            SubTitle
                                        </Typography>
                                        <Typography variant="h6" color='#000000'  >
                                            {item.subtitle}
                                        </Typography>
                                        <Grid container justifyContent={'space-between'} alignItems={'flex-end'} sx={{ mt: 2 }}>
                                            <Button sx={{ mt: 2 }}>Learn more</Button>
                                            <Typography variant="h6" color='#000000' mt={2} sx={{ mr: 3 }}  >
                                                {`${item.pricing.toLocaleString()} THB`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>

                        </React.Fragment>)
                    })}
                </Card>

            </Container>
        </Box>
        <Footer />
    </>)
}
export default DetailTeacher