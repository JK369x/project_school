
import { useForm, SubmitHandler } from "react-hook-form";
//import register
import { RegisterStep1, RegisterStep2, RegisterStep3 } from './RegisterStep1'
//MUI
import * as React from 'react';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { Lookup } from "../types/type";
import Grid from '@mui/material/Grid';
import Button from "../framework/control/Button/Button";
import { Navbar } from "../components/Navbar";
//HOOK
import { useCreateAcc } from './Admin/Users/Hook/useCreateAcc'
import { IFormInput } from './Admin/Users/Hook/useCreateAcc'

import { useAppDispatch } from "../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../store/slices/loadingSlice";
//redux
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import email from '../assets/email.png'

type Props = {}

const steps = ['Step 1', 'Step 2 ', 'Finish'];

export const role: Lookup[] = [{
  id: '1',
  label: 'บุคคลทั่วไป',
}, {
  id: '2',
  label: 'นักศึกษา (มทร.ธัญบุรี)',

}, {
  id: '3',
  label: 'ศิษย์เก่า (มทร.ธัญบุรี)'
},
]




const Register = (props: Props) => {

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const schema = yup.object({
    email: yup.string()
      .required(('กรุณากรอกอีเมล') as string).lowercase().trim()
      .min(3, 'ความยาวอีเมลต้องมากกว่า 3 ตัวอักษร')
      .email('รูปแบบอีเมลไม่ถูกต้อง')
    ,
    password: yup.string().required(('กรุณากรอกรหัสผ่าน'))
      .min(4, ('ความยาวรหัสผ่านต้องมากกว่า 4 ตัวอักษร'))
      .max(20, ('ความยาวรหัสผ่านมีความยาวน้อยกว่า 20 ตัวอักษร'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\*)(?=.*\S).*$/,
        'รหัสผ่านต้องประกอบด้วยตัวอักษรตัวเล็ก (a-z) และตัวใหญ่ (A-Z) อย่างน้อย 1 ตัว และสัญลักษณ์พิเศษ (*) อย่างน้อย 1 ตัว'
      )
    ,
    confirmPassword: yup.string()
      .required('กรุณากรอกยืนยันรหัสผ่าน')
      .oneOf([yup.ref('password'), ''], 'รหัสผ่านไม่ตรงกัน')
    ,
    id_verify: yup.string().required('กรุณากรอกรหัสบัตรประชาชน').min(13, ('รหัสบัตรประชาชนต้องไม่ต่ำกว่า 13 ตัวอักษร')).max(13, ('รหัสบัตรประชาชนต้องมีความยาวไม่เกิน 13 ตัวอักษร'))
    ,
    firstName: yup.string().required('กรุณากรอกชื่อ').trim().lowercase().max(20, ('ชื่อมีความยาวได้ไม่เกิน 20 ตัวอักษร'))
    ,
    lastName: yup.string().required('กรุณากรอกนามสกุล').trim().lowercase().max(20, ('นามสกุลมีความยาวได้ไม่เกิน 20 ตัวอักษร'))
    ,
    agency: yup.string().required('กรุณากรอกหน่วยงาน หรือ ชื่อบริษัท').max(30, ('หน่วยงานมีความยาวได้ไม่เกิน 30 ตัวอักษร'))
    ,
    job: yup.string().required('กรุณากรอกอาชีพของคุณ').max(30, ('อาชีพมีความยาวได้ไม่เกิน 30 ตัวอักษร'))
    ,
    status: yup.mixed().required('กรุณาเลือกสถานะ'),
    address: yup.string().required('กรุณากรอกชื่อ'),
    province: yup.mixed().required('กรุณาเลือกจังหวัด'),
    amphure: yup.mixed().required('กรุณาเลือกอำเภอ'),
    tambon: yup.mixed().required('กรุณาเลือกตำบล'),
    zipCode: yup.mixed().required('กรุณาเลือกรหัสไปรษณีย์'),

  })
  const myForm = useForm<IFormInput>({
    //! can useDefault onChange
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      job: '',
      birthday: new Date,
      province: null,
      amphure: null,
      tambon: null,
      zipCode: null,
      agency: '',
      status: null,
      // about: '',
      image_rul: '',
      id_verify: '',
      address: '',
    }
  })
  //redux
  const dispatch = useAppDispatch()
  const { handleSubmit, getValues, setValue, setError, clearErrors, watch } = myForm
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  useEffect(() => {
    if (confirmPassword && password) {
      if (password !== confirmPassword)
        setError('confirmPassword', { message: ('รหัสผ่านไม่ตรงกัน') as string })
      else clearErrors(['confirmPassword'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password])

  const { addUser } = useCreateAcc()
  const navigate = useNavigate()
  const onSubmit = async () => {
    console.log('test')
    handleComplete()
    if (getValues()) {
      try {
        dispatch(isShowLoading())
        const data = await addUser(getValues())
        if (data === true) {
          navigate('/login')
        } else {
          console.log("🚀 ~ file: Register.tsx:180 ~ onSubmit ~ data:", data)
          setError('email', { message: (`${data}`) })
          setActiveStep(0);
        }
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(isCloseLoading())
      }
    } else {
      console.log("🚀 ~ file: Register.tsx:180 ~ onSubmit ~ dat")
    }
  }
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', backgroundColor: '#ffffff', alignItems: 'center' }}>
        <Grid container justifyContent={'center'} sx={{ mt: 15 }} >
          <Grid item xs={6}>
            <Typography variant="h1" align="center" >
              ลงทะเบียน
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container justifyContent={'center'}>
                        <Grid container justifyContent={'center'} sx={{ mt: 8 }} item xs={12} >
                          <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
                            กรุณาตรวจสอบอีเมลของคุณหลักจากกดปุ่มสำเร็จ
                          </Typography>
                        </Grid>
                        <Grid container justifyContent={'center'} sx={{ mb: 5, mt: 3 }} item xs={12} >
                          <img src={email} width={250} height={250} alt="" />
                        </Grid>
                        <Box>
                          <Button primary type={"submit"} label={'Finish'} />
                        </Box>

                      </Grid>
                    </form>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* //?component={'span'} variant={'body2'} */}

                      <Typography variant={'body2'} sx={{ mt: 2, mb: 1, py: 1 }}>

                        {activeStep === 0 && (
                          <RegisterStep1 handleNext={handleNext} myForm={myForm} handleComplete={handleComplete} handleBack={handleBack} activeStep={activeStep} />
                        )
                        }{activeStep === 1 && (
                          <RegisterStep2 handleNext={handleNext} myForm={myForm} handleComplete={handleComplete} handleBack={handleBack} activeStep={activeStep} />
                        )
                        }{activeStep === 2 && (
                          <RegisterStep3 handleNext={handleNext} myForm={myForm} handleComplete={handleComplete} handleBack={handleBack} activeStep={activeStep} />
                        )}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep !== steps.length &&
                          (completed[activeStep] &&
                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                              {activeStep + 1} already completed
                            </Typography>
                          )}
                      </Box>

                    </form>
                  </React.Fragment>
                )}
              </div>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Register