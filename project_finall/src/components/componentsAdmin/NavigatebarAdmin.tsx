import React from 'react'
import { Grid } from '@mui/material'
import { max } from 'moment'
import { maxHeight } from '@mui/system'
import Sidebar from '../componentsAdmin/sidebar/Side-bar'
const NavigatebarAdmin = () => {
    return (
        // <Grid >
        //     <Grid sx={{paddingLeft:5,paddingBottom:5,border:'solid red',width:200,}}>
        //         <Grid item>
        //             Dashboard
        //         </Grid>
        //         <Grid item>
        //            Users
        //         </Grid>
        //         <Grid item>
        //            Lectures 
        //         </Grid>
        //     </Grid>
        // </Grid>
        <>
            <Sidebar/>
        </>
    )
}

export default NavigatebarAdmin
