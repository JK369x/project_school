import React from 'react'
import { Navbar } from '../components/Navbar'
import { useGetCourseDetail } from '../Hook/course/useGetCourseDtail'
import { timecourse } from '../types/timecourse'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Avatar, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid/Grid'
import Image from '../components/Image/Image'
import { Button } from '../framework/control'
import FavoriteIcon from '@mui/icons-material/Favorite';
const DetailCourseHomePage = () => {
  const { state } = useGetCourseDetail()

  const { Start_Register_Date, Start_Register_Time, End_Register_Date, End_Register_Time, Start_Course_Time, End_Course_Time, Course_Date, start_course_learn, start_course_end } = timecourse()



  const navigate = useNavigate()


  console.log("🚀 ~ file: DetailUser.tsx:29 ~ state", state)

  function onClickEdit() {

  }

  return (
    <>
      <Navbar />
      <Box sx={{ width: '100%' }}>
        <Grid container justifyContent={'space-between'} spacing={3} sx={{ mt: 2, ml: 1, }}>
          <Grid item container justifyContent={'center'} xs={4} sx={{ maxHeight: 700, height: 500, border: 'solid red' }}>
            <Image src={state.image} width={400} height={350} />

          </Grid>
          <Grid item container xs={8} sx={{ pb: 10, maxHeight: 700, height: 500, border: 'solid red' }}>
            <Grid container >
              <Grid item xs={2} >
                <Typography variant="body2" mr={1}  >
                  Start registration
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {`${Start_Register_Date} : ${Start_Register_Time}`}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2"   >
                  End registration
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {`${End_Register_Date} : ${End_Register_Time}`}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2"   >
                  Start Course
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {Start_Course_Time}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2"   >
                  End Course
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {End_Course_Time}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2" mr={1}  >
                  Course Date
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {Course_Date}
                </Typography>
              </Grid>

              <Grid item xs={2} >
                <Typography variant="body2" mr={1}  >
                  Time Course
                </Typography>
                <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                  {`${start_course_learn} - ${start_course_end}`}
                </Typography>
              </Grid>
            </Grid>

            <Grid>

              <Typography variant="h6" mr={2}  >
                Lecturer
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
                About
              </Typography>
              <Typography variant="body2" mb={2} sx={{ maxHeight: 70, height: 70 }} >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam iusto ratione repellat aperiam nobis esse vitae exercitationem aut quo incidunt eius quis consequuntur, est assumenda possimus, rem velit nulla voluptate.
              </Typography>
            </Grid>

            <Grid container sx={{ height: 100, border: 'solid red' }} justifyContent={'flex-start'} alignItems={'flex-end'} alignContent={'flex-end'}>


              <Button label='เข้าคิว' />

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
            </Grid>
          </Grid>
        </Grid>






        <Typography variant="h6" mb={1}  >
          Course title
        </Typography>
        <Typography variant="h3" mb={2} color={'black'} >
          {state.title}
        </Typography>
        <Typography variant="h6" mb={1}  >
          Course subtitle
        </Typography>
        <Typography variant="body2" mb={2}  >
          {state.subtitle}
        </Typography>
        <Typography variant="h6" mb={1}  >
          What will students learn in your course?
        </Typography>
        <Typography variant="body2" mb={2}  >
          {state.what_will_student_learn_in_your_course.input_0}<br />
          {state.what_will_student_learn_in_your_course.input_1}
          <br />
          {state.what_will_student_learn_in_your_course.input_2}
          <br />
          {state.what_will_student_learn_in_your_course.input_3}
        </Typography>
        <Typography variant="h6" mb={1}  >
          What are the requirements prerequisites for taking your Course?
        </Typography>
        <Typography variant="body2" mb={2}  >
          {state.whataretherequirement}
        </Typography>
        <Typography variant="h6" mb={1}  >
          Who is this course for?
        </Typography>
        <Typography variant="body2" mb={2}  >
          {state.who_is_this_course}
        </Typography>
        <Typography variant="h6" mb={1}  >
          The course consists?
        </Typography>
        <Typography variant="body2" mb={2}  >
          {state.the_course_consists.input_0}
          <br />
          {state.the_course_consists.input_1}
          <br />
          {state.the_course_consists.input_2}
          <br />
          {state.the_course_consists.input_3}
          <br />
        </Typography>
        <Typography variant="body2" mb={2}  >
          Name teaching assistant
        </Typography>
        <Typography variant="body2" mb={2}  >
          {state.teaching_assistant}
        </Typography>
        <Typography variant="body2" mb={1} mr={8} >
          Min people
        </Typography>

        <Typography variant="body2" mb={1} mr={8} borderBottom={1} borderColor={'gray'}>
          {state.min_people}
        </Typography>

        <Typography variant="body2" mb={1} mr={8} >
          Pricing
        </Typography>

        <Typography variant="body2" mb={1} mr={8} borderBottom={1} borderColor={'gray'}>
          {state.pricing.toLocaleString()} THB
        </Typography>

      </Box>
    </>
  )
}

export default DetailCourseHomePage