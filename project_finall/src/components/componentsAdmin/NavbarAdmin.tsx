import React from 'react'
import { Grid } from '@mui/material'
import AccountMenu from './AccountMenu'
const NavbarAdmin = () => {
    return (
        <Grid>
            <Grid container justifyContent={'right'} spacing={'10'} sx={{p:2,border: 'solid red' }}>
                <Grid item>
                    <AccountMenu/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NavbarAdmin