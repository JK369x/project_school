import { Box, Container } from "@mui/system"
import { Navbar } from "../components/Navbar"

import { Avatar, Button, Card, CardActions, CardContent, Grid, ListItemIcon, TextField, Typography } from "@mui/material"
import location from '../assets/rmutt_direction2-1024x580-1.png'
import { Footer } from "../components/Footer"
const Contacts = () => {

    return (<>
        <Navbar />
        <Box sx={{ backgroundColor: '#1e1f1f', p: 4 }}>
            <Container sx={{ backgroundColor: '#fff', width: 1500 }}>

                <Grid container justifyContent={'center'} alignItems={'center'} sx={{ backgroundColor: '#fff', p: 3 }}>
                    <Grid container justifyContent={'center'} item >
                        <Typography variant="h3" mb={3} mt={3}>
                            ติดต่อภาควิชาวิศวกรรมคอมพิวเตอร์
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี
                        </Typography>

                    </Grid>
                    <Grid item xs={12}>

                        <Typography variant="h6">
                            39 หมู่ 1 ถนนรังสิต-นครนายกต.คลองหก อ.ธัญบุรีจ.ปทุมธานีประเทศไทย 12110<br />
                            เบอร์โทรศัพท์ภายในคณะฯ : 0-2549-3400<br />
                            Fax : 0-2577-5026
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            การเดินทาง
                        </Typography>
                        <Typography variant="h6" mb={10}>
                            สามารถใช้บริการรถประจำทางหลายสาย มาคณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยี ราชมงคลธัญบุรี เช่น รถยนต์โดยสารประจำทางร่วมบริการ (ขสมก.) สาย ปอ.538 (อนุสาวรีย์ชัยฯ – ราชมงคลธัญบุรี) และสาย 188 (ม.เกษตรศาสตร์ บางเขน – ราชมงคลธัญบุรี) รถยนต์โดยสารประจำทาง สาย 381 (ฟิวเจอร์พาร์ครังสิต – การเคหะคลองหก) สาย 1156 (ฟิวเจอร์พาร์ครังสิต – ราชมงคลธัญบุรี) รถตู้โดยสารประจำทาง ฟิวเจอร์พาร์ครังสิต – หมู่บ้านพรธิสาร คลองหก แล้วต่อด้วยรถจักรยานยนต์รับจ้าง หรือรถสองแถวเข้ามหาวิทยาลัยฯ ได้ หรือถ้าใช้บริการรถยนต์โดยสารประจำทางร่วมบริการของบริษัทขนส่งจำกัด (บขส.) สาย กรุงเทพฯ – รังสิต – องครักษ์ – นครนายก – ปราจีนบุรี) ลงป้ายจอดรถยนต์โดยสารประจำทาง หน้าโรงพยาบาลธัญบุรี แล้วจ้างรถจักรยายนต์รับจ้างเข้ามหาวิทยาลัยฯ ได้
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={'center'} item xs={12} mb={10}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247842.16840601218!2d100.4784270049531!3d13.92678664388788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78a4b9055555%3A0xb899f5bb67077759!2z4Lig4Liy4LiE4Lin4Li04LiK4Liy4Lin4Li04Lio4Lin4LiB4Lij4Lij4Lih4LiE4Lit4Lih4Lie4Li04Lin4LmA4LiV4Lit4Lij4LmMIOC4hOC4k-C4sOC4p-C4tOC4qOC4p-C4geC4o-C4o-C4oeC4qOC4suC4quC4leC4o-C5jCDguKHguJfguKMu4LiY4Lix4LiN4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1676709653570!5m2!1sth!2sth" width="600" height="450" loading="lazy"></iframe>
                    </Grid>
                    <Grid container justifyContent={'center'} item xs={12}>

                        <img src={location} alt="" />

                    </Grid>
                </Grid>
            </Container>
        </Box>
        <Footer />
    </>)
}

export default Contacts