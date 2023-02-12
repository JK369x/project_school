import { Box } from "@mui/system"
import Sidebar from "../../../components/componentsAdmin/sidebar/Side-bar"
import { Button, Grid, Typography } from "@mui/material"
import Navbar from "../../../components/componentsAdmin/navbar/Navbar"
import { useParams } from "react-router-dom"
import { ControllerTextField } from "../../../framework/control"
import { useForm } from "react-hook-form"
import { useGetDetailUser } from "./Hook/useGetDetailUser"
import bcrypt from "bcryptjs";
import { useState } from "react"
import { useUpdatePassWord } from "./Hook/useUpdatePassword"

export interface ResetpasswordType {
    password_input: string
    password_firebase: string
    password_new: string
    password_confirm: string
    salt: string
    password_salt: string
}

const ResetPassword = () => {
    const { id } = useParams<{ id: string }>()
    const { state } = useGetDetailUser()
    const [btnNext, setBtnNext] = useState(false)
    console.log("🚀 ~ file: ResetPassword.tsx:19 ~ ResetPassword ~ state", state)
    const myForm = useForm<ResetpasswordType>({})
    const { handleSubmit, getValues, setValue } = myForm
    const { updatePassword } = useUpdatePassWord()
    const onClickNext = async () => {
        const password = getValues().password_input
        const password_salt = state.password
        const salt = state.salt
        const hash = bcrypt.hashSync(password, salt);
        console.log("🚀B", password_salt)
        console.log("🚀A", hash)
        if (password_salt === hash) {
            console.log("Passwords match!");
            setBtnNext(!btnNext)
        } else {
            console.log("Passwords do not match.");
        }
    }
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
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Box sx={{ width: '100%' }}>

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
                                            <ControllerTextField sx={{ mr: 1, width: 400 }} formprop={myForm} name={"password_new"} label={'New password'} />
                                        </Grid>
                                        <Grid container justifyContent={'center'} >
                                            <ControllerTextField sx={{ mr: 1, width: 400 }} formprop={myForm} name={"password_confirm"} label={'Confirm Password'} />
                                        </Grid>
                                        <Grid container justifyContent={'center'} >
                                            <Button type="submit" sx={{ mt: 2, mb: 1, ml: 36, width: 100 }} >Submit</Button>
                                        </Grid>
                                    </> : <>


                                    </>}
                                </Grid>

                            </form>
                        </Box>
                    </div>
                </div>
            </div>
        </div >
    </>)
}

export default ResetPassword