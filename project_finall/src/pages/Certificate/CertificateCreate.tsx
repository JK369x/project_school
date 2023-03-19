import { FC, useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Font, Image } from '@react-pdf/renderer'
import logo from '../../assets/logo-rmutt/Logo-RMUTT-A4-stork-5-01.png'
import moment from 'moment';
import fontthai from './aileron.heavy.otf'
import THsarabun from '../Admin/ExportReceipt/THSarabun.ttf'
import certificate_full from '../../assets/cerfificate/certificateNow.png'
import { useGetScoreUserAll } from './Hook/useGetScoreUserAll';
import { Navbar } from '../../components/Navbar';
import { Box, Container } from '@mui/system';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Link, Typography } from '@mui/material';
import { useAppSelector } from '../../store/useHooksStore';
import CircularProgress from '@mui/material/CircularProgress';

// Register font
Font.register({ family: 'certificatefont', src: fontthai });
Font.register({ family: 'thaifont', src: THsarabun });
// Create styles

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    body: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name_user: {
        position: 'absolute',
        top: '48%',
        fontSize: '50',
        fontFamily: 'thaifont',
        transform: 'translate(-0%, -50%)',
    },
    title_course: {
        position: 'absolute',
        top: '75%',
        transform: 'translate(-0%, -50%)',
        fontSize: '30',
        fontFamily: 'thaifont',
    },
    create_by: {
        position: 'absolute',
        top: '89%',
        fontSize: '30',
        transform: 'translate(-0%, -50%)',
        fontFamily: 'thaifont',
    },
    date: {
        position: 'absolute',
        top: '70%',
        fontSize: '30',
        transform: 'translate(-0%, -50%)',
        fontFamily: 'thaifont',
    }
});
export function MyPdf({ certificate, name }: any) {
    console.log("🚀 ~ file: CertificateCreate.tsx:60 ~ MyPdf ~ name:", name)
    console.log("🚀 ~ file: CertificateCreate.tsx:59 ~ MyPdf ~ certificate:", certificate)

    const newdata = moment(certificate.end_learn).format('DD MMMM YYYY');
    return (
        <Document>
            <Page size="A4" orientation="landscape">
                <View style={styles.body}>
                    <Image style={styles.image} src={certificate_full} />
                    <Text>{certificate.name}</Text>
                    <Text style={styles.name_user}> {name}</Text>
                    <Text style={styles.date}>{newdata}</Text>
                    <Text style={styles.title_course}>{certificate.title}</Text>
                    <Text style={styles.create_by}>{certificate.create_by}</Text>
                </View>
            </Page>
        </Document>
    );
}
// Create Document Component
const CertificateCreate = () => {
    const { certificateLists } = useGetScoreUserAll()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const certificate = JSON.parse(decodeURIComponent(searchParams.get('certificate') ?? ''));
    console.table(certificate)
    const { displayName } = useAppSelector(({ auth }) => auth)
    const navigate = useNavigate()
    const ClickIssueBy = () => {
        navigate(`/detailtecher/${certificate.id_create}`)
    }
    const [loading, setLoading] = useState<any>(false);

    const handleClick = () => {
        setLoading(true);
        // perform verification logic here
        setTimeout(() => {
            setLoading(false);
        }, 2000); // simulate 2-second delay
    };
    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
                <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4, pt: 4 }}>
                    <Grid container justifyContent={'center'}  >
                        <Grid item xs={7}>
                            <PDFViewer width="600" height='425' showToolbar={false}>
                                <MyPdf certificate={certificate} name={displayName} />
                            </PDFViewer>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container justifyContent={'flex-start'} >
                                <Typography variant='h1' color={'#E74C0B'}>
                                    Congratulations
                                </Typography>
                            </Grid>
                            <Button sx={{ mr: 1, minWidth: 100, mt: 1 }} color='success' variant='outlined' onClick={handleClick} disabled={loading} endIcon={loading && <CircularProgress size={20} />}>
                                {loading ? 'Verifying...' : 'Verify'}
                            </Button>

                            <Grid container justifyContent={'flex-start'} alignContent={'center'} alignItems={'center'} mt={1}>
                                <Typography variant='h6' mr={2}>
                                    Issue by
                                </Typography>
                                <Link sx={{ mt: 0.5 }} onClick={() => ClickIssueBy()}>{certificate.create_by}</Link>
                            </Grid>
                            <Grid container justifyContent={'flex-start'} mt={2}>
                                <Typography variant='h6' mr={1}>
                                    Category:
                                </Typography>
                                <Typography variant='h6'>
                                    {certificate.course_category.label}
                                </Typography>
                            </Grid>
                            <Typography variant='h6' mt={2}>
                                เอกสารนี้เป็นการยืนยันว่าคุณ  {displayName} ได้เรียนคอร์สนี้จนสำเร็จแล้ว และประสบความสำเร็จในการเรียนรู้และทดสอบที่มีในคอร์ส {certificate.title}
                            </Typography>
                            <Grid container justifyContent={'center'} mt={8} >
                                <PDFDownloadLink document={<MyPdf certificate={certificate} name={displayName} />}>
                                    <Button sx={{ mr: 1 }} color='primary' onClick={() => {
                                    }}>Download</Button>
                                </PDFDownloadLink>
                            </Grid>
                        </Grid>
                    </Grid>

                </Container>
            </Box >
            );
        </>)
};
// export default CreatePDF
export default CertificateCreate

