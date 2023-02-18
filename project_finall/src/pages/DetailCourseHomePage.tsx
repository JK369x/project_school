import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { useGetCourseDetail } from './Admin/Courses/Hook/useGetCourseDtail'
import { timecourse } from '../types/timecourse'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Avatar, IconButton, Button, Chip } from '@mui/material'
import Grid from '@mui/material/Grid/Grid'
import Image from '../components/Image/Image'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { UserJoinCourse } from './Admin/Courses/Hook/useJoinCourse'
import { useAppSelector } from '../store/useHooksStore'
import { UserOutCourse } from './Admin/Courses/Hook/useOutcourse'
import { useDispatch } from 'react-redux'
import { setCourseStore } from '../store/slices/courseSlice'
import { CourseListsType } from './Admin/Courses/Hook/useGetCourse'
import { joinCourseUser } from './Admin/joinCourse/useJoinCourse'
import CheckIcon from '@mui/icons-material/Check';
import CheckName from './Admin/Checkname/CheckName'
import { useStatusButtonCheckName } from './Admin/Courses/Hook/useStatusButtonCheckName'
import { useGetAllJoinCourse } from './Admin/Courses/Hook/useGetAllJoinCourse'
import BoyIcon from '@mui/icons-material/Boy';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useUploadFile } from '../file/useUploadFile'
import { UploadButton } from '../framework/control'
import { useGetFavorite } from './Admin/favorite/useGetFavorite'
import { setAuthStore } from '../store/slices/authSlice'
import { useCreateFavorite } from './Admin/favorite/useCreateFavorite'
import SimpleAccordion from './Admin/Quiz/Accordion'
import UploadReceipt from './UploadReceipt'
import { stat } from 'fs'
import CommentCourse from './Admin/Comment/CommentCourse'
import moment from 'moment'
const DetailCourseHomePage = () => {
  const { state } = useGetCourseDetail()
  console.log("🚀 ~ file: DetailCourseHomePage.tsx:35 ~ DetailCourseHomePage ~ state", state)

  const { JoinCourse } = useGetAllJoinCourse()
  const newdata = JoinCourse.map((item) => {
    return item.count_number
  })
  const newjoin = JoinCourse.length

  console.log("🚀 ~ file: DetailCourseHomePage.tsx:33 ~ DetailCourseHomePage ~ newjoin", newjoin)
  //*start register course
  const Start_Register_Date = moment(state.start_register).format('DD-MM-YYYY')
  const Start_Register_Time = new Date(state.start_register).toLocaleTimeString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  });

  //*end register course
  const End_Register_Date = moment(state.End_register).format('DD-MM-YYYY')
  const End_Register_Time = new Date(state.End_register).toLocaleTimeString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  });

  //*start course and End course
  const Start_Course_Time = moment(state.start_learn).format('DD-MM-YYYY')
  const End_Course_Time = moment(state.end_learn).format('DD-MM-YYYY')

  //*Course Date
  const Course_Date = Array.from(state.course_date ? state.course_date : '').map((params: any, index: number) => {
    return (index !== 0 ? ' - ' + params.label : params.label)
  })

  //*Course Time Start and End
  const start_course_learn = new Date(state.start_time).toLocaleTimeString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  })
  const start_course_end = new Date(state.end_time).toLocaleTimeString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  })
  const { uid, status, displayName, photoURL, favorite, email, about } = useAppSelector(({ auth }) => auth)
  const { FavoriteList } = useGetFavorite()
  const favorite_user = useAppSelector(({ auth: { favorite } }) => favorite)
  const { addFavorite } = useCreateFavorite()
  const Clickfavorite = (item: string) => {
    try {
      let favorite: string[] = [...favorite_user ?? []]
      if (favorite.some((params) => params === item)) {
        favorite = favorite.filter((params) => params !== item)
        addFavorite(favorite, uid_login.uid!)
      } else {
        //! เอาออก
        favorite.push(item)
        addFavorite(favorite, uid_login.uid!)
      }
      dispatch(setAuthStore({
        //* ชื่อเหมือนกันไม่ต้อง :
        uid,
        email,
        displayName,
        status,
        favorite,
        photoURL,
        about,
      }),
      )
    } catch (err) {
      console.log("🚀 ~ file: PageHome.tsx:140 ~ Clickfavorite ~ err", err)
    }
  }




  const navigate = useNavigate()




  useEffect(() => {
    setCountJoin(newjoin)
  }, [newjoin])
  const { uploadFile, uploadState } = useUploadFile()
  const uid_login = useAppSelector(({ auth: uid }) => uid)
  const { joinCourse } = UserJoinCourse()
  const { outCourse } = UserOutCourse()
  const { addJoinCourse } = joinCourseUser()
  const { uid_course } = useAppSelector(({ course }) => course);
  const course_id = useAppSelector(({ course: { uid_course } }) => uid_course)
  const dispatch = useDispatch()
  const [countJoin, setCountJoin] = useState(newjoin)
  const ClickDeleteCourseJoin = (datacourse: string) => {
    let course: string[] = [...course_id ?? []]
    try {
      console.log("course ", course)
      if (course.some((prams) => prams === datacourse)) {
        //! เอาออก
        console.log('out')
        setCountJoin(countJoin - 1)
        course = course.filter((params) => params !== datacourse)
        console.log("filter", course)
        outCourse(datacourse)
        addJoinCourse(course, uid_login.uid!)
      } else {
        //* เอาเข้า
        console.log('join')
        setCountJoin(countJoin + 1)
        course.push(datacourse)
        joinCourse(datacourse)
        addJoinCourse(course, uid_login.uid!)
      }
      dispatch(setCourseStore({
        uid_course: course,
      }),
      )
    } catch (err) {
      console.log("🚀 ~ file: PageHome.tsx:140 ~ Clickfavorite ~ err", err)
    }
  }
  // const enddate = new Date(state.End_register).toLocaleDateString()
  // console.log("🚀 ~ file: DetailCourseHomePage.tsx:167 ~ DetailCourseHomePage ~ enddate", enddate)
  // const bewdate = new Date().toLocaleDateString()
  // console.log("🚀 ~ file: DetailCourseHomePage.tsx:168 ~ DetailCourseHomePage ~ bewdate", bewdate)

  const onClickUpload = () => {
    navigate(`/useuploadreceipt/`)
  }
  // const newdate = state.End_register
  // const currentDate = moment();
  // const startDate = moment(state.start_register);
  // console.log("🚀 ~ file: DetailCourseHomePage.tsx:180 ~ startDate", startDate)
  // const endDate = moment(state.End_register)
  // console.log("🚀 ~ file: DetailCourseHomePage.tsx:182 ~ endDate", endDate)

  // const isInRange = currentDate.isBetween(startDate, endDate);
  // console.log("======================", isInRange)

  return (
    <>
      <Navbar />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h2" sx={{ ml: 4, mt: 2 }} color={'#0F0F0F'} >
          👨🏻‍💻เรียนรู้ทักษะใหม่ให้ทันเทรนโลกปัจจุบัน
        </Typography>
        <Grid container spacing={3} sx={{ mt: 0.1, pl: 1, mb: 3 }}>
          <Grid item container justifyContent={'center'} xs={4} >
            <Grid>
              <Image src={state.image} width={400} height={350} />
              <Typography variant="h6"  >
                {/* {`อัพเดทล่าสุด ${new Date(state.updateDate._seconds ? state.updateDate._seconds * 1000 : '').toLocaleString()}`} */}
                {`อัพเดทล่าสุด ${moment(new Date(state.updateDate._seconds ? state.updateDate._seconds * 1000 : '')).format('D MMM YYYY H:mm')}`}
              </Typography>

            </Grid>
          </Grid>
          <Grid item container xs={8} >
            <Grid item container xs={12} sx={{ mb: 1 }}>
              <Grid container xs={12} alignItems={'center'} >
                {/* {new Date(state.End_register) <= new Date() ? */}
                {moment().isBetween(moment(state.start_register), moment(state.End_register)) ?
                  <>
                    {uid_course?.some((params: any) => params === state.id) ?
                      (<>
                        <Button variant="contained" sx={{ mr: 1 }} onClick={() => ClickDeleteCourseJoin(state.id)} color='error' startIcon={<PersonRemoveIcon />}> ออกคิว</Button>
                      </>) :
                      (<>
                        <Button variant="contained" sx={{ mr: 1 }} onClick={() => ClickDeleteCourseJoin(state.id)} color='primary' startIcon={<PersonAddIcon />}>เข้าคิว</Button>
                      </>)}
                  </> :
                  <>
                    <UploadReceipt title_props={state.title} price_props={state.pricing.toLocaleString()} start_props={Start_Course_Time} end_props={End_Course_Time} id_course={state.id} />
                  </>}

                {state.btn_comment == "true" && <>
                  <CommentCourse id={state.id} />
                </>}
                {state.btn_check_name == "true" && <>
                  <CheckName id={state.id} />
                </>}
                <IconButton onClick={() => Clickfavorite(state.id)}
                  color={favorite_user?.some((params: any) => params === state.id) ? 'error' : 'inherit'}
                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,
                  }}>
                  <FavoriteIcon sx={{ ml: 2, mr: 1 }} />
                </IconButton>

                <IconButton
                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,
                    color: '#0ab33a'

                  }}>
                  <Chip icon={<BoyIcon />} label={`${state.min_people} ที่นั่งขั้นต่ำ`} color="error" variant="outlined" />
                </IconButton>
                <IconButton
                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,
                    color: '#b30a0a',
                  }}>
                  <Chip icon={<BoyIcon />} label={`${state.min_people} ที่นั่งสูงสุด`} color="success" variant="outlined" />
                </IconButton>
                <IconButton
                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,
                    color: '#b30a0a',
                  }}>
                  <Chip label={`${countJoin} คนที่อยู่ในคิว`} color="info" variant="outlined" icon={<BoyIcon />} />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 4 }} color={'#0F0F0F'} >
                  ฿{state.pricing.toLocaleString()}
                </Typography>
              </Grid>



            </Grid>
            <Grid container >
              <Grid item xs={2} >
                <Typography variant="body2" mr={1}  >
                  วันเปิดรับสมัคร
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {`${Start_Register_Date} : ${Start_Register_Time}`}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2"   >
                  วันปิดรับสมัคร
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {`${End_Register_Date} : ${End_Register_Time}`}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2"   >
                  เริ่มเรียนวันที่
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {Start_Course_Time}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2"   >
                  สิ้นสุดการเรียน
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {End_Course_Time}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2" mr={1}  >
                  เรียนวันที่
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {Course_Date}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2" mr={1}  >
                  เวลาในการเรียน
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {`${start_course_learn} - ${start_course_end}`}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h6" mr={2}  >
              วิทธยากร
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
              <Grid>
                <Avatar src={state.image_create} sx={{ border: '3px solid #aebfd0', width: 90, height: 90, m: 'auto' }} />
                <Typography variant="body2" sx={{ mt: 1, mb: 1 }}  >
                  {state.create_byName}
                </Typography>
              </Grid>


            </Grid>
            <Grid container justifyContent={'flex-start'} alignItems={'center'}>

              <Grid item>
                <Typography variant="body2"   >
                  เกี่ยวกับผู้สอน
                </Typography>
                <Typography variant="body2" mb={2} sx={{ maxHeight: 70, }} >
                  {state.about ? state.about : 'รอการกรอกข้อมูล'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', backgroundColor: '#1C1D1F', paddingLeft: 5, paddingRight: 5 }}>
        <Grid container justifyContent={'center'}>
          <Typography variant="h3" mb={2} color={'#FFFFFF'} sx={{ mt: 2 }} >
            รายละเอียดหลักสูตร📝
          </Typography>
        </Grid>
        <Grid container justifyContent={'center'}>

          <Grid item xs={12}>
            <Typography variant="body2" mb={2} color={'secondary'}  >
              {state.course_status?.map((params, index) => {
                return (index !== 0 ? ' & ' + params.label : params.label)
              })}
            </Typography>
            <Typography variant="h3" mb={2} color={'#FFFFFF'} >
              {state.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" mb={2} color={'#FFFFFF'}  >
              {state.subtitle}
            </Typography>

          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" mb={1} color={'#FFFFFF'} >
              คุณจะได้อะไรจากการเรียนรู้หลักสูตรนี้?
            </Typography>


            <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
            </Typography>
            {state.what_will_student_learn_in_your_course.map((params: any, index: number) => {
              return (<React.Fragment key={index}>
                <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
                  <CheckIcon /> {params}
                </Typography>
              </React.Fragment>)
            })}


            <Typography variant="h6" mb={1} color={'#FFFFFF'} >
              หลักสูตรประกอบไปด้วย?
            </Typography>

            {state.the_course_consists.map((params: any, index: number) => {
              return (<React.Fragment key={index}>
                <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
                  <CheckIcon /> {params}
                </Typography>
              </React.Fragment>)
            })}
            <Typography variant="h6" mb={1} color={'#FFFFFF'}  >
              ข้อกำหนดเบื้องต้นสำหรับการเรียนหลักสูตรนี้?
            </Typography>
            <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
              {state.whataretherequirement}
            </Typography>
            <Typography variant="h6" mb={1} color={'#FFFFFF'} >
              หลักสูตรนี้เหมาะกับใคร?
            </Typography>
            <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
              {state.who_is_this_course}
            </Typography>
            <Typography variant="h6" mb={2} color={'#FFFFFF'} >
              ผู้ช่วยผู้สอน
            </Typography>
            <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
              {state.teaching_assistant}
            </Typography>
            <Typography variant="body2" mb={1} mr={8} color={'#FFFFFF'} >
              Location
            </Typography>
            <Typography marginLeft={2} variant="body2" mb={1} mr={8} color={'#FFFFFF'}>
              {state.location}
            </Typography>
          </Grid>

          <Grid item xs={6} >
            <Grid container>
              <Typography variant="h3" mb={1} mr={1} color={'#FFFFFF'} >
                ทำแบบทดสอบ
              </Typography>
              <Typography variant="h3" color={'primary'} >
                Quiz
              </Typography>
            </Grid>
            <SimpleAccordion id={state.id} />
          </Grid>
        </Grid>
      </Box>






    </>
  )
}

export default DetailCourseHomePage