import React from 'react'
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { ControllerAutocomplete, ControllerTextField, Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { IFormInput } from '../../../Hook/useCreateAcc'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from '../../../Hook/useGetUserLists'
import { useGetUserLists } from '../../../Hook/useGetUserLists'

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../../../Hook/useDeleteUser'
import { Button } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import './Course.scss'
import { useForm } from 'react-hook-form'
//date MUI
import dayjs, { Dayjs } from 'dayjs';
dayjs.locale('th')
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Lookup } from '../../../types/type'
import { Label } from '@mui/icons-material'
import moment from 'moment'


const roleCategory: Lookup[] = [{
    id: '1',
    label: 'IOT',
}]

const roleWeek: Lookup[] = [{
    id: '1',
    label: 'จันทร์',
}, {
    id: '2',
    label: 'อังคาร',
}, {
    id: '3',
    label: 'พุทธ',
},
{
    id: '4',
    label: 'พฤหัส',
},
{
    id: '5',
    label: 'ศุกร์',
},
{
    id: '6',
    label: 'เสาร์',
},
{
    id: '7',
    label: 'อาทิตย์',
},
]

interface TypeCourses {
    title: string,
    subtitle: string,
    description: string,
    category?: string,
    start_register?: Dayjs | null,
    start_register_time?: Dayjs | null,
    start_course?: string,
    end_couse?: string,
    course_date?: string,
    coruse_date_time?: string,
    what_will_student_learn_in_your_course: string,
    the_course_consists: string,
    who_is_this_course: string,
    linkteammeeting?: string,
    whataretherequirement: string,
    image: string,
    teaching_assistant?: string,
    Pricing: string,
}

const AddCourse = () => {
    const [valueDate, setValuesDate] = useState<Dayjs | null>(null);
    const [valueTime, setValueTime] = useState<Dayjs | null>(null);
    console.log("🚀 ~ file: AddCourse.tsx:51 ~ AddCourse ~ value", valueDate)
    const myForm = useForm<TypeCourses>({
        //! can useDefault onChange


    })
    const { handleSubmit, getValues, setValue } = myForm
    const onSubmit = async () => {
        setValue('start_register', valueDate)
        setValue('start_register_time', valueTime)
        valueDate.moment(new Date(dayjs)).format(YYYY-MM-DD)
        moment(new Date(dayjs)).format(YYYY-MM-DD)
        getValues()

        console.log("🚀 ~ file: AddCourse.tsx:59 ~ onSubmit ~ getValues()", getValues())

    }

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Grid>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h1" component="h2" ml={3}>
                                    Add Course
                                </Typography>
                                <ControllerTextField formprop={myForm} name={"title"} label={'Title'} />
                                <ControllerTextField formprop={myForm} name={"subtitle"} label={'subtitle'} />
                                <ControllerTextField formprop={myForm} name={"description"} label={'description'} />
                                <Grid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="register"
                                            value={valueDate}
                                            onChange={(newValue) => {
                                                setValuesDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="time register"
                                            value={valueTime}
                                            onChange={(newValue) => {
                                                setValueTime(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="start-course"
                                            value={valueDate}
                                            onChange={(newValue) => {
                                                setValuesDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="end-course"
                                            value={valueDate}
                                            onChange={(newValue) => {
                                                setValuesDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid >
                                    <ControllerAutocomplete

                                        formprop={myForm}
                                        name={''}
                                        label={'Category'}
                                        options={roleCategory} // load options

                                    />
                                </Grid>
                                <Grid>
                                    <ControllerAutocomplete

                                        formprop={myForm}
                                        name={''}
                                        label={'Course date'}
                                        options={roleWeek} // load options

                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="time register"
                                            value={valueTime}
                                            onChange={(newValue) => {
                                                setValueTime(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <Grid item>
                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course"} label={'What will student learn in your course'} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course"} label={''} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course"} label={''} />
                                        </Grid>
                                        <Grid>
                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course"} label={''} />

                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <Grid>
                                            <ControllerTextField formprop={myForm} name={"the_course_consists"} label={'The Course consists'} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"the_course_consists"} label={''} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"the_course_consists"} label={''} />
                                        </Grid>
                                        <Grid>
                                            <ControllerTextField formprop={myForm} name={"the_course_consists"} label={''} />

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container  >
                                    <Grid >

                                        <ControllerTextField formprop={myForm} name={"who_is_this_course"} label={'Who is this course for ?'} />
                                    </Grid>
                                    <Grid >
                                        <ControllerTextField formprop={myForm} name={"linkteammeeting"} label={'Link team meeting'} />

                                    </Grid>
                                </Grid>
                                <Grid >
                                    <ControllerTextField formprop={myForm} name={"whataretherequirement"} label={'What are the requirement or prerequisites for taking your course?'} />

                                </Grid>
                                <Grid >
                                    <ControllerTextField formprop={myForm} name={"teaching_assistant"} label={'Add teaching assistant'} />

                                </Grid>
                                <Grid>

                                </Grid>


                                <Button type='submit'>Submit</Button>
                            </form>
                        </Grid>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddCourse