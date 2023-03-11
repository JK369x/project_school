import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Container } from '@mui/system'
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Typography } from '@mui/material'
import { useGetFavorite } from './Admin/favorite/useGetFavorite'
import { CourseListsType, useGetCourseLists } from './Admin/Courses/Hook/useGetCourse'
import { useAppDispatch, useAppSelector } from '../store/useHooksStore'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import PDFFile from '../pages/test/Views'
import { useNavigate } from 'react-router-dom'
import { useGetDetailUser } from './Admin/Users/Hook/useGetDetailUser'
import { Footer } from '../components/Footer'
import { Table } from '../framework/control'
import { TableColumnOptions } from '../framework/control/Table/Table'
import { useDialog } from '../Hook/dialog/useDialog'
import { useGetAllReceiptByIdUser } from './Receipt/Hook/useGetAllReceiptByIdUser'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import moment from 'moment'
const ProFileUserFontEnd = () => {
    const { state } = useGetDetailUser()
    console.log("🚀 ~ file: ProFileUserFontEnd.tsx:18 ~ ProFileUserFontEnd ~ state", state)

    const { uid, status, displayName, photoURL, favorite, email } = useAppSelector(({ auth }) => auth)
    const { ReceiptUser, getReceiptUser } = useGetAllReceiptByIdUser()
    const tracsaction_true = ReceiptUser.filter((item: any) => item.transaction === true)
    console.log("🚀 ~ file: ProFileUserFontEnd.tsx:25 ~ ProFileUserFontEnd ~ tracsaction_true:", tracsaction_true)

    const navigate = useNavigate()
    const EditUser = () => {
        navigate(`/usereditprofile/${state.id_document}`)
    }
    const { openConfirmDialog } = useDialog()
    const columnOptions: TableColumnOptions[] = [

        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'ID',
            value: 'countID',
        },
        {
            width: '50',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'Course',
            value: 'imageTitle',
        },
        {

            alignValue: 'left',
            value: 'courseName',
        },

        {
            alignValue: 'left',
            alignHeader: 'left',
            label: 'Pricing',
            value: 'price',
        },
        {
            width: '200',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },


    ]

    const viewDetailUser = (data: any) => {
        console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
        navigate(`/viewpdf/${data.id_user}/${data.id_document}`)

    }


    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
                <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4 }}>
                    <Grid sx={{ mt: 2 }} container justifyContent={'center'}>
                        <Typography gutterBottom variant="h1" mt={6}>
                            Profile
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={'center'} >
                        <Grid container justifyContent={'center'} item xs={12}>
                            <Avatar alt="Remy Sharp" src={state.image_rul ? state.image_rul : photoURL ? photoURL : ''} sx={{ width: 300, height: 300, mb: 4, mt: 3 }} />
                        </Grid>
                        <Grid container justifyContent={'center'} item xs={12}>
                            <Grid container justifyContent={'center'} item xs={12} >
                                <Typography variant="h3" color='#555454'>
                                    {state.firstName}
                                </Typography>
                                <Typography variant="h3" ml={2} color='#555454'>
                                    {state.lastName}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Email: {state.email}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Job: {state.job}
                                </Typography>

                                <Typography variant="h4" ml={2} color='#555454'>
                                    Birthday: {moment(state.birthday).format('DD/MM/YYYY')}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Province: {state.province?.label ?? '-'}
                                    {/* //! ?? if province false = '-' */}
                                </Typography>
                                <Typography variant="h4" ml={1} color='#555454'>
                                    Tumbon: {state.tambon?.label}
                                    {/* //! tambon? มีค่าอยู่หรือป่าว */}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Aumphure: {state.amphure?.label}
                                </Typography>
                                <Typography variant="h4" ml={2} color='#555454'>
                                    ZipCode: {state.zipCode?.label}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Address: {state.address}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Agency: {state.agency}
                                </Typography>
                                <Typography variant="h4" ml={1} color='#555454'>
                                    Status: {state.status?.label}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    ID Card: {state.id_verify}
                                </Typography>

                            </Grid>
                            <Button sx={{ mt: 2, width: 150, height: 50 }} onClick={EditUser}>Edit</Button>
                        </Grid>
                    </Grid>
                </Container>
                <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4 }}>
                    <Grid sx={{ mt: 2 }} container justifyContent={'flex-start'}>
                        <Typography gutterBottom variant="h1" mt={6}>
                            Receipt
                        </Typography>
                    </Grid>
                    <Table columnOptions={columnOptions} dataSource={tracsaction_true.map((e: any, index: number) => {
                        return {
                            ...e,
                            countID: index + 1,
                            delitem: <>
                                <PDFDownloadLink document={<PDFFile pricing_course={e.pricing} title_course={e.courseName} date_transaction={e.date_transaction} detail_user={state} />} fileName={'testPDF'}>
                                    <Button sx={{ mr: 1 }} color='primary' onClick={() => {
                                    }}>Download</Button>
                                </PDFDownloadLink>
                            </>,
                            imageTitle: <Grid >
                                <img src={e.image_course} width={90} height={60} />
                            </Grid>,
                            price: e.pricing.toLocaleString(),
                        }
                    })} defaultRowsPerPage={10} />
                </Container>
                {/* <PDFViewer width='100%' height='1000px'>
                    <PDFFile />
                </PDFViewer> */}
            </Box>
            <Footer />
        </>
    )
}


export default ProFileUserFontEnd