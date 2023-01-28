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
const DetailCourseHomePage = () => {
  const { state } = useGetCourseDetail()
  const { JoinCourse } = useGetAllJoinCourse()
  const newdata = JoinCourse.map((item) => {
    return item.count_number
  })
  const newjoin = JoinCourse.length

  console.log("🚀 ~ file: DetailCourseHomePage.tsx:33 ~ DetailCourseHomePage ~ newjoin", newjoin)
  //*start register course
  const Start_Register_Date = new Date(state.start_register).toLocaleDateString();
  const Start_Register_Time = new Date(state.start_register).toLocaleTimeString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  });

  //*end register course
  const End_Register_Date = new Date(state.End_register).toLocaleDateString();
  const End_Register_Time = new Date(state.End_register).toLocaleTimeString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  });

  //*start course and End course
  const Start_Course_Time = new Date(state.start_learn).toLocaleDateString()
  const End_Course_Time = new Date(state.end_learn).toLocaleDateString()

  //*Course Date
  const Course_Date = Array.from(state.course_date!).map((params: any, index: number) => {
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


  const Clickfavorite = (item: string) => {

  }




  const navigate = useNavigate()



  function onClickEdit() {

  }

  useEffect(() => {
    setCountJoin(newjoin)
  }, [newjoin])
  const { displayName, uid, photoURL, favorite } = useAppSelector(({ auth }) => auth)
  const { uploadFile, uploadState } = useUploadFile()
  const uid_login = useAppSelector(({ auth: uid }) => uid)
  const { joinCourse } = UserJoinCourse()
  const { outCourse } = UserOutCourse()
  const { addJoinCourse } = joinCourseUser()
  const { uid_course } = useAppSelector(({ course }) => course);
  const course_id = useAppSelector(({ course: { uid_course } }) => uid_course)
  const dispatch = useDispatch()
  const [countJoin, setCountJoin] = useState(newjoin)
  console.log("🚀 ~ file: DetailCourseHomePage.tsx:101 ~ DetailCourseHomePage ~ countJoin", countJoin)
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

  const onUploadImage = (files: FileList | null) => {
    if (files) {
      uploadFile(files[0], `myImages/${uid}/`)
    }
    const get_url = uploadState.downloadURL
    console.log("🚀 ~ file: DetailCourseHomePage.tsx:147 ~ onUploadImage ~ get_url", get_url)
  }

  return (
    <>
      <Navbar />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h2" sx={{ ml: 4, mt: 2 }} color={'#0F0F0F'} >
          👨🏻‍💻เรียนรู้ทักษะใหม่ให้ทันเทรนโลกปัจจุบัน
        </Typography>


        <Grid container spacing={3} sx={{ mt: 0.1, pl: 1, mb: 3 }}>
          <Grid item container justifyContent={'center'} xs={4} >
            <Image src={state.image} width={400} height={350} />

          </Grid>
          <Grid item container xs={8} >
            <Grid item container xs={12} sx={{ mb: 1 }}>
              <Grid container xs={6} alignItems={'center'} >
                {/* <Button variant="contained" sx={{ mr: 1, backgroundColor: '#4e3fd3' }} onClick={() => ClickTransaction()} startIcon={<PostAddIcon />}>แนบสลีป</Button> */}
                <UploadButton label={'แนบสลีป'} onUploadChange={onUploadImage} />
                {uid_course?.some((params: any) => params === state.id) ? (<>
                  <Button variant="contained" sx={{ mr: 1 }} onClick={() => ClickDeleteCourseJoin(state.id)} color='error' startIcon={<PersonRemoveIcon />}> ออกคิว</Button>
                </>) : (<>
                  <Button variant="contained" sx={{ mr: 1 }} onClick={() => ClickDeleteCourseJoin(state.id)} color='primary' startIcon={<PersonAddIcon />}>เข้าคิว</Button>
                </>)}
                {state.btn_check_name == "true" && <>
                  <CheckName id={state.id} />
                </>}
                <IconButton onClick={() => Clickfavorite(state.id)}
                  color={'error'}
                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,
                  }}>
                  <FavoriteIcon />
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
              </Grid>

              <Grid item container justifyContent={'flex-end'} xs={6} sx={{ pr: 6, pt: 0.5 }}>
                <Typography variant="h6" sx={{ ml: 4 }} color={'#0F0F0F'} >
                  ฿{state.pricing.toLocaleString()}
                </Typography>


              </Grid>
              <Grid>

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

            <Grid>
              <Typography variant="h6" mr={2}  >
                วิทธยากร
              </Typography>

              <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} >
                <Avatar src={state.image_create} sx={{ border: '3px solid #aebfd0', width: 90, height: 90 }} />
              </Grid>
              <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} >
                <Typography variant="body2" mb={2}  >
                  {state.create_byName}
                </Typography>



              </Grid>
              <Typography variant="body2"   >
                เกี่ยวกับผู้สอน
              </Typography>
              <Typography variant="body2" mb={2} sx={{ maxHeight: 70, }} >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam iusto ratione repellat aperiam nobis esse vitae exercitationem aut quo incidunt eius quis consequuntur, est assumenda possimus, rem velit nulla voluptate.
              </Typography>
            </Grid>






          </Grid>
        </Grid>

      </Box>

      <Box sx={{ width: '100%', backgroundColor: '#1C1D1F', paddingLeft: 5 }}>
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

            {/* <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
              {state.what_will_student_learn_in_your_course}<br />
            </Typography> */}
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

          </Grid>

          <Grid item xs={6}>
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
              จำนวนคนขั้นต่ำในการเปิดหลักสูตร
            </Typography>
            <Typography marginLeft={2} variant="body2" mb={1} mr={8} color={'#FFFFFF'}>
              {state.min_people}
            </Typography>
          </Grid>
        </Grid>
      </Box>






    </>
  )
}

export default DetailCourseHomePage