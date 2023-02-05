import React, { useState } from 'react'
import AccountMenu from '../components/Account_menu'
import { Navbar } from '../components/Navbar'
import { useGetCategoryLists } from './Admin/Categorys/Hook/useGetCategory'
import { Box, Card, CardActions, Grid, Typography, CardMedia, CardContent, Breadcrumbs, Link, Chip } from '@mui/material'
import Image from '../components/Image/Image'
import teacher from '../assets/photo-1573166364524-d9dbfd8bbf83.avif'
import { CourseListsType, useGetCourseLists } from './Admin/Courses/Hook/useGetCourse'
import { Avatar, Rating } from '@mui/material';
import react from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from '../store/useHooksStore'
import { useCreateFavorite } from './Admin/favorite/useCreateFavorite'
import { setAuthStore } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import SearchBar from '@mkyy/mui-search-bar';

const CategoryCourse = () => {

  const { CourseLists } = useGetCourseLists()
  const data = CourseLists
  const { CategoryLists, useGetCategory } = useGetCategoryLists()
  const { addFavorite } = useCreateFavorite()
  const dataCategoryLists = CategoryLists.map((item, index) => {
    return (item.Category_Title)
  }
  )
  const [Category, setCategory] = useState<any>('')
  const queryCategory = (category: any) => {
    setCategory(category)
  }
  const navigate = useNavigate()
  const allcategoryClick = () => {
    setCategory('')
  }
  const onClickCard = (data: CourseListsType) => {
    navigate(`/detailcoursehomepage/${data.id_document}`)
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
  const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth)
  const dispatch = useAppDispatch()
  const uid_login = useAppSelector(({ auth: uid }) => uid)
  const favorite_user = useAppSelector(({ auth: { favorite } }) => favorite)
  const Clickfavorite = (item: string) => {
    //! ?? ถ้าไม่ใช่่ undefine and false
    try {

      let favorite: string[] = [...favorite_user ?? []]
      if (favorite.some((params) => params === item)) {
        //! เอาออก
        favorite = favorite.filter((params) => params !== item)
        addFavorite(favorite, uid_login.uid!)
      } else {
        favorite.push(item)
        addFavorite(favorite, uid_login.uid!)
      }


      dispatch(setAuthStore({
        //* ชื่อเหมือนกันไม่ต้อง :
        uid: uid,
        displayName: displayName,
        status: status,
        favorite,
      }),
      )
    } catch (err) {
      console.log("🚀 ~ file: PageHome.tsx:140 ~ Clickfavorite ~ err", err)
    }
  }

  let newdata = data
  if (Category) {
    newdata = data.filter((item: any) => item.category.label === Category)
  } else {
    newdata = data
  }
  return (
    <>
      <Navbar />
      <Grid container justifyContent={'center'} sx={{ backgroundColor: '#1d1d1d' }}>

        <Grid container justifyContent={'center'} maxWidth={'75rem'} >
          <Grid container justifyContent={'center'} mt={3}>
            <Typography variant="h5" component="h5" color={'#fff'}>
              เรียนรู้ทักษะวิชาชีพที่เป็นที่ต้องการ
            </Typography>
          </Grid>


          <Grid container justifyContent={'center'} >
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h5" component="h5" color={'#fff'}>
                เลือกหมวดหมู่ที่คุณสนใจ
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <SearchBar />
            </Grid>
            <Grid item xs={12}>
              <Chip label="All" onClick={() => { allcategoryClick() }} color='primary' sx={{ width: 60, mr: 1 }} />
              {dataCategoryLists.map((item, index) => {
                return (<React.Fragment key={index}>
                  <Chip label={item} onClick={() => { queryCategory(item) }} color='primary' sx={{ maxWidth: 150, mr: 1 }} />
                </React.Fragment>)
              })}
            </Grid>

          </Grid>

          <Grid sx={{ flexGrow: 1, mt: 4 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={5}>

                {newdata.map((item, index) => {
                  if (item.approval === true) {

                    const start_course_learn = new Date(item.start_register).toLocaleTimeString('en-Us', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                      timeZone: 'Asia/Bangkok'
                    })
                    const start_course_end = new Date(item.End_register).toLocaleTimeString('en-Us', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                      timeZone: 'Asia/Bangkok'
                    })
                    return (<react.Fragment key={index}>

                      <Grid key={index} item  >

                        <Card sx={{
                          height: 490, width: 345, borderRadius: 1, '&:hover': {
                            cursor: 'pointer',
                          }
                        }}
                          /* It's a prop that adds a shadow to the
                          card. */
                          raised={true}>
                          <CardMedia
                            onClick={() => { onClickCard(item) }}
                            component="img"
                            alt="green iguana"
                            height="200"
                            image={item.image}
                          />
                          <CardContent sx={{ height: 120, }} >
                            <Grid>
                              <Grid container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                                <Grid item xs={6}>
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

                                </Grid>
                                <Grid item xs={6} container justifyContent={'flex-end'}>
                                  <AccessTimeIcon sx={{ color: "#0085ea" }} />
                                  <Typography>
                                    {`${start_course_learn} - ${start_course_end}`}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid container justifyContent={'space-between'}>


                                <Grid item xs={10}>
                                  <Typography gutterBottom variant="h6" sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 1,

                                  }}>
                                    {item.title}
                                  </Typography>

                                </Grid>

                                <Grid>
                                  <IconButton onClick={() => Clickfavorite(item.id_document)}
                                    color={favorite_user?.some((params: any) => params === item.id_document) ? 'error' : 'inherit'}
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
                          <CardContent sx={{ mt: 3, pt: 3, pb: 0 }}>
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
                                <Avatar alt="Remy Sharp" src={item.image_create} />
                              </Grid>
                              <Grid >
                                {item.create_byName}
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


                          </CardActions>
                        </Card>
                      </Grid>



                    </react.Fragment>)
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>


    </>
  )
}

export default CategoryCourse
