
import { useForm, SubmitHandler } from "react-hook-form";
//import register
import { RegisterStep1, RegisterStep2, RegisterStep3 } from './RegisterStep1'
//MUI
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { Lookup } from "../types/type";
import Grid2 from '@mui/material/Unstable_Grid2';
import { ControllerTextField } from '../framework/control/TextField/Controller'
import Button from "../framework/control/Button/Button";
import { ControllerAutocomplete } from '../framework/control/Autocomplete/Controller'
type Props = {}

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const lookUpProvince: Lookup[] = [{
  id: '1',
  label: 'กทม',
}, {
  id: '2',
  label: 'ลพบุรี',
}]

export const lookUpAumphure: Lookup[] = [{
  id: '11',
  label: 'อำเภอกทม',
}, {
  id: '12',
  label: 'อำเภอ2',
}]

export const lookUpTumbon: Lookup[] = [{
  id: '123',
  label: 'ตำบล',
}, {
  id: '124',
  label: 'ตำบล2',
}]

export const lookUpZipCode: Lookup[] = [{
  id: '1234',
  label: '10392',
}, {
  id: '1235',
  label: '18190',
}]


interface IFormInput {
  email: String | Number
  password: String | Number
  confirmPassword: String | Number
  firstName: String
  lastName: String
  job: String
  birthday: String | Number
  address: String | Number
  province: Lookup | null
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
    //! can useDefault onChange


  })
  const { handleSubmit } = myForm

  const onSubmit: SubmitHandler<IFormInput> = data => {
    handleComplete()
    console.log(data)
  }
  return (
    <>
      <Grid2 container justifyContent={'center'}>
        <Grid2 xs={8} md={6}>
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
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box>
                      <Button primary type={"submit"} label={'Finish'} />
                    </Box>
                   </form>
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
        </Grid2>
      </Grid2>
    </>

  )
}

export default Register