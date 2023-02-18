import React from 'react'
import '../styles/footer.css'
import { Box, Grid, Link, Typography } from '@mui/material'
import mobileapp from '../assets/android_download.png'
export const Footer = () => {
  return (
    <>
      <Box sx={{ backgroundColor: '#040404', p: 3, bottom: 0, width: "100%" }}>
        <Grid container justifyContent={'center'} alignItems={'start'} sx={{ color: '#fff' }}>
          <Grid item xs={3} >
            <Typography variant="h5" mb={3}>
              ดาวโหลดแอปพลิเคชั่น
            </Typography>
            <img src={mobileapp} alt="" />
            <Typography variant="h5" mt={3}>
              ติดต่อเรา
            </Typography>
            <Typography variant="body1" >
              email:
              <Link href="mailto:rmuttlearn0612@gmail.com"> rmuttlearn0612@gmail.com</Link>
            </Typography>
          </Grid>
          <Grid item xs={2} >
            <Typography variant="h5" mb={3}>
              มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี
            </Typography>
            <Typography variant="body1" mb={3}>
              Rajamangala University of Technology Thanyaburi
              ที่อยู่ : 39 หมู่ที่ 1 ตำบลคลองหก อำเภอคลองหลวง จังหวัดปทุมธานี 12110
            </Typography>
            <Typography variant="body1" mt={3} >
              Copyright © 2023 Rajamangala University of Technology Thanyaburi
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </>
  )
}
