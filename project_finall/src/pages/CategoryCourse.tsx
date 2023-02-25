import React, { useEffect, useState } from 'react'
import AccountMenu from '../components/Account_menu'
import { Navbar } from '../components/Navbar'
import { useGetCategoryLists } from './Admin/Categorys/Hook/useGetCategory'
import { Box, Card, CardActions, Grid, Typography, CardMedia, CardContent, Breadcrumbs, Link, Chip, ListItemIcon, TextField, Button } from '@mui/material'
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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import SearchBar from '@mkyy/mui-search-bar';
import { openAlertError } from '../store/slices/alertSlice'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import moment from "moment";
import { Footer } from '../components/Footer'
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
  const { uid, status, displayName, photoURL, about, email } = useAppSelector(({ auth }) => auth)
  const dispatch = useAppDispatch()
  const uid_login = useAppSelector(({ auth: uid }) => uid)
  const favorite_user = useAppSelector(({ auth: { favorite } }) => favorite)
  const Clickfavorite = (item: string) => {
    //! ?? ถ้าไม่ใช่่ undefine and false
    if (uid) {
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
          photoURL,
          about,
          email,
        }),
        )
      } catch (err) {
        console.log("🚀 ~ file: PageHome.tsx:140 ~ Clickfavorite ~ err", err)
      }
    } else {
      dispatch(openAlertError('กรุณาเข้าสู่ระบบก่อนกดถูกใจ'))
    }

  }
  const title_course = data.map((item: any) => { return item.title })
  let newdata = data
  if (Category) {
    newdata = data.filter((item: any) => item.category.label === Category)
  } else {
    newdata = data
  }

  const [textFieldValue, setTextFieldValue] = useState<any>('')
  console.log("🚀======e", textFieldValue)
  const handleSearch = async (labelOptionValue: any) => {
    const newdata: any = data.filter((item: any) => item.title == labelOptionValue)
    console.log("newdata", newdata)
    console.log('+++++++', labelOptionValue);
    if (newdata.length > 0) {
      const id_doc = await newdata.filter((item: any) => item.title === labelOptionValue)
      console.log("🚀 ~ file: CategoryCourse.tsx:111 ~ handleSearch ~ id_doc", id_doc)
      setCourseData(id_doc)
    } else {
      console.log("click again")
    }
  };
  const [corusedata, setCourseData] = useState<CourseListsType[]>([]);
  const [datebefore, setDateBefore] = useState(moment());
  const [dateafter, setDateAfter] = useState(moment());
  const [btncalendar, setBtncalendar] = useState(false);
  useEffect(() => {
    setCourseData(newdata)
  }, [Category, data])

  const clickcalendar = () => {
    console.log('btn =', btncalendar)
    setBtncalendar(!btncalendar)

  }
  const handleBefore = (date: any) => {
    console.log("🚀 ~ file: Testgrid.tsx:18 ~ handleChange ~ date", moment(date).format('DD/MM/YYYY'))
    setDateBefore(date)
  };
  const handleAfter = (date: any) => {
    console.log("🚀 ~ file: Testgrid.tsx:18 ~ handleChange ~ date", moment(date).format('DD/MM/YYYY'))
    setDateAfter(date)
  };
  const CancelResearch = () => {
    setCourseData(newdata)
  }
  const onclickSearch = () => {
    console.log(`before ${moment(datebefore)} after ${moment(dateafter)}`)
    const coursedata = newdata.filter((item) => {
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
    setCourseData(coursedata)
  }
  return (
    <>
      <Navbar />
      <Box sx={{
        backgroundColor: '#1e1f1f',
        p: 4,
        minHeight: '100vh',
      }}>
        <Grid container justifyContent={'center'} sx={{ backgroundColor: '#1e1f1f' }} >
          <Grid container justifyContent={'center'} maxWidth={'75rem'} >
            <Grid container justifyContent={'center'} mt={5} mb={4}>
              <Typography variant="h2" component="h5" color={'#fff'}>
                เรียนรู้ทักษะวิชาชีพที่เป็นที่ต้องการ
              </Typography>
            </Grid>


            <Grid container justifyContent={'center'} sx={{ ml: 5 }}>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h5" color={'#fff'}>
                  เลือกหมวดหมู่ที่คุณสนใจ
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} sx={{ ml: 5 }} >
              <Grid item >
                <Chip label="All" onClick={() => { allcategoryClick() }} color='primary' sx={{ width: 60, mr: 1 }} />
                {dataCategoryLists.map((item, index) => {
                  return (<React.Fragment key={index}>
                    <Chip label={item} onClick={() => { queryCategory(item) }} color='primary' sx={{ maxWidth: 150, mr: 1 }} />
                  </React.Fragment>)
                })}
              </Grid>

            </Grid>
            <Grid container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'} sx={{ mt: 3 }}>
              <Grid item xs={7} sx={{ ml: 5 }}>
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
              <Grid item xs={4}>
                <Grid container>
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
                    options={title_course}
                    onCancelResearch={() => { CancelResearch() }} />
                </Grid>
              </Grid>
            </Grid>

            <Grid sx={{ flexGrow: 1, mt: 2 }} container spacing={2}>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-start" sx={{ ml: 0.4 }} spacing={5}>

                  {corusedata.map((item, index) => {
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
      </Box>
      <Footer />

    </>
  )
}

export default CategoryCourse
