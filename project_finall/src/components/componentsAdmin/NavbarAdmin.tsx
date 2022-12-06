import React from 'react'
import { Grid } from '@mui/material'
const NavbarAdmin = () => {
    return (
        <Grid>
            <Grid container justifyContent={'right'} spacing={'10'} sx={{p:2}}>
                <Grid item>
                    LOGO
                </Grid>
                <Grid item>
                    setting
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NavbarAdmin