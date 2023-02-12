import fontThai from './THSarabun.ttf'
import { Button } from '@mui/material';

import { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button';

const Pdftest = ({ props }: any) => {
    const clickPDF = () => {
        // const doc = new jsPDF();

        // doc.text("Hello world!", 10, 10);
        // doc.save("a4.pdf");
    }
    return (
        <div>
            <GoogleButton
                onClick={() => { console.log('Google button clicked') }}
            />
            <Button onClick={clickPDF}>
                PDF Download
            </Button>
        </div>)
}

export default Pdftest