import React from 'react'
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { Button, ControllerAutocomplete, ControllerTextField, Table } from '../../../framework/control'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../../../Hook/useDeleteUser'

//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import { useForm } from 'react-hook-form'
//date MUI


// dayjs.locale('th')
import TextField from '@mui/material/TextField';
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
    ref, uploadBytesResumable, getStorage, UploadTaskSnapshot, TaskEvent
} from "firebase/storage"
import { storage } from '../../../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'
import { CourseCollection } from '../../../firebase/createCollection'
import { TypeCourses } from '../../../Hook/useCreateCourse'
import { UseCreateCourse } from '../../../Hook/useCreateCourse'
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'




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



const AddCourse = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [value, setValues] = useState<Date>(new Date());
    const [valueDate, setValuesDate] = useState<Date>(new Date());
    const [valueTime, setValueTime] = useState<Date>(new Date());
    const [image, setImage] = useState<any>(null);

    //*Hook
    const { addCourse } = UseCreateCourse()

    const uid = useAppSelector(({ auth: { uid } }) => uid)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()



    //? waiting set Default value form
    const myForm = useForm<TypeCourses>({
        //! can useDefault onChange

    })


    const handleChange = (e: any) => {
        if (e.target.files[0])
            setImage(e.target.files[0]);
    }

   

    const { handleSubmit, getValues, setValue } = myForm
    const onSubmit = async () => {
        if (image) {
            const imageRef =  ref(storage, `img/${image.name}`);
            const uploadTask =  uploadBytesResumable(imageRef, image)
            uploadTask.on('state_changed',
                (snapshot:UploadTaskSnapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },

                (error) => {
                    // Handle unsuccessful uploads
                    console.log("🚀 ~ file: AddCourse.tsx:157 ~ onSubmit ~ error", error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  
                        //! can use url don't have useSate 
                        console.log('File available at', url);
                   
                        
                        setValue('start_register', new Date(value))
                        setValue('start_register_time', new Date(valueTime))
                        setValue('start_course', new Date(valueDate))
                        setValue('end_couse', new Date(selectedDate))
                        setValue('image', url)
                
                
                        if (getValues()) {
                            console.log("🚀 ~ file: AddCourse.tsx:165 ~ onSubmit ~ getValues")
                            try {
                                dispatch(isShowLoading())
                                addCourse(getValues())
                                dispatch(openAlertSuccess('addCourseSuccess'))
                            } catch (err) {
                                dispatch(openAlertError('addCourseError'))
                                console.log("🚀 ~ file: AddCourse.tsx:113 ~ onSubmit ~ err", err)
                            } finally {
                                dispatch(isCloseLoading())
                            }
                        }
                    });
                }
                
            );
        } else {
            console.log('File not found')
        }

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
                                {/* <ImageInput label="Select an image" onChange={(event) => {
                                    setImage(event.target.files[0])
                                }} /> */}
                                <ImageInput label="Select an image" onChange={
                                    handleChange} />
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
                                        onChange={(newValue: any) => {
                                            setValuesDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DatePicker
                                        label="end-course"
                                        value={selectedDate}
                                        onChange={(newValue: any) => {
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
                                        onChange={(newValue: any) => {
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
                                <Button type='submit' label='Submit' />
                            </form>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddCourse