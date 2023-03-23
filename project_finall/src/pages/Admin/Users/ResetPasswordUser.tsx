import { FC } from "react"
import { Box, Container } from "@mui/system"
import { Button, Grid, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useGetDetailUser } from "./Hook/useGetDetailUser"
import bcrypt from "bcryptjs";
import { useEffect, useState } from "react"
import { useUpdatePassWord } from "./Hook/useUpdatePassword"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { ResetpasswordType } from "./ResetPassword"
import { Navbar } from "../../../components/Navbar"
import { ControllerTextField } from "../../../framework/control"
import { Footer } from "../../../components/Footer"
const ResetPasswordUser: FC = () => {
    const { id } = useParams<{ id: string }>()
    const { state } = useGetDetailUser()
    const [btnNext, setBtnNext] = useState(false)
    console.log("🚀 ~ file: ResetPassword.tsx:19 ~ ResetPassword ~ state", state)
    const schema = yup.object({
        password_new: yup.string().required(('กรุณากรอกรหัสผ่าน'))
            .min(4, ('ความยาวรหัสผ่านต้องมีความยาวมากกว่า 4 ตัวอักษร'))
            .max(20, ('ความยาวรหัสผ่านต้องมีความยาวน้อยกว่า 20 ตัวอักษร'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\*)(?=.*\S).*$/,
                'รหัสผ่านต้องประกอบด้วยตัวอักษรตัวเล็ก (a-z) และตัวใหญ่ (A-Z) อย่างน้อย 1 ตัว และสัญลักษณ์พิเศษ (*) อย่างน้อย 1 ตัว'
            )
        ,
        password_confirm: yup.string()
            .required('กรุณากรอกยืนยันรหัสผ่าน')
            .oneOf([yup.ref('password_new'), ''], 'รหัสผ่านไม่ตรงกัน')
        ,
        password_input: yup.string().required(('กรุณากรอกรหัสผ่าน'))
            .min(4, ('ความยาวรหัสผ่านต้องมีความยาวมากกว่า 4 ตัวอักษร'))
            .max(20, ('ความยาวรหัสผ่านต้องมีความยาวน้อยกว่า 20 ตัวอักษร'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\*)(?=.*\S).*$/,
                'รหัสผ่านต้องประกอบด้วยตัวอักษรตัวเล็ก (a-z) และตัวใหญ่ (A-Z) อย่างน้อย 1 ตัว และสัญลักษณ์พิเศษ (*) อย่างน้อย 1 ตัว'
            )
        ,

    })
    const myForm = useForm<ResetpasswordType>({
        //! can useDefault onChange
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            password_input: '',
            password_new: '',
            password_confirm: '',
        }
    })
    const { handleSubmit, getValues, setValue, setError, clearErrors, watch } = myForm
    const { updatePassword } = useUpdatePassWord()
    const onClickNext = async () => {
        const password = getValues().password_input
        const salt = state.salt
        const password_salt = state.password
        const hash = bcrypt.hashSync(password, salt);
        console.log("🚀B", password_salt)
        console.log("🚀A", hash)
        if (password_salt === hash) {
            console.log("Passwords match!");
            setBtnNext(!btnNext)
        } else {
            setError('password_input', { message: ('รหัสผ่านไม่ถูกต้อง') as string })

        }
    }
    const password = watch('password_new')
    const confirmPassword = watch('password_confirm')
    useEffect(() => {
        if (confirmPassword && password) {
            if (password !== confirmPassword)
                setError('password_confirm', { message: ('รหัสผ่านไม่ตรงกัน') as string })
            else clearErrors(['password_confirm'])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password])
    const onSubmit = async () => {
        const salt = bcrypt.genSaltSync()
        const password = bcrypt.hashSync(getValues().password_confirm, salt)
        setValue('salt', salt)
        setValue('password_salt', password)
        if (getValues()) {
            const newdata: any = { ...getValues(), password_input: undefined, password_new: undefined, password_confirm: undefined }
            const message = await updatePassword(newdata, id!)
            console.log("🚀 ~ file: ResetPassword.tsx:54 ~ onSubmit ~ message", message)
        }
    }
    return (<>
        <Navbar />
        <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
            <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', pb: 4 }}>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justifyContent={'center'} >
                        <Grid container justifyContent={'center'} >
                            <Typography variant="h2" mb={2}  >
                                Reset Password
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'center'} >
                            <Typography variant="h6" mb={2}  >
                                หากต้องการดำเนินการต่อ โปรดยืนยันก่อนว่าเป็นคุณ
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'center'} >
                            <ControllerTextField sx={{ mr: 1, width: 400 }} formprop={myForm} name={"password_input"} type="password" label={'Password'} />
                        </Grid>
                        <Grid container justifyContent={'center'} >
                            <Button onClick={() => onClickNext()} sx={{ mt: 2, mb: 1, ml: 36, width: 100 }} >Next</Button>
                        </Grid>
                        {btnNext === true ? <>
                            <Grid container justifyContent={'center'} >
                                <ControllerTextField sx={{ mr: 1, width: 400 }} type="password" formprop={myForm} name={"password_new"} label={'New password'} />
                            </Grid>
                            <Grid container justifyContent={'center'} >
                                <ControllerTextField sx={{ mr: 1, width: 400 }} type="password" formprop={myForm} name={"password_confirm"} label={'Confirm Password'} />
                            </Grid>
                            <Grid container justifyContent={'center'} >
                                <Button type="submit" sx={{ mt: 2, mb: 1, ml: 36, width: 100 }} >Submit</Button>
                            </Grid>
                        </> : <>


                        </>}
                    </Grid>
                </form>
            </Container>
        </Box>
        <Footer />
    </>)
}

export default ResetPasswordUser