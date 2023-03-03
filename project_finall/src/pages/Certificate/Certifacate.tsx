import { Box, Container } from "@mui/system"
import { Navbar } from "../../components/Navbar"
import { Button, Grid, Typography } from "@mui/material"
import image_certificate from '../../assets/cerfificate/certificate.png'
import { useGetScoreUserAll } from "./Hook/useGetScoreUserAll"
import { Table } from "../../framework/control"
import { TableColumnOptions } from "../../framework/control/Table/Table"
import { useNavigate } from "react-router-dom"
import { ScoreType } from './Hook/useGetScoreUserAll'
const Certificate = () => {
    const { certificateLists } = useGetScoreUserAll()
    console.log("🚀 ~ file: Certifacate.tsx:8 ~ Certificate ~ certificateLists:", certificateLists)
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
            width: '200',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },


    ]
    const navigate = useNavigate()
    const viewDetailUser = (data: ScoreType) => {
        console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
        navigate(`/detailuser/${data}`)

    }
    return (<>
        <Navbar />
        <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
            <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4, pt: 2 }}>
                <Grid sx={{ mt: 2 }} container justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
                    <img src={image_certificate} width={50} height={50} alt="" />
                    <Typography ml={2} gutterBottom color='#dc6002' variant="h1">
                        Certificate
                    </Typography>
                    <Table columnOptions={columnOptions} dataSource={certificateLists.map((e, index) => {
                        return {
                            ...e,
                            countID: index + 1,
                            imageTitle: <Grid >
                                <img src={e.image_course} width={90} height={60} />
                            </Grid>,
                            delitem: <>
                                <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                    viewDetailUser(e)
                                }}>View</Button>
                            </>
                        }
                    })} defaultRowsPerPage={10} />
                </Grid>
            </Container>
        </Box>
    </>)
}

export default Certificate