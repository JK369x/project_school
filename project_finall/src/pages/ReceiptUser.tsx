import { FC, useEffect, useMemo, useState } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Box, Container } from "@mui/system"
import { Button, Card, Chip, Grid, Typography } from "@mui/material"
import { useGetJoinCourseById } from "./Admin/Courses/Hook/useGetJoinCourseById"
import React from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"
export type StatusCheckType = 'owner' | 'join'
const ReceiptUser: FC = () => {
    const { getJoin } = useGetJoinCourseById()
    console.log("🚀 :", getJoin)
    const transaction_approval = getJoin.filter((item: any) => item.approval === true)
    const transaction_false = getJoin.filter((item: any) => item.approval === false)
    console.log("🚀 ~ file: ReceiptUser.tsx:16 ~ transaction_false:", transaction_false)
    const navigate = useNavigate()
    const [Category, setCategory] = useState<any>(transaction_approval)
    const [colornew, setNewColor] = useState('')
    // const color_choice = useMemo(() => {

    // }, [Category])
    useEffect(() => {
        setCategory(transaction_approval)
        setNewColor('primary')
    }, [getJoin])
    const queryCategory = (category: StatusCheckType) => {
        if (category === 'owner') {
            setCategory(transaction_approval)
            setNewColor('primary')
        }
        if (category === 'join') {
            setCategory(transaction_false)
            setNewColor('error')
        }
    }
    const clickLearnMore = (id_course: string) => {
        navigate(`/detailcoursehomepage/${id_course}`)
    }
    return (<>
        <Navbar />

        <Box sx={{ backgroundColor: '#1e1f1f', p: 4, minHeight: '100vh' }}>
            <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4 }}>
                <Grid sx={{ mt: 2, mb: 2 }} container justifyContent={'center'}>
                    <Typography gutterBottom variant="h1" mt={6}>
                        Course
                    </Typography>
                </Grid>
                <Chip label={'คอร์สที่เป็นเจ้าของ'} onClick={() => { queryCategory('owner') }} color={colornew === 'primary' ? 'primary' : 'default'} sx={{ maxWidth: 150, mr: 1 }} />
                <Chip label={'คอร์สที่เข้าคิวแล้ว'} onClick={() => { queryCategory('join') }} color={colornew === 'primary' ? 'default' : 'primary'} sx={{ maxWidth: 150, mr: 1 }} />
                {Category.map((item: any, index: number) => {
                    return (<React.Fragment key={index}>
                        <Card sx={{ backgroundColor: '#ffffff', p: 3, mb: 2, mt: 2 }}  >
                            <Grid container justifyContent={'space-between'} sx={{}} >
                                <Grid item xs={3}>
                                    <img src={item.image_course} alt="" width='300' height='250' />
                                </Grid>
                                <Grid item xs={8} sx={{ pl: 3 }}>
                                    <Typography variant="h6" color='primary'  >
                                        {item.approval === false ? 'คอร์สกำลังจะเปิดในอนาคต' : ''}
                                    </Typography>
                                    <Typography variant="h6" mr={2}  >
                                        Title
                                    </Typography>
                                    <Typography variant="h6" color='#000000'  >
                                        {item.courseName}
                                    </Typography>
                                    <Typography variant="h6" mr={2} sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1,
                                    }} >
                                        Join Date
                                    </Typography>
                                    <Typography variant="h6" color='#000000'  >
                                        {moment(item.joinDate._seconds * 1000).format('DD/MM/YYYY H:mm')}
                                    </Typography>

                                    <Grid container justifyContent={'space-between'} alignContent={'flex-end'} alignItems={'flex-end'}>


                                        <Button sx={{ mt: 10 }} onClick={() => clickLearnMore(item.course_id)}>Learn more</Button>

                                        <Typography variant="h6" color='#000000' mt={2} sx={{ mr: 3 }}  >
                                            {`${item.pricing.toLocaleString()} THB`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </React.Fragment>)
                })}
            </Container>
        </Box >
        <Footer />
    </>)
}

export default ReceiptUser