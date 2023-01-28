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
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/useHooksStore';
import { auth } from '../firebase/config_firebase'
import { setAuthStore } from '../store/slices/authSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { storage } from '../firebase/config_firebase'
import { doc, getDoc } from 'firebase/firestore';
import { AccountCollection } from '../firebase/createCollection';
import { Grid } from '@mui/material';
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





    const onClickLogOut = () => {
        signOut(auth).then(() => {
            dispatch(
                setAuthStore({
                    uid: null,
                    email: null,
                    displayName: null,
                    status: null,
                    favorite: null,
                    // photoURL: user.photoURL as any,
                }),
            )

        }).catch((error) => {
            console.log("🚀 ~ file: Navbar.tsx:21 ~ signOut ~ error", error)
            // An error happened.
        });

        navigate('/')
    }

    const ClickCateGory = () => {
        navigate('/category_course')
    }
    const ClickFavorite = () => {
        navigate('/favorite')
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
                        <Avatar /> Profile
                    </MenuItem>

                    <Divider />
                    <MenuItem>
                        <ListItemIcon onClick={ClickFavorite}>
                            <FavoriteIcon color='error' fontSize="small" />
                        </ListItemIcon>
                        <span onClick={ClickFavorite}>Favorite</span>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings color='info' fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
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
