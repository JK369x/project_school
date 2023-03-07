import React from 'react'
import { Navbar } from '../components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import imagebody from '../assets/body/kenny-eliason-zFSo6bnZJTw-unsplash.jpg'
import logo from '../assets/logo-rmutt/Logo-RMUTT-A4-stork-5-01.png'
const BodyCenterPage = () => {

    const navigate = useNavigate()

    const courseAll = () => {
        navigate(`/category_course`)
    }

    const teacherAll = () => {
        navigate(`/teacheralllist`)
    }

    return (
        <>
            <Grid container justifyContent={'flex-end'} sx={{ height: 600, backgroundColor: '#eeeeee' }} alignItems={'cetner'} alignContent={'center'} >
                <Grid item xs={6} container justifyContent={'flex-end'} alignContent={'center'}>
                    <Grid container justifyContent={'flex-end'}>
                        <Grid container justifyContent={'flex-end'} alignItems={'center'} alignContent={'center'} xs={12}>
                            <img src={logo} alt="" width='180' height='70' style={{ borderRadius: '10px', overflow: 'hidden' }}
                            />

                            <Typography gutterBottom variant="h1" color='#010000' sx={{ mr: 1 }}  >
                                Classroom
                                Real
                            </Typography>
                            <Typography gutterBottom variant="h1" color='primary' >
                                results
                            </Typography>
                        </Grid>
                        <Grid >
                            <Grid container>

                                <Typography gutterBottom variant="h4" color='#010000' sx={{ mr: 1, mt: 2 }} >
                                    เรียนกับเหล่าวิทยากร พร้อมทั้งใบรับ
                                </Typography>
                                <Typography variant="h5" color='#e74c0a' sx={{ mt: 2 }} >
                                    certificate 📝
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography gutterBottom variant="h4" color='#010000' >
                                    &bull; สามารถดาวน์โหลด application เพื่อเพิ่มความสะดวก
                                </Typography>
                                <Typography gutterBottom variant="h4" color='#010000' >
                                    &bull; สามารถทำแบบทดสอบ quiz เพื่อทดสอบความรู้
                                </Typography>
                                <Typography gutterBottom variant="h4" color='#010000' >
                                    &bull; เรียนมีให้เลือกทั้ง 2 รูปแบบ online & onsite
                                </Typography>
                            </Grid>
                            <Grid item sx={{ mr: 9, mt: 2 }}>
                                <Button sx={{ mr: 2 }} onClick={courseAll}>
                                    <Typography variant="h5" color='#ffffff' >
                                        เลือกหลักสูตรที่คุณสนใจ
                                    </Typography>
                                </Button>
                                <Button onClick={teacherAll} sx={{ backgroundColor: '#656565', ml: 1 }}>
                                    <Typography variant="h5" color='#ffffff' >
                                        รู้จักกับเหล่าวิทยากร
                                    </Typography>
                                </Button>

                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'} xs={6}>
                    <img src={imagebody} alt="" width='600' height='450' style={{ borderRadius: '10px', overflow: 'hidden' }}
                    />

                </Grid>
            </Grid>

        </>
    )
}

export default BodyCenterPage
