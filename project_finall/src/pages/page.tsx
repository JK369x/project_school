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


const page = () => {
    const { CourseLists, getCourseLists } = useGetCourseLists()
    const data = CourseLists
    const navigate = useNavigate()
    console.log("🚀 ~ file: page.tsx:15 ~ page ~ data", data)



    return (
        <>
            <Navbar />
           
                {data.map((item, index) => {
                    return <>
            
                    <Card sx={{ maxWidth: 345 }} key={index}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={item.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    </>
                })}
            
        </>
    )
}

export default page
