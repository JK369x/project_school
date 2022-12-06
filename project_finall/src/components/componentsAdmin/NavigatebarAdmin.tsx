import React from 'react'
import { Grid } from '@mui/material'

const NavigatebarAdmin = () => {
    return (
        <Grid>
            <Grid sx={{paddingLeft:5,paddingBottom:5}}>
                <Grid item>
                    Dashboard
                </Grid>
                <Grid item>
                   Users
                </Grid>
                <Grid item>
                   Lectures 
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NavigatebarAdmin
