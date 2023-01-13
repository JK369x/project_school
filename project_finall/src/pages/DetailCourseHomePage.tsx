import React from 'react'
import { Navbar } from '../components/Navbar'
import { useGetCourseDetail } from '../Hook/course/useGetCourseDtail'
import { timecourse } from '../types/timecourse'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Avatar, IconButton, Button } from '@mui/material'
import Grid from '@mui/material/Grid/Grid'
import Image from '../components/Image/Image'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
const DetailCourseHomePage = () => {
  const { state } = useGetCourseDetail()

  const { Start_Register_Date, Start_Register_Time, End_Register_Date, End_Register_Time, Start_Course_Time, End_Course_Time, Course_Date, start_course_learn, start_course_end } = timecourse()


  const Clickfavorite = (item: string) => {

  }

  const navigate = useNavigate()


  console.log("🚀 ~ file: DetailUser.tsx:29 ~ state", state)

  function onClickEdit() {

  }

  return (
    <>
      <Navbar />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h2" sx={{ ml: 4, mt: 2 }} color={'#0F0F0F'} >
          👨🏻‍💻เรียนรู้ทักษะใหม่ให้ทันเทรนโลกปัจจุบัน
        </Typography>


        <Grid container justifyContent={'space-between'} spacing={3} sx={{ mt: 0.1, pl: 1, mb: 3 }}>
          <Grid item container justifyContent={'center'} xs={4} >
            <Image src={state.image} width={400} height={350} />

          </Grid>
          <Grid item container xs={8} >
            <Grid item container xs={12} sx={{ mb: 1 }} justifyContent={'space-between'}>
              <Grid item xs={6}>
                <Button variant="contained" startIcon={<PersonAddIcon />}>

                  เข้าคิว
                </Button>
                <IconButton onClick={() => Clickfavorite(state.id)}
                  color={'error'}
                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,


                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton

                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,
                    color: '#0ab33a'

                  }}
                >
                  {state.min_people}
                  <GroupAddIcon />
                </IconButton>
                <IconButton

                  sx={{
                    zIndex: 2,
                    borderRadius: '0.2',
                    bottom: 0,
                    color: '#b30a0a',
                

                  }}
                >
                  {state.min_people}
                  <GroupRemoveIcon />
                </IconButton>
              </Grid>
              <Grid item container justifyContent={'flex-end'} xs={6} sx={{pr:6,pt:0.5}}>
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
                  {state.create_by_name}
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

          <Grid  item xs={12}>
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
              {state.what_will_student_learn_in_your_course?.input_0}<br />
              {state.what_will_student_learn_in_your_course?.input_1}
              <br />
              {state.what_will_student_learn_in_your_course?.input_2}
              <br />
              {state.what_will_student_learn_in_your_course?.input_3}
            </Typography>
            <Typography variant="h6" mb={1} color={'#FFFFFF'} >
              หลักสูตรประกอบไปด้วย?
            </Typography>
            <Typography marginLeft={2} variant="body2" mb={2} color={'#FFFFFF'} >
              {state.the_course_consists?.input_0}
              <br />
              {state.the_course_consists?.input_1}
              <br />
              {state.the_course_consists?.input_2}
              <br />
              {state.the_course_consists?.input_3}
              <br />
            </Typography>
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