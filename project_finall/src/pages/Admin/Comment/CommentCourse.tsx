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
import { Grid, Rating } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../../store/useHooksStore';
import { ControllerTextField } from '../../../framework/control';
import { TypeComment, usePostComment } from './Hook/usePostComment';
import moment from 'moment';
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

export default function CommentCourse(id_course: any) {
    const { addComment } = usePostComment()
    console.log("🚀 ~ file: CheckName.tsx:62 ~ CheckName ~ id_course", id_course)
    const { email, uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth)
    const [open, setOpen] = React.useState(false);
    const [valueComment, setValueComment] = React.useState<number | null>(0);
    const handleClickOpen = () => {
        setValue('name_user', displayName ? displayName : '')
        setValue('date_comment', moment(date_now))
        setOpen(true);
    };
    const handleClose = () => {

        setOpen(false);
    };
    let date_now = new Date()
    const myForm = useForm<TypeComment>()
    const { register, handleSubmit, getValues, setValue } = myForm

    const onSubmit = async () => {
        setValue('ratting', valueComment)
        if (getValues()) {
            try {
                addComment(getValues(), id_course)
            } catch (err) {
                console.log("🚀 ~ file: CheckName.tsx:85 ~ onSubmit ~ err", err)

            }
        }
    }


    return (
        <div>
            <Button onClick={handleClickOpen} sx={{ mr: 1, ml: 1 }}>
                Comment
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        ฟอร์มการคอมเม้นต์
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography variant='h3' sx={{ width: 500 }} gutterBottom>
                            สวัสดีคุณ {displayName}
                        </Typography>
                        <Typography sx={{ width: 500, mb: 2 }} >
                            {moment().format('DD/MM/YYYY H:mm')}
                        </Typography>
                        <Grid container>
                            <Typography component="legend">ให้คะแนน</Typography>
                            <Rating
                                sx={{ mb: 2 }}
                                name="simple-controlled"
                                value={valueComment}
                                onChange={(event, newValue) => {
                                    setValueComment(newValue);
                                }}
                            />
                            <ControllerTextField fullWidth multiline minRows={2} maxRows={4} formprop={myForm} name={"comment_user"} label={'ส่งความคิดเห็น'} />
                        </Grid>
                    </DialogContent>
                    <DialogActions>

                        <Button autoFocus type='submit'  >
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>

        </div>
    );
}



