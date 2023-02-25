import { FC } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Box, Container } from "@mui/system"
import { Grid, Typography } from "@mui/material"

const ReceiptUser: FC = () => {
    return (<>
        <Navbar />

        <Box sx={{ backgroundColor: '#1e1f1f', p: 4, minHeight: '100vh' }}>
            <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4 }}>
                <Grid sx={{ mt: 2 }} container justifyContent={'center'}>
                    <Typography gutterBottom variant="h1" mt={6}>
                        Receipt
                    </Typography>
                </Grid>
            </Container>
        </Box>
        <Footer />
    </>)
}

export default ReceiptUser