import React from 'react'
import { Navbar } from '../components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CourseListsType, useGetCourseLists } from '../Hook/useGetCourse';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Grid, IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PageHome = () => {
    const { CourseLists, getCourseLists } = useGetCourseLists()
    const data = CourseLists
    const navigate = useNavigate()
    // const [status, setStatus] = useState('')
    console.log("🚀 ~ file: page.tsx:15 ~ page ~ data", data)

    // const getValue = () => {

    //     data.map((params, index) => {
    //         return (params.course_status?.forEach(item => {
    //             if (item) {

    //                 setStatus(item.label)
    //             } else {
    //                 console.log('error')
    //             }
    //             console.log("🚀 ~ file: PageHome.tsx:26 ~ data.map ~ item", item)
    //         }))
    //     })
    // }




    return (
        <>
            <Navbar />

            <Grid container justifyContent={'center'} >
                {data.map((item, index) => {

                    return <>
                        <Grid margin={2}>
                            <Card sx={{ height: 430, width: 345 }} key={index}
                                /* It's a prop that adds a shadow to the
                                card. */
                                raised={true}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image={item.image}
                                />
                                <CardContent sx={{ height: 120, }} >
                                    <Grid>
                                        <Grid container justifyContent={'space-between'}>
                                            <Grid >
                                                <Typography gutterBottom variant="h5" component="h5">
                                                    {item.title}
                                                </Typography>


                                            </Grid>
                                            <Grid>
                                                <IconButton
                                                    color='error'
                                                    sx={{
                                                        zIndex: 2,
                                                        borderRadius: '50%',
                                                        bottom: 0,
                                                    }}
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Typography variant="body2" color="text.secondary" sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 3,
                                            }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                                <CardContent sx={{ mt: 1, pt: 3, pb: 0 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        <Rating name="read-only" value={5} readOnly  />
                                        B1,500
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ ml: 1 }}>
                                    <Grid container justifyContent={'space-between'} alignItems={'center'}
                                        alignContent={'center'}
                                        mr={1}>
                                        <Button sx={{}} size="small">Learn More</Button>
                                        <Typography variantMapping={{ body1: 'p' }} component="h2" sx={{
                                            mt: 0.5,
                                            '&:hover': {
                                                cursor: 'pointer',
                                                color: '#8c37f1',

                                            }
                                        }} color='#6d18d5' >
                                            {item.course_status!.map((params, index) => {
                                                // return (params.id === '1' ? params.label : ' & ' + params.label)
                                                return (index !== 0 ? ' & ' + params.label : params.label)
                                            })}
                                        </Typography>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>

                })}
            </Grid>

        </>
    )
}

export default PageHome
