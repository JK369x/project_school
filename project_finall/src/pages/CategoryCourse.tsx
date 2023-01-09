import React, { useState } from 'react'
import AccountMenu from '../components/Account_menu'
import { Navbar } from '../components/Navbar'
import { useGetCategoryLists } from '../Hook/category/useGetCategory'
import { Box, Card, CardActions, Grid, Typography, CardMedia, CardContent } from '@mui/material'
import Image from '../components/Image/Image'
import teacher from '../assets/photo-1573166364524-d9dbfd8bbf83.avif'
import { CourseListsType, useGetCourseLists } from '../Hook/course/useGetCourse'
import { Avatar, IconButton, Rating } from '@mui/material';
import react from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
const CategoryCourse = () => {
  const { CourseLists, getCourseLists } = useGetCourseLists()
  const data = CourseLists
  const { CategoryLists, useGetCategory } = useGetCategoryLists()
  const dataCategoryLists = CategoryLists.map((item, index) => {
    return (item.Category_Title)
  }
  )
  const [Category, setCategory] = useState<any>('')
  const queryCategory = (category: any) => {
    console.log("🚀 ~ ", category)
    setCategory(category)
  }

  const allcategoryClick = () => {
    setCategory('')
  }
  const onClickCard = (data: CourseListsType) => {

  }
  const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  let newdata = data
  if (Category) {
    newdata = data.filter((item: any) => item.category === Category)
  } else {
    newdata = data
  }
  return (
    <>
      <Navbar />
      <Grid container justifyContent={'center'} sx={{ mt: 5, }}>
        <Grid container  justifyContent={'center'}  >
          <Image src={teacher} width={1100} height={350}></Image>
        </Grid>
        <Grid container justifyContent={'center'} maxWidth={'75rem'} >
          <Grid container justifyContent={'center'} mt={3}>
            <Typography variant="h5" component="h5" color={'black'}>
              เรียนรู้ทักษะวิชาชีพที่เป็นที่ต้องการ
            </Typography>
          </Grid>


          <Grid container  justifyContent={'center'} >
            <Typography variant='h6' sx={{
              mr: 1, '&:hover': {
                cursor: 'pointer',
                color: '#0085ea'
              }
            }}>
              <span onClick={() => { allcategoryClick() }}>

              All
              </span>
            </Typography>
            {dataCategoryLists.map((item, index) => {
              return (<React.Fragment key={index}>
                <Typography variant='h6' sx={{
                  mr: 1, '&:hover': {
                    cursor: 'pointer',
                    color: '#0085ea'
                  }
                }}>
                  <span onClick={() => { queryCategory(item) }}>

                  {item}
                  </span>
                </Typography>
              </React.Fragment>)
            })}

          </Grid>


          {newdata.map((item, index) => {
            if (item.approval === true) {
              const startCourse = new Date(item.start_course?.seconds * 1000)
              const formattedDate = startCourse.toDateString();
              const start_course_learn = new Date(item.start_register_time?.seconds * 1000).toLocaleTimeString('en-Us', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
                timeZone: 'Asia/Bangkok'
              })
              const start_course_end = new Date(item.start_register_end?.seconds * 1000).toLocaleTimeString('en-Us', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
                timeZone: 'Asia/Bangkok'
              })
              return (<react.Fragment key={index}>
                <a onClick={() => { onClickCard(item) }}>
                  <Grid item container mt={3} mr={4} justifyContent={'center'}>
                    <Card sx={{
                      height: 475, width: 345, borderRadius: 1, '&:hover': {
                        cursor: 'pointer',
                      }
                    }}
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
                              <Typography variant="body2" sx={{
                                mt: 0.5,
                                '&:hover': {
                                  color: '#0085ea',
                                }
                              }} color='#015ca2' >
                                {item.course_status!.map((params, index) => {
                                  return (index !== 0 ? ' & ' + params.label : params.label)
                                })}
                              </Typography>
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
                        <Grid container justifyContent={'space-between'} >
                          <Grid item sx={{ mr: 1 }}>
                            <Rating name="read-only" value={5} getLabelText={getLabelText} readOnly />

                          </Grid>
                          <Grid item >
                            <Typography>
                              {item.pricing.toLocaleString()} THB
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container sx={{ mr: 1 }} alignItems={'center'}>
                          <Grid sx={{ mr: 1.5 }} >
                            <Avatar alt="Remy Sharp" src="#" />
                          </Grid>
                          <Grid >
                            {item.create_by_name}
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions sx={{ mt: 1.5, borderTop: '1px solid rgb(210, 210, 210)' }}>

                        <Grid container>
                          <CalendarMonthIcon sx={{ color: '#0085ea' }} />
                          {Array.from(item.course_date!).map((params: any, index: number) => {
                            return (index !== 0 ? ' - ' + params.label : params.label)
                          })}
                        </Grid>
                        <Grid container justifyContent={'flex-end'}>
                          <AccessTimeIcon sx={{ color: "#0085ea" }} />
                          <Typography>
                            {`${start_course_learn} - ${start_course_end}`}
                          </Typography>
                        </Grid>

                      </CardActions>
                    </Card>
                  </Grid>
                </a>
              </react.Fragment>)
            }
          })}
        </Grid>

      </Grid>


    </>
  )
}

export default CategoryCourse
