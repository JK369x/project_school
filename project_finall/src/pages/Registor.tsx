
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

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
  province: String
  district: String
  parish: String
  zipCode: Number
  agency: String | Number
  status: String
}

const Registor = (props: Props) => {

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

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  console.log('complet',completedSteps())
  console.log('total',totalSteps())
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
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
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form onSubmit={handleSubmit(onSubmit)}>
              {/* //?component={'span'} variant={'body2'} */}
              <Typography component={'span'} variant={'body2'} sx={{ mt: 2, mb: 1, py: 1 }}>
                  <div className="hard-top" >
                    ลงทะเบียน
                  </div>
                  {activeStep === 0 && (
                    <section>
                      <label>Email</label>
                      <input type='email' {...register('email', { required: true, maxLength: 20 })} />
                      <label>Password</label>
                      <input type='password' {...register('password', { required: true, minLength: 8 })} />
                      <label>ConfirmPassowrd</label>
                      <input type='password' {...register('confirmPassword', { required: true, minLength: 8 })} />
                    </section>)

                  }{activeStep === 1 && (
                    
                    <section>
                      <label>Email</label>
                      <input type='text' {...register('firstName', { required: true, maxLength: 20 })} />
                      <label>Password</label>
                      <input type='text' {...register('lastName', { required: true, minLength: 8 })} />
                      <label>ConfirmPassowrd</label>
                      <input type='date' {...register('birthday', { required: true, minLength: 8 })} />
                      <label>Birthday</label>
                      <input type='text' {...register('birthday', { required: true, minLength: 8 })} />
                      <label>Job</label>
                      <input type='text' {...register('job', { required: true, minLength: 8 })} />
                      <label>Agency</label>
                      <input type='text' {...register('agency', { required: true, minLength: 8 })} />
                      <label>Status</label>
                      <input type='text' {...register('status', { required: true, minLength: 8 })} />
                    </section>)

                  }{activeStep === 2 && (
                    <section>
                      <label>Address</label>
                      <input type='text' {...register('address', { required: true, maxLength: 20 })} />
                      <label>Province</label>
                      <input type='text' {...register('province', { required: true, minLength: 8 })} />
                      <label>District</label>
                      <input type='text' {...register('district', { required: true, minLength: 8 })} />
                      <label>Parish</label>
                      <input type='text' {...register('parish', { required: true, minLength: 8 })} />
                      <label>Zip Code</label>
                      <input type='text' {...register('zipCode', { required: true, minLength: 8 })} />
                    </section>)
                  }
          

              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                       {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button  type='submit' onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Complete Step'}
                    </Button>
                  ))}

              </Box>
            </form>  
            </React.Fragment>

          )}
        </div>
      </Box>


    </>

  )
}

export default Registor