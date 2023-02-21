import { Box, Grid, Typography } from "@mui/material"
import Navbar from "../../components/componentsAdmin/navbar/Navbar"
import Sidebar from "../../components/componentsAdmin/sidebar/Side-bar"
import { useForm } from "react-hook-form"
import { ControllerTextField } from "../../framework/control"
import { useMemo } from "react"

interface CalculateType {
    Lecturer: number
    Assistant_Lecturer: number
    University_Per: number
    University_total_course: number
    Meals: number
    Snacks_Breaks: number
    lecturer_per_day: number
    lecturer_How_day: number
    lecturer_output: number
    lecturer_per_hours: number
    lecturer_How_hours: number
    Assistant_per_day: number
    Assistant_How_day: number
    Assistant_per_hours: number
    Assistant_How_hours: number
}

const Calculate = () => {
    const myForm = useForm<CalculateType>({
        mode: 'onSubmit',
        defaultValues: {
            // Lecturer: 0,
            // Assistant_Lecturer: 0,
            // University_Per: 0,
            // University_total_course: 0,
            // Meals: 0,
            // Snacks_Breaks: 0,
            // lecturer_per_day: 0,
            // lecturer_How_day: 0,
            // lecturer_output: 0
        }
    })

    const { getValues, setValue, watch } = myForm
    const watch_Lec_Per_Day = watch('lecturer_per_day')
    const watch_How_Day = watch('lecturer_How_day')
    const perDay = useMemo(() => {
        let number_count = Number(watch_Lec_Per_Day) * Number(watch_How_Day)
        return number_count
    }, [watch_Lec_Per_Day, watch_How_Day])
    const watch_Lec_Per_hours = watch('lecturer_per_hours')
    const watch_How_hours = watch('lecturer_How_hours')
    const perHours = useMemo(() => {
        let number_count = Number(watch_Lec_Per_hours) * Number(watch_How_hours)
        return number_count
    }, [watch_Lec_Per_hours, watch_How_hours])



    const AssistantDay = watch('Assistant_per_day')
    const AssistantHowDay = watch('Assistant_How_day')
    const AssistantPerDay = useMemo(() => {
        let number_count = Number(AssistantDay) * Number(AssistantHowDay)
        return number_count
    }, [AssistantDay, AssistantHowDay])
    const AssistantHours = watch('Assistant_per_hours')
    const AssistantHowHours = watch('Assistant_How_hours')
    const AssistantPerHours = useMemo(() => {
        let number_count = Number(AssistantHours) * Number(AssistantHowHours)
        return number_count
    }, [AssistantHours, AssistantHowHours])
    return (<>
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Typography variant="h1">
                            Calculate
                        </Typography>

                        <Typography variant="h6">
                            Cost Course
                        </Typography>
                        <Box>
                            <Typography variant="h6">
                                Lecturer
                            </Typography>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"lecturer_per_day"} label={'Price per day'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"lecturer_How_day"} label={'How many days'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">
                                        out put : {perDay ? perDay : ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"lecturer_per_hours"} label={'Price per Hours'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"lecturer_How_hours"} label={'How many Hours'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">
                                        out put : {perHours ? perHours : ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                Assistant Lecturer
                            </Typography>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"Assistant_per_day"} label={'Price per day'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"Assistant_How_day"} label={'How many days'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">
                                        out put : {AssistantPerDay ? AssistantPerDay : ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"Assistant_per_hours"} label={'Price per Hours'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ControllerTextField formprop={myForm} name={"Assistant_How_hours"} label={'How many Hours'} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">
                                        out put : {AssistantPerHours ? AssistantPerHours : ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Typography variant="h6">
                            University Payment
                        </Typography>
                        <Typography variant="h6">
                            Other Fees
                        </Typography>
                        <Typography variant="h6">
                            Meals per meal/day
                        </Typography>
                        <Typography variant="h6">
                            Snacks and Breaks per snack/break/day
                        </Typography>
                    </div>

                </div>
            </div>
        </div>
    </>)
}

export default Calculate