import React from 'react'
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { Button, ControllerAutocomplete, ControllerTextField, Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { IFormInput } from '../../../Hook/useCreateAcc'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from '../../../Hook/useGetUserLists'
import { useGetUserLists } from '../../../Hook/useGetUserLists'

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../../../Hook/useDeleteUser'

//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import './Course.scss'
import { useForm } from 'react-hook-form'
//date MUI
import dayjs, { Dayjs } from 'dayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// dayjs.locale('th')
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Lookup } from '../../../types/type'
import moment from 'moment'
import { DateTimePicker } from '@mui/x-date-pickers'
import ImageInput from '../../../framework/control/InputImage/ImageInput'
//firebase image 
import {
    deleteObject,
    getDownloadURL,
    listAll,
    ref, uploadBytesResumable,
} from "firebase/storage"
import { storage } from '../../../firebase/config_firebase'
import { useAppSelector } from '../../../store/useHooksStore'

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
    start_register?: Date | null,
    start_register_time?: Dayjs | null,
    start_course?: string,
    end_couse?: string,
    course_date?: string,
    coruse_date_time?: string,
    what_will_student_learn_in_your_course?: {
        input_0: string,
        input_1: string,
        input_2?: string,
        input_3?: string,
    },
    the_course_consists?: {
        input_0: string,
        input_1: string,
        input_2?: string,
        input_3?: string,
    },
    who_is_this_course: string,
    linkteammeeting?: string,
    whataretherequirement: string,
    image: string,
    teaching_assistant?: string,
    Pricing: string,
}

const AddCourse = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [value, setValues] = useState<Date>(new Date());
    const [valueDate, setValuesDate] = useState<Date | null>(null);
    const [valueTime, setValueTime] = useState<Dayjs | null>(null);
    const [image, setImage] = useState<any>(null);
    console.log("🚀 ~ file: AddCourse.tsx:115 ~ AddCourse ~ image", image)
    const imageListRef = ref(storage, "img/")
    const uid = useAppSelector(({ auth: { uid } }) => uid)
    console.log("asdasdd", new Date(value))
    const myForm = useForm<TypeCourses>({
        //! can useDefault onChange


    })
    const renderInput = (props: any) => {
        return <TextField {...props} />;
    };
    const { handleSubmit, getValues, setValue } = myForm
    const onSubmit = async () => {
        setValue('start_register', value)
        setValue('start_register_time', valueTime)
        getValues()
        console.log("🚀 ~ file: AddCourse.tsx:118 ~ onSubmit ~  getValues()", getValues())
    }


    const onClickUpload = () => {
        const imageRef = ref(storage, `img/${image.name + uid}`)
        const uploadFile = uploadBytesResumable(imageRef, image);
        console.log("🚀 ~ file: AddCourse.tsx:134 ~ handleChange ~ e", image)

        uploadFile.on('state_changed', (snapshot) => {

        }, (err) => {

        }, () => {



            alert("File uploaded Successfully :)👌")
        });
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
                                <ImageInput label="Select an image" onChange={(event) => {
                                    setImage(event.target.files[0])
                                }}/>
                                <Button label='Upload' onClick={onClickUpload} />
                                <ControllerTextField formprop={myForm} name={"title"} label={'Title'} />
                                <ControllerTextField formprop={myForm} name={"subtitle"} label={'subtitle'} />
                                <ControllerTextField formprop={myForm} name={"description"} label={'description'} />
                                <Grid>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Start Registration"
                                        value={value}
                                        onChange={(newValue: any) => {
                                            setValues(newValue);
                                        }}
                                    />
                                </Grid>
                                <Grid>
                                    <DatePicker
                                        label="start-course"
                                        value={valueDate}
                                        onChange={(newValue) => {
                                            setValuesDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DatePicker
                                        label="end-course"
                                        value={selectedDate}
                                        onChange={(newValue) => {
                                            setSelectedDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
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
                                    <TimePicker
                                        label="time register"
                                        value={valueTime}
                                        onChange={(newValue) => {
                                            setValueTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <Grid item>
                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course.input_0"} label={'What will student learn in your course'} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course.input_1"} label={''} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course.input_2"} label={''} />
                                        </Grid>
                                        <Grid>
                                            <ControllerTextField formprop={myForm} name={"what_will_student_learn_in_your_course.input_3"} label={''} />

                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <Grid>
                                            <ControllerTextField formprop={myForm} name={"the_course_consists.input_0"} label={'The Course consists'} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"the_course_consists.input_1"} label={''} />
                                        </Grid>
                                        <Grid>

                                            <ControllerTextField formprop={myForm} name={"the_course_consists.input_2"} label={''} />
                                        </Grid>
                                        <Grid>
                                            <ControllerTextField formprop={myForm} name={"the_course_consists.input_3"} label={''} />

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
                                <Button type='submit' label='Submit'/>
                            </form>
                        </Grid>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddCourse