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
import { setButtonStatus } from './statueButton';
import { useState } from 'react';
import { useAppSelector } from '../../../store/useHooksStore';
import { useCheckNamedb } from './useCheckNamedb';
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice';
import { useDispatch } from 'react-redux';
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
interface CheckNameType {
    check_day: any
    radio: string
    email: string
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

export default function CheckName(id_course: any) {
    console.log("🚀 ~ file: CheckName.tsx:62 ~ CheckName ~ id_course", id_course)
    const { clickCheckName } = useCheckNamedb()
    const { email, uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth)
    const [open, setOpen] = React.useState(false);
    const [radioValue, setRadioValue] = useState("");
    const handleClickOpen = () => {
        setValue('check_day', moment())
        setOpen(true);
    };
    const handleClose = () => {

        setOpen(false);
    };

    const myForm = useForm<CheckNameType>()
    const { register, handleSubmit, getValues, setValue } = myForm
    const dispatch = useDispatch()
    const onSubmit = async (data: CheckNameType) => {
        if (data) {
            const log_data = await clickCheckName(id_course.id)
            if (log_data === true) {
                dispatch(openAlertSuccess(`เช็กชื่อเรียบร้อยแล้ว`))
            } else {
                dispatch(openAlertError(`${log_data}`))
            }

        }
    }

    const checkRadio = (event: any) => {

        if (radioValue !== "check") {
            event.preventDefault();
            console.log('test1')
            alert("Please select the radio button before submitting.");
        }
        setOpen(false);
    }
    return (
        <div>
            <Button onClick={handleClickOpen} sx={{ mr: 1, ml: 1 }}>
                เช็กชื่อ
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        ฟอร์มการเช็กชื่อ
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography variant='h3' sx={{ width: 500 }} gutterBottom>
                            สวัสดีคุณ {displayName}
                        </Typography>
                        <Grid container >
                            <input {...register("radio")} type="radio" value="check" onClick={() => setRadioValue("check")} />
                            <Typography sx={{ width: 500, alignItems: 'center' }} >
                                {moment().format('DD/MM/YYYY H:mm')}
                            </Typography>
                        </Grid>
                    </DialogContent>
                    <DialogActions>

                        <Button autoFocus type='submit' onClick={checkRadio} >
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>

        </div>
    );
}



