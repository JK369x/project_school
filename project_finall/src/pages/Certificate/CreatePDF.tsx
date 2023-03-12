import { FC, useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Font, Image } from '@react-pdf/renderer'
import logo from '../../assets/logo-rmutt/Logo-RMUTT-A4-stork-5-01.png'
import moment from 'moment';
import fontthai from './aileron.heavy.otf'
import THsarabun from '../Admin/ExportReceipt/THSarabun.ttf'
import certificate from '../../assets/cerfificate/certificateNow.png'
import { relative } from 'path';
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

// Create Document Component
const CreatePDF = (props: any) => {
    const date_course = props.course_end
    const title_course = props.title
    const detailuser = props.detail
    const teacher = props.createby
    const [data, setData] = useState(detailuser)
    useEffect(() => {
        setData(detailuser)
    }, [detailuser])
    const newdata = moment(date_course).format('DD MMMM YYYY');
    return (
        <Document creator='RMUTT'>
            <Page size="A4" orientation="landscape" >
                <View style={styles.body}>
                    <Image src={certificate} style={styles.image} />
                    <Text style={styles.name_user}> {`${data?.firstName} ${data?.lastName}`}</Text>
                    <Text style={styles.date}>{title_course}</Text>
                    <Text style={styles.title_course}>{newdata}</Text>
                    <Text style={styles.create_by}>{teacher}</Text>
                </View>
            </Page>
        </Document>
    );
};
// export default CreatePDF
export default CreatePDF

