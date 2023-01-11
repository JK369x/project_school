import React from 'react'
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { Button, ControllerAutocomplete, ControllerTextField, Table } from '../../../framework/control'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../../../Hook/user/useDeleteUser'

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
import { Lookup, roleWeek, typeCourseOnline_Onside } from '../../../types/type'
import { DateTimePicker } from '@mui/x-date-pickers'
import ImageInput from '../../../framework/control/InputImage/ImageInput'
//firebase image 
import {
    
    getDownloadURL,
    
    ref, uploadBytesResumable,  UploadTaskSnapshot, 
} from "firebase/storage"
import { storage } from '../../../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'
import { TypeCourses } from '../../../Hook/course/useCreateCourse'
import { UseCreateCourse } from '../../../Hook/course/useCreateCourse'
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'

import { useGetCategoryLists  } from '../../../Hook/category/useGetCategory'






const AddCourse = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [value, setValues] = useState<Date>(new Date());
    const [valueDate, setValuesDate] = useState<Date>(new Date());
    const [valueTime_start, setValueTime_start] = useState<Date>(new Date());
    const [valueTime_end, setValueTime_end] = useState<Date>(new Date());
    const [valueEnd, setValuesEnd] = useState<Date>(new Date());
    const [image, setImage] = useState<any>(null);
    const { CategoryLists } = useGetCategoryLists()
    const getCategoryLists = CategoryLists

    const dataCategory: Lookup[] = getCategoryLists.map((item, index) => {
        return {id: item.id, label: item.label}
    })

    //*Hook
    const { addCourse } = UseCreateCourse()

    const auth = useAppSelector(({ auth: { uid } }) => uid)
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
        getValues()
        
        console.log('testget',getValues())
        
        if (image) {
            const imageRef = ref(storage, `img/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image)
            uploadTask.on('state_changed',
                (snapshot: UploadTaskSnapshot) => {
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
                        setValue('start_register_time', new Date(valueTime_start))
                        setValue('start_register_end', new Date(valueTime_end))
                        setValue('start_course', new Date(valueDate))
                        setValue('end_course', new Date(selectedDate))
                        setValue('start_registerEnd', new Date(selectedDate))
                        setValue('image', url)
                        if (getValues()) {
                            try {
                                addCourse(getValues())
                            } catch (err) {
                                console.log("🚀 ~ file: AddCourse.tsx:113 ~ onSubmit ~ err", err)
                            }
                        }
                    });
                }
            );
        } else {
            console.log('File not found')
        }
    }
        console.log("🚀 ~ file: AddCourse.tsx:141 ~ onSubmit ~ getValues", getValues)
        console.log("🚀 ~ file: AddCourse.tsx:141 ~ onSubmit ~ getValues", getValues)
        console.log("🚀 ~ file: AddCourse.tsx:141 ~ onSubmit ~ getValues()", getValues())



    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Grid>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h1" component="h1" ml={3}>
                                    Add Course
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"title"} label={'Title'} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"subtitle"} label={'subtitle'} />
                                    </Grid>
                                </Grid>
                                <ControllerTextField fullWidth multiline maxRows={4} minRows={2} formprop={myForm} name={"description"} label={'description'} />


                        

                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete
                                            fullWidth
                                            formprop={myForm}
                                            name={'category'}
                                            label={'Category'}
                                            options={dataCategory} // load options
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete
                                            fullWidth
                                            multiple={true}
                                            formprop={myForm}
                                            name={'course_date'}
                                            label={'Course date'}
                                            options={roleWeek} // load options
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete
                                            fullWidth
                                            multiple={true}
                                            formprop={myForm}
                                            name={'course_status'}
                                            label={'Select Course Time'}
                                            options={typeCourseOnline_Onside} // load options
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems={'center'} alignContent={'center'} spacing={1} sx={{ mb: 2, mt: 2 }}>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"what_will_student_learn_in_your_course.input_0"} label={'What will student learn in your course'} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"what_will_student_learn_in_your_course.input_1"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"what_will_student_learn_in_your_course.input_2"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"what_will_student_learn_in_your_course.input_3"} label={''} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"the_course_consists.input_0"} label={'The Course consists'} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"the_course_consists.input_1"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"the_course_consists.input_2"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"the_course_consists.input_3"} label={''} />
                                    </Grid>

                                </Grid>

                                <Grid container spacing={1} sx={{ mb: 2 }} >
                                    <Grid item xs={6} >
                                        <ControllerTextField fullWidth formprop={myForm} name={"who_is_this_course"} label={'Who is this course for ?'} />
                                        <ControllerTextField fullWidth formprop={myForm} name={"linkteammeeting"} label={'Link team meeting'} />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <ControllerTextField fullWidth formprop={myForm} name={"teaching_assistant"} label={'Add teaching assistant'} />
                                        <ControllerTextField fullWidth formprop={myForm} name={"whataretherequirement"} label={'What are the requirement or prerequisites for taking your course?'} />
                                    </Grid>

                                </Grid>

                                <Typography variant="h6"  >
                                    Image Course
                                </Typography>
                                <ImageInput label="Select an image" onChange={
                                    handleChange} />


                                <Typography variant="h6" gutterBottom  >
                                    Time Course Register
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Start Registration"
                                        value={value}
                                        onChange={(newValue: any) => {
                                            setValues(newValue);
                                        }}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="End Registration"
                                        value={valueEnd}
                                        onChange={(newValue: any) => {
                                            setValuesEnd(newValue);
                                        }}
                                    />
                                </Grid>


                                <Typography variant="h6" gutterBottom >
                                    Time Course Learn
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <DatePicker
                                        label="start-course"
                                        value={valueDate}
                                        onChange={(newValue: any) => {
                                            setValuesDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DatePicker
                                        label="end-course"
                                        value={selectedDate}
                                        onChange={(newValue: any) => {
                                            setSelectedDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>


                                <Typography variant="h6" gutterBottom  >
                                    Time Course In Day
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <TimePicker
                                        label="start-time"
                                        value={valueTime_start}
                                        onChange={(newValue: any) => {
                                            setValueTime_start(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <TimePicker
                                        label="end-start"
                                        value={valueTime_end}
                                        onChange={(newValue: any) => {
                                            setValueTime_end(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>

                                <Grid container spacing={1} sx={{ mb: 2 }} alignContent={'center'} alignItems={'center'} >
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"min_people"} label={'Min people'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"Pricing"} label={'Pricing'} />
                                    </Grid>
                                    <Grid item xs={3} sx={{mt:2.3}}>
                                        <Button type='submit' label='Submit' />
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddCourse