import { FC, useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Font, Image } from '@react-pdf/renderer'
import logo from '../../assets/logo-rmutt/Logo-RMUTT-A4-stork-5-01.png'
import THsarabun from '../Admin/ExportReceipt/THSarabun.ttf'
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useGetAllReceiptByIdUser } from '../Receipt/Hook/useGetAllReceiptByIdUser';
import { useGetDetailTransaction } from '../Receipt/Hook/useGetDetailTransaction';
import { useAppSelector } from '../../store/useHooksStore';

// Register font
Font.register({ family: 'thsarabun', src: THsarabun });

// Create styles

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#f6f5f5',
        padding: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        border: '1pt solid black',
        width: '100%',
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,


    },
    tableColHeader: {
        width: '70%',
        borderRightColor: '#000',
        borderRightWidth: 1,
        paddingLeft: 5,
    },
    tableCol: {
        width: '30%',
        borderRightColor: '#000',
        borderRightWidth: 1,
        paddingLeft: 5,
    },
    tableBody: {
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 450,
        fontFamily: 'thsarabun',
        fontSize: '14',

    },
    image: {
        width: '150px',
        height: '60px'
    },
    headerUser: {

        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    textstyle: {
        fontFamily: 'thsarabun',

    }
});

// Create Document Component
const PDFFile = (props: any) => {
    const detail = props.detail_user
    const [data, setData] = useState(detail)
    const title = props.title_course
    const prince = props.pricing_course
    const newprince = prince.toLocaleString()
    const date_course = props.date_transaction
    const newdata = moment(date_course).format('DD MM YYYY');
    useEffect(() => {
        setData(detail)
    }, [detail])

    const formattedDate = moment().format('DD MM YYYY');
    return (
        <Document creator='RMUTT'>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.headerUser}>
                        <View>
                            <Image
                                style={styles.image}
                                src={logo}
                            />

                        </View>
                        <View style={[styles.textstyle, { fontSize: '14', alignItems: 'flex-end' }]}>
                            <Text style={{ fontWeight: 'bold' }}>ภาควิศวกรรมคอมพิวเตอร์ </Text>
                            <Text>39 หมู่ 1 ถนนรังสิต-นครนายกต.คลองหก อ.ธัญบุรีจ.ปทุมธานีประเทศไทย 12110 </Text>
                            <Text>อ.ธัญบุรีจ.ปทุมธานีประเทศไทย 12110 เบอร์โทรศัพท์ภายในคณะฯ : 0-2549-3400</Text>
                        </View>
                    </View>
                    <View style={[styles.headerUser, { marginTop: '10' }]}>
                        <View style={[styles.textstyle, { fontSize: '14' }]}>
                            <Text >ชื่อ: {`${data?.firstName} ${data?.lastName}`}</Text>
                            <Text >ที่อยู่: {data?.address}</Text>
                            <Text >จังหวัด: {data?.province.label} อำเภอ: {data?.amphure.label} </Text>
                            <Text >ตำบล: {data?.tambon.label} Zipcode: {data?.zipCode.label}</Text>
                            <Text >หน่วยงาน: {data?.agency}</Text>
                            <Text >เลขประจำตัวผู้เสียภาษี: 1160100569302</Text>
                            <Text >อีเมล: {data?.email} </Text>
                        </View>
                        <View style={[styles.textstyle, { fontSize: '14', fontWeight: 'bold' }]}>
                            <Text >วันที่โอนเงิน : {newdata} </Text>
                            <Text >วันที่ออกใบเสร็จ : {formattedDate}</Text>


                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={[styles.tableColHeader, { backgroundColor: '#C6C6C6' }]}>
                                <Text>Course Title</Text>
                            </View>
                            <View style={[styles.tableCol, { backgroundColor: '#C6C6C6' }]}>
                                <Text>Count</Text>
                            </View>
                            <View style={[styles.tableCol, { backgroundColor: '#C6C6C6' }]}>
                                <Text>Price</Text>
                            </View>
                        </View>
                        <View style={styles.tableBody}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableBody}>{title}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableBody}> 1</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableBody}>{newprince} บาท</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.headerUser, { marginTop: '20' }]}>
                        <View style={[styles.textstyle, { fontSize: '14', }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: '16', marginBottom: '50' }}>หมายเหตุ </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', }}>ผู้รับเงิน : </Text>
                                <Text>ภาควิชาวิศวกรรมคอมพิวเตอร์</Text>

                            </View>
                        </View >
                        <View style={[styles.textstyle, { fontSize: '14', alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
                            <Text style={{ fontWeight: 'bold' }}>ส่วนลด :        0.00      บาท</Text>
                            <Text style={{ fontWeight: 'bold' }}>จำนวนเงินทั้งสิ้น :        {newprince}     บาท</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
export default PDFFile

