import React from 'react'
import { Navbar } from '../components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGetCourseLists } from '../Hook/useGetCourse';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const page = () => {
    const { CourseLists, getCourseLists } = useGetCourseLists()
    const data = CourseLists
    const navigate = useNavigate()
    console.log("🚀 ~ file: page.tsx:15 ~ page ~ data", data)



    return (
        <>
            <Navbar />

            <Grid container justifyContent={'center'} >
                {data.map((item, index) => {
                    return <>
                        <Grid margin={2}>

                            <Card sx={{ maxWidth: 345 }} key={index}
                                /* It's a prop that adds a shadow to the
                                card. */
                                raised={true}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image={item.image}
                                />
                                <CardContent >
                                    {/* <Typography sx={{m:0,p:0}} variant="h6" component="div">
                                        online & onside
                                    </Typography> */}
                                    <Grid>
                                        <Grid container justifyContent={'space-between'}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <FavoriteIcon/>
                                            </Typography>
                                        </Grid>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ⭐⭐️⭐️⭐️⭐️️ (0)               B1,500
                                        </Typography>

                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>

                })}
            </Grid>

        </>
    )
}

export default page
