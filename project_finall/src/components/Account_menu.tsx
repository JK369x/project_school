import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/useHooksStore';
import { setAuthStore } from '../store/slices/authSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ReceiptIcon from '@mui/icons-material/Receipt';
import { Grid } from '@mui/material';
import axios from 'axios';
import { setCourseStore } from '../store/slices/courseSlice';
export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { email, status, displayName, uid, photoURL, favorite } = useAppSelector(({ auth }) => auth)
    console.log("🚀 ~ file: Account_menu.tsx:37 ~ AccountMenu ~ displayName", displayName)

    const onClickLogOut = async () => {
        await axios.get(`${import.meta.env.VITE_REACT_APP_API}auth/signout`)
        dispatch(
            setAuthStore({
                uid: null,
                email: null,
                displayName: null,
                status: null,
                favorite: null,
                photoURL: null,
                about: null
            }),
        )
        dispatch(setCourseStore({
            uid_course: null,
        }),
        )
        navigate('/')
    }

    const ClickCateGory = () => {
        navigate('/category_course')
    }
    const ClickProfile = () => {
        navigate(`/profiledetailuser_user/${uid}`)
    }
    const ClickFavorite = () => {
        navigate('/favorite')
    }
    const ClickRecipt = () => {
        navigate(`/requestreceipt/${uid}`)
    }

    return (
        <>


            <Grid container alignItems={'center'} sx={{ mr: 3 }}>

                <Typography sx={{ minWidth: 100 }}>{displayName}</Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src={photoURL ? photoURL : '#'} sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <ListItemIcon onClick={ClickProfile}>
                            <Avatar />
                        </ListItemIcon>
                        <span onClick={ClickProfile}>Profile</span>
                    </MenuItem>

                    <Divider />
                    <MenuItem>
                        <ListItemIcon onClick={ClickFavorite}>
                            <FavoriteIcon color='error' fontSize="small" />
                        </ListItemIcon>
                        <span onClick={ClickFavorite}>Course</span>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon onClick={ClickRecipt}>
                            <ReceiptIcon color='info' fontSize="small" />
                        </ListItemIcon>
                        <span onClick={ClickRecipt}>Receipt</span>
                    </MenuItem>
                    {/* <MenuItem>
                        <ListItemIcon onClick={ClickRecipt}>
                            <ReceiptIcon color='info' fontSize="small" />
                        </ListItemIcon>
                        <span onClick={ClickRecipt}>Receipt</span>
                    </MenuItem> */}
                    <MenuItem onClick={onClickLogOut}>
                        <ListItemIcon>
                            <Logout color='disabled' fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Grid>



        </>
    );
}
