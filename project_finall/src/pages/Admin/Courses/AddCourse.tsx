import React from 'react'
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { Button, ControllerAutocomplete, ControllerTextField, Table } from '../../../framework/control'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../Users/Hook/useDeleteUser'

//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import { useFieldArray, useForm } from 'react-hook-form'
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
    ref, uploadBytesResumable, UploadTaskSnapshot,
} from "firebase/storage"
import { storage } from '../../../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'
import { TypeCourses } from './Hook/useCreateCourse'
import { UseCreateCourse } from './Hook/useCreateCourse'
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'

import { useGetCategoryLists } from '../Categorys/Hook/useGetCategory'






const AddCourse = () => {
    const [start_register, setStart_register] = useState<Date>(new Date());
    const [End_register, setEnd_register] = useState<Date>(new Date());

    const [start_learn, setStart_learn] = useState<Date>(new Date());
    const [end_learn, setEnd_learn] = useState<Date>(new Date());

    const [start_time, setStart_time] = useState<Date>(new Date());
    const [end_time, setEnd_time] = useState<Date>(new Date());

    const [image, setImage] = useState<any>(null);
    const { CategoryLists } = useGetCategoryLists()
    const getCategoryLists = CategoryLists

    const dataCategory: Lookup[] = getCategoryLists.map((item, index) => {
        return { id: item.id, label: item.Category_Title }
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
    const [choices, setChoices] = useState<string[]>([]);
    const [numOfChoices, setNumOfChoices] = useState(1);
    const [numOfChoices1, setNumOfChoices1] = useState(1);
    const handleAddChoice = (e: any) => {
        setNumOfChoices(numOfChoices + 1);
    }

    const handleAddChoice1 = (e: any) => {
        setNumOfChoices1(numOfChoices1 + 1);
    }

    const handleChange = (e: any) => {
        if (e.target.files[0])
            setImage(e.target.files[0]);
    }


    const { handleSubmit, getValues, setValue } = myForm
    const onSubmit = async () => {
        getValues()
        if (image) {
            const imageRef = ref(storage, `img/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image)
            uploadTask.on('state_changed',
                (snapshot: UploadTaskSnapshot) => {

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

                        setValue('start_register', new Date(start_register))
                        setValue('End_register', new Date(End_register))

                        setValue('start_learn', new Date(start_learn))
                        setValue('end_learn', new Date(end_learn))

                        setValue('start_time', new Date(start_time))
                        setValue('end_time', new Date(end_time))

                        // setValue('what_will_student_learn_in_your_course', [...getValues(what_will_learn), ""])
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

                                <Grid container spacing={1} sx={{ mb: 2, mt: 2 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">
                                            What will student learn in your course
                                        </Typography>

                                        {Array.from({ length: numOfChoices }, (_, i) => (
                                            <ControllerTextField
                                                key={i}
                                                fullWidth
                                                formprop={myForm}
                                                name={`what_will_student_learn_in_your_course.${i}`}

                                            />
                                        ))}
                                        <Typography variant="h6" color={'primary'} onClick={handleAddChoice}
                                            ml={3} sx={{
                                                '&:hover': {
                                                    color: '#0572c5',
                                                    cursor: "pointer",
                                                }
                                            }}>
                                            Add Choice +
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" >
                                            The Course consists
                                        </Typography>

                                        {Array.from({ length: numOfChoices1 }, (_, i) => (
                                            <ControllerTextField
                                                key={i}
                                                fullWidth
                                                formprop={myForm}
                                                name={`the_course_consists.${i}`}

                                            />
                                        ))}
                                        <Typography variant="h6" color={'primary'} onClick={handleAddChoice1} ml={3} sx={{
                                            '&:hover': {
                                                color: '#0572c5',
                                                cursor: "pointer",
                                            }
                                        }}>
                                            Add Choice +
                                        </Typography>
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
                                        value={start_register}
                                        onChange={(newValue: any) => {
                                            setStart_register(newValue);
                                        }}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="End Registration"
                                        value={End_register}
                                        onChange={(newValue: any) => {
                                            setEnd_register(newValue);
                                        }}
                                    />
                                </Grid>


                                <Typography variant="h6" gutterBottom >
                                    Time Course Learn
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <DatePicker
                                        label="start-course"
                                        value={start_learn}
                                        onChange={(newValue: any) => {
                                            setStart_learn(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />


                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DatePicker
                                        label="end-course"
                                        value={end_learn}
                                        onChange={(newValue: any) => {
                                            setEnd_learn(newValue);
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
                                        value={start_time}
                                        onChange={(newValue: any) => {
                                            setStart_time(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <TimePicker
                                        label="end-start"
                                        value={end_time}
                                        onChange={(newValue: any) => {
                                            setEnd_time(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>

                                <Grid container spacing={1} sx={{ mb: 2 }} alignContent={'center'} alignItems={'center'} >
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"min_people"} label={'Min people'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"max_people"} label={'Max people'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"pricing"} label={'pricing'} />
                                    </Grid>
                                    <Grid item xs={3} sx={{ mt: 2.3 }}>
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