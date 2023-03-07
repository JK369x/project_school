import { Box, Grid, Typography } from "@mui/material"
import Navbar from "../../components/componentsAdmin/navbar/Navbar"
import Sidebar from "../../components/componentsAdmin/sidebar/Side-bar"
import { useForm } from "react-hook-form"
import { ControllerTextField } from "../../framework/control"
import { useMemo } from "react"
import PersonIcon from '@mui/icons-material/Person';
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
    Food_day: number
    Food_person: number
    Price_Course: number
    Person_Into_Course: number
    Tax_PerSen: number
    Tax_Number: number
    Lecturer_total_hours: number
    Assistant_total_hours: number
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
    //?Lecturer
    const Lecturer_total_hours = watch('Lecturer_total_hours')
    const watch_Lec_Per_hours = watch('lecturer_per_hours')
    const watch_How_hours = watch('lecturer_How_hours')
    const perHours = useMemo(() => {
        let number_count = Number(watch_Lec_Per_hours) * Number(Lecturer_total_hours)
        return number_count
    }, [watch_Lec_Per_hours, Lecturer_total_hours])
    const totalHours = useMemo(() => {
        let result = Lecturer_total_hours / watch_How_hours
        return Math.ceil(result)
    }, [Lecturer_total_hours, watch_How_hours])




    //!Assistant
    const AssistantHours = watch('Assistant_per_hours')
    const AssistantHowHours = watch('Assistant_How_hours')
    const Total_Assistant = watch('Assistant_total_hours')
    const AssistantPerHours = useMemo(() => {
        let number_count = Number(AssistantHours) * Number(Total_Assistant)
        return number_count
    }, [AssistantHours, Total_Assistant])

    const totalHour_Assistant = useMemo(() => {
        let result = Total_Assistant / AssistantHowHours
        return Math.ceil(result)
    }, [AssistantHowHours, Total_Assistant])



    //?Food
    const FoodPerDay = watch('Food_day')
    const Food_Persons = watch('Food_person')
    const Calculate_Food = useMemo(() => {
        let food_now = Number(Food_Persons) * Number(FoodPerDay)
        return food_now * totalHours
    }, [FoodPerDay, Food_Persons])

    //*Course
    const CoursePrice = watch('Price_Course')
    const PersonIntoCourse = watch('Person_Into_Course')
    const Tax_Universal = watch('Tax_PerSen')
    const Tax_Number = watch('Tax_Number')
    const Calculate_Into_Course_Now = useMemo(() => {
        let result = Number(CoursePrice) * Number(Food_Persons)
        if (Tax_Universal) {
            let result_new = (Number(result) / 100) * Number(Tax_Universal)
            let total_result = result - result_new
            return total_result
        }
        if (Tax_Number) {
            let result_new = Number(result) - Number(Tax_Number)
            return result_new
        }
        return result
    }, [CoursePrice, PersonIntoCourse, Tax_Universal, Tax_Number])

    //!total cost 
    const total_cost = useMemo(() => {
        let result = perHours + AssistantPerHours + Calculate_Food
        return result
    }, [perHours, AssistantPerHours, Calculate_Food])

    //!answer
    const answer_result = useMemo(() => {
        let result = Calculate_Into_Course_Now - Calculate_Food - perHours - AssistantPerHours
        return result
    }, [Calculate_Into_Course_Now, Calculate_Food, AssistantPerHours, perHours])
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
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="h6">
                                People In Course
                            </Typography>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'}>
                                <PersonIcon fontSize="large" sx={{ mt: 2, mr: 1 }} color="primary" />
                                <ControllerTextField sx={{ width: 90 }} formprop={myForm} name={"Food_person"} label={'How many people'} />



                            </Grid>
                            <Typography variant="h6">
                                Lecturer
                            </Typography>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                                <Grid item xs={3}>
                                    <ControllerTextField formprop={myForm} name={"lecturer_per_hours"} label={'Price per Hours'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ControllerTextField formprop={myForm} name={"lecturer_How_hours"} label={'How many Hours'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ControllerTextField formprop={myForm} name={"Lecturer_total_hours"} label={'Total Hours'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">
                                        Price Lecturer : {perHours ? perHours : ''}
                                    </Typography>
                                    <Typography variant="h6">
                                        Day: {totalHours ? totalHours : ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                Assistant Lecturer
                            </Typography>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>

                            </Grid>
                            <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                                <Grid item xs={3}>
                                    <ControllerTextField formprop={myForm} name={"Assistant_per_hours"} label={'Price per Hours'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ControllerTextField formprop={myForm} name={"Assistant_How_hours"} label={'How many Hours'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ControllerTextField formprop={myForm} name={"Assistant_total_hours"} label={'Total Hours'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">
                                        Price Lecturer : {AssistantPerHours ? AssistantPerHours : ''}
                                    </Typography>
                                    <Typography variant="h6">
                                        Day: {totalHour_Assistant ? totalHour_Assistant : ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography variant="h6">
                            Food meal/day
                        </Typography>
                        <Grid container justifyContent={'flex-start'} alignItems={'center'}>
                            <Grid item xs={3}>
                                <ControllerTextField formprop={myForm} name={"Food_day"} label={'Food Per Day'} />
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="h6" mt={2}>
                                    Price Food Total : {Calculate_Food ? Calculate_Food : ''}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h6">
                            University Payment
                        </Typography>
                        <Typography variant="h6">
                            Course Price
                        </Typography>

                        <Grid container justifyContent={'flex-start'}>
                            <Grid item xs={3}>
                                <ControllerTextField formprop={myForm} name={"Price_Course"} label={'Price Course'} />
                            </Grid>

                        </Grid>
                        <Grid container justifyContent={'flex-start'}>
                            <Grid item xs={3}>
                                <ControllerTextField formprop={myForm} name={"Tax_PerSen"} disabled={Tax_Number ? true : false} label={'University Tax %'} />
                            </Grid>
                            <Grid item xs={3}>
                                <ControllerTextField formprop={myForm} name={"Tax_Number"} disabled={Tax_Universal ? true : false} label={'University Tax '} />
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            Price Profit : {Calculate_Into_Course_Now ? Calculate_Into_Course_Now : ''} Price Cost :{total_cost ? total_cost : ''}
                        </Typography>
                        <Typography variant="h6" color={answer_result < 0 ? 'error' : '#18bc25'}>
                            Result: {answer_result ? answer_result : ''}
                        </Typography>

                    </div>

                </div>
            </div>
        </div>
    </>)
}

export default Calculate