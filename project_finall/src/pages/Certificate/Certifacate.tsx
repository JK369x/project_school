import { Box, Container } from "@mui/system"
import { Navbar } from "../../components/Navbar"
import { Button, Grid, Typography } from "@mui/material"
import image_certificate from '../../assets/cerfificate/certificate.png'
import { useGetScoreUserAll } from "./Hook/useGetScoreUserAll"
import { Table } from "../../framework/control"
import { TableColumnOptions } from "../../framework/control/Table/Table"
import { useNavigate } from "react-router-dom"
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer"
import CreatePDF from "./CreatePDF"
import { useGetDetailUser } from "../Admin/Users/Hook/useGetDetailUser"
import { saveAs } from 'file-saver';

import axios from "axios"
import { Document, Page } from '@react-pdf/renderer';

import { useState } from "react"
import { useCreateTokenCertificate } from "./Hook/useCreateTokenCertificate"
import { useDispatch } from "react-redux"
import { openAlertError } from "../../store/slices/alertSlice"
import moment from "moment"


const Certificate = () => {
    const { certificateLists } = useGetScoreUserAll()
    console.log("🚀 ~ file: Certifacate.tsx:22 ~ Certificate ~ certificateLists:", certificateLists)
    const data = certificateLists.filter((item, index) => {
        const x = item.score_user ?? 0
        const y = item.score_quiz ?? 0
        let result = (x / y) * 100
        if (result >= 80) {
            console.log('ผ่านได้รับใบ cer')
            if (moment().isAfter(item.end_learn)) {
                console.log('หลักสูตรจบ')
                return { ...item }
            }
        } else {
            console.log('คะแนนไม่ถึง')
        }
    })
    // const { state } = useGetDetailUser()
    // const [selectedCertificate, setSelectedCertificate] = useState(null);
    const { getTokenCertificate } = useCreateTokenCertificate()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleDownload = async (certificate: any) => {
        const data = certificate
        delete data.image_course
        const token_certificate = await getTokenCertificate(data)
        console.log("🚀 ~ file: Certifacate.tsx:34 ~ handleDownload ~ token_certificate:", token_certificate)
        if (token_certificate) {
            const query = encodeURIComponent(JSON.stringify(certificate));
            const url = `/createcertificate/?certificate=${query}&token_certificate=${token_certificate}`;
            navigate(url);

        } else {
            dispatch(openAlertError('เกิดความขัดข้องในการออกใบประกาศ'))
        }
    };


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
            label: 'Title',
            value: 'imageTitle',
        },
        {
            alignValue: 'left',
            value: 'title',
        },
        {
            label: 'Create By',
            value: 'create_by',
        },

        {
            width: '250',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },


    ]

    return (<>
        <Navbar />
        <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
            <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4, pt: 2 }}>
                <Grid sx={{ mt: 2 }} container justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
                    <img src={image_certificate} width={50} height={50} alt="" />
                    <Typography ml={2} gutterBottom color='#dc6002' variant="h1">
                        Certificate
                    </Typography>
                    <Table columnOptions={columnOptions} dataSource={data.map((e, index) => {

                        return {
                            ...e,
                            countID: index + 1,
                            imageTitle: <Grid >
                                <img src={e.image_course} width={90} height={60} />
                            </Grid>,
                            delitem: <>
                                <Grid container justifyContent={'center'}  >

                                    <Grid item xs={6} >

                                        <Button sx={{ mr: 1 }} color='primary' onClick={() => {
                                            handleDownload(e); // call handleDownload function when button is clicked
                                        }}>Generate</Button>
                                    </Grid>
                                </Grid>
                            </>
                        }
                    })} defaultRowsPerPage={10} />
                </Grid>
            </Container>

        </Box >
    </>)
}

export default Certificate