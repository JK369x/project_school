
import { useForm, SubmitHandler } from "react-hook-form";
//import register
import { RegisterStep1, RegisterStep2, RegisterStep3 } from './RegisterStep1'
//MUI
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



type Props = {}

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];


interface IFormInput {
  email: String | Number
  password: String | Number
  confirmPassword: String | Number
  firstName: String
  lastName: String
  job: String
  birthday: String | Number
  address: String | Number
  province: any
  district: String
  parish: String
  zipCode: Number
  agency: String | Number
  status: String
  
}

const Register = (props: Props) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
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


  console.log('complet', completedSteps())
  console.log('total', totalSteps())
  const myForm = useForm<IFormInput>({
    mode:'onChange',
    defaultValues:{
      province:null,
    }
  })
  const { handleSubmit } = myForm

  const onSubmit: SubmitHandler<IFormInput> = data => {
    handleComplete()
    console.log(data)
  }
  return (
    <>
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
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* //?component={'span'} variant={'body2'} */}
                <Typography component={'span'} variant={'body2'} sx={{ mt: 2, mb: 1, py: 1 }}>
                  <div className="head-top" >
                    ลงทะเบียน
                  </div>
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
    </>

  )
}

export default Register