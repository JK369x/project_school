import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/useHooksStore';
import { UploadButton } from '../framework/control';
import { useUploadFile } from '../file/useUploadFile';
import imagereceipt from '../assets/receipt.jpg'
import { UpdateTransaction } from './Admin/Approval/Hook/useUploadTransaction';
import { openAlertError, openAlertSuccess } from '../store/slices/alertSlice';
import { ReceiptType } from './Receipt/Hook/useGetAllReceiptByIdUser';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function UploadReceipt(props: any) {
    const dispatch = useAppDispatch()
    const { email, uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth)
    const [open, setOpen] = React.useState(false);
    const [radioValue, setRadioValue] = useState("");
    const handleClickOpen = () => {
        setValue('date', date_now)
        // setValue('name_course', props.title_props)
        // setValue('name_user', displayName ? displayName : 'ไม่พบชื่อ')
        // setValue('price', props.price_props)
        // setValue('id_user', uid ? uid : '')
        // setValue('id_course', props.id_course)
        setOpen(true);
    };
    const { uploadFile, uploadState } = useUploadFile()

    const onUploadImage = (files: FileList | null) => {
        if (files) {
            uploadFile(files[0], `myImages/receipt/${uid}/`)
        }
        const get_url = uploadState.downloadURL
        console.log("🚀 ~ file: DetailCourseHomePage.tsx:147 ~ onUploadImage ~ get_url", get_url)
    }

    const handleClose = () => {

        setOpen(false);
    };

    let date_now = new Date()
    const id_course = props.id_course
    const id_user = uid ? uid : ''
    const myForm = useForm<ReceiptType>()
    const { register, handleSubmit, getValues, setValue } = myForm

    const onSubmit = async () => {
        setValue('image_url', uploadState.downloadURL ? uploadState.downloadURL : 'ไม่พบรูปภาพ')
        if (getValues()) {
            try {
                await UpdateTransaction(id_course, id_user, getValues())
                dispatch(openAlertSuccess('ส่งใบเสร็จสำเร็จ'))
                setOpen(false);
            } catch (err) {
                dispatch(openAlertError('เกิดข้อผิดพลาดการส่งใบเสร็จ !!'))
                console.log("🚀 ~ file: CheckName.tsx:85 ~ onSubmit ~ err", err)
                return false
            }
        }
    }


    return (
        <div>
            <Button onClick={handleClickOpen}>
                Upload
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        ฟอร์มแนบหลักฐานการโอนเงิน
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography variant='h3' sx={{ width: 800 }} gutterBottom>
                            สวัสดีคุณ {displayName}
                        </Typography>
                        <Grid container justifyContent={'space-between'} sx={{ p: 'auto', m: 'auto' }} spacing={3}>
                            <Grid item xs={4} >
                                <img src={uploadState.downloadURL ? uploadState.downloadURL : imagereceipt} width='150' height='210' alt="" />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography sx={{ mb: 1 }} >
                                    Date : {moment().format('DD/MM/YYYY H:mm')}
                                </Typography>
                                <Typography sx={{ mb: 1 }} >
                                    Title : {props.title_props}
                                </Typography>
                                <Typography sx={{ mb: 1 }} >
                                    Price {props.price_props}
                                </Typography>
                                <Typography sx={{ mb: 1 }} >
                                    Start Course {moment(props.start_props).format('DD/MM/YYYY')}
                                </Typography>
                                <Typography sx={{ mb: 1 }} >
                                    End Corse {moment(props.end_props).format('DD/MM/YYYY')}
                                </Typography>

                                <UploadButton label={'แนบสลีป'} onUploadChange={onUploadImage} />
                            </Grid>
                        </Grid>


                    </DialogContent>
                    <DialogActions>

                        <Button autoFocus type='submit' color='success'  >
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>

        </div >
    );
}



