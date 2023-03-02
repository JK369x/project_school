import { Box, Container } from "@mui/system"
import { Navbar } from "../../components/Navbar"
import { Grid, Typography } from "@mui/material"
import image_certificate from '../../assets/cerfificate/certificate.png'
const Certificate = () => {
    return (<>
        <Navbar />
        <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
            <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4, pt: 2 }}>
                <Grid sx={{ mt: 2 }} container justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
                    <img src={image_certificate} width={50} height={50} alt="" />
                    <Typography ml={2} gutterBottom color='#dc6002' variant="h1">
                        Certificate
                    </Typography>
                </Grid>
            </Container>
        </Box>
    </>)
}

export default Certificate