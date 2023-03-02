import { FC } from "react"
import { Navbar } from "../components/Navbar"
import { Box, Container } from "@mui/system"
import { Button, Card, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
const LoginSuccess: FC = () => {
    const navigate = useNavigate()
    const loginClick = () => {
        navigate(`/login`)
    }
    return (<>
        {/* <Navbar /> */}
        <Box sx={{ backgroundColor: '#1e1f1f', height: '100%', minHeight: '100vh', p: 4 }}>
            <Container sx={{ backgroundColor: '#fff', borderRadius: 2, p: 3, }}>
                <Grid container justifyContent={'center'} alignItems={'center'}>
                    <TaskAltIcon fontSize="large" color="success" />
                    <Typography variant="h2" ml={2} >
                        ยืนยันตัวตนเสร็จเรียบร้อยแล้วกดปุ่ม login เพื่อเข้าสู่ระบบ
                    </Typography>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Button onClick={loginClick} sx={{ mt: 1, width: 100 }}>Login</Button>

                </Grid>
            </Container>
        </Box>
    </>)
}
export default LoginSuccess
