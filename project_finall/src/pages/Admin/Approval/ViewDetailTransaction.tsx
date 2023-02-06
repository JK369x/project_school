import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import logo from '../../../assets/360_F_246677065_FY7a89FprqE1iKgPpEVSKDVOWMBTS2MX.jpg'

import { useAppSelector } from '../../../store/useHooksStore';
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

export default function ViewDetailTransaction(props: any) {
    const name = props.name
    const date = props.date
    const image = props.image
    const pricing = props.pricing
    const course_name = props.coursename
    const { email, uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };



    const handleClose = () => {

        setOpen(false);
    };






    return (
        <div>
            <Button onClick={handleClickOpen}>
                View
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    หลักฐานการโอนเงิน
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography variant='h3' sx={{ width: 800 }} gutterBottom>
                        ชื่อผู้โอน {name}
                    </Typography>
                    <Grid container justifyContent={'center'} sx={{ p: 'auto', mt: 2, mb: 2 }} spacing={3}>

                        <img src={image ? image : logo} alt="" width='350px' height='450px' />
                    </Grid>
                    <Grid sx={{ ml: 13 }} >
                        <Typography sx={{ mb: 1 }} >
                            Date : {new Date(date)?.toLocaleString() ? new Date(date).toLocaleString() : ''}
                        </Typography>
                        <Typography sx={{ mb: 1 }} >
                            Title : {course_name}
                        </Typography>
                        <Typography sx={{ mb: 1 }} >
                            Price {pricing?.toLocaleString() ? pricing.toLocaleString() : ''}
                        </Typography>
                    </Grid>


                </DialogContent>

            </BootstrapDialog>

        </div >
    );
}



