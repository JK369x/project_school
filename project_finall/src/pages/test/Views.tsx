import { FC, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Font } from '@react-pdf/renderer'
import THsarabun from '../Admin/ExportReceipt/THSarabun.ttf'
// Register font
Font.register({ family: 'thsarabun', src: THsarabun });

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'thsarabun'
    },
    table: {
        borderColor: '#000',
        borderWidth: 1,
        marginHorizontal: 20,
        flexFlow: 1,
    },
    tableRow: {
        flexDirection: 'row',
    },
    headerBg: {
        backgroundColor: '#aaa',
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1,
    },
    tableCellHeader: {
        margin: 2,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

// Create Document Component
const PDFFile = () => {
    return (
        <Document>
            <Page size='A4' style={styles.body}>
                <Text style={styles.title}>
                    คนไทยแน่นอน
                </Text>
            </Page>
        </Document>
    )
}

const HomeView: FC = () => {
    useEffect(() => {
        // ReactPDF.renderToStream(<MyDocument />)
    }, [])
    return (
        <>
            home{' '}
            <div>
                <PDFDownloadLink document={<PDFFile />} fileName={'testPDF'}>
                    loadPDF
                </PDFDownloadLink>
            </div>
        </>
    )
}

export default HomeView