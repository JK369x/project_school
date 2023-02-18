import React, { useState } from "react";
import Pdftest from "./Pdftes";
import { DatePicker, DateTimePicker, DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment, { Moment } from "moment";
import { Button, TextField } from "@mui/material";
import 'moment-timezone';
import { useForm } from "react-hook-form";
import { useGetBanner } from "../Admin/Banner/useGetBanner";

interface timetype {
  time: any
}

const Testgrid = () => {
  const [selectedDate, setDate] = useState<Moment | null>(moment());
  const [value, setValues] = useState<Moment>(moment())
  const [valueTime, setValueTime] = useState<Moment>(moment())
  const { banner } = useGetBanner()
  console.log("🚀 ~ file: Testgrid.tsx:21 ~ Testgrid ~ banner", banner[0]?.banner1)
  Array(banner).map((item: any) => {
  })
  const handleChange = (date: any) => {
    setDate(date)
  };
  const handleMoment = (date: any) => {
    setValues(date)
  };
  const timepicker = (date: any) => {

    setValueTime(date)
  };
  const date_moment = moment().tz('Asia/Bangkok').format('D MM, YYYY H:mm');
  if (moment(date_moment)) {

  } else {

  }

  const myForm = useForm()
  const { setValue, getValues, handleSubmit } = myForm
  const onSubmit = () => {
    setValue('time', moment(value))
    console.log(getValues())
  }
  //! H:mm ทำให้ pm am หายไป
  return (

    <>

      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
        <DesktopDatePicker
          label="Select Value"

          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />

        <DateTimePicker
          disableMaskedInput
          renderInput={(props) => <TextField {...props} />}
          label="Value"
          inputFormat="D MMMM YYYY H:mm"
          value={value}
          ampm={false}
          onChange={handleMoment}
        />
        <TimePicker
          label="Time"
          value={valueTime}
          ampm={false}
          onChange={timepicker}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          // disableMaskedInput
          renderInput={(props) => <TextField {...props} />}
          label="Value"
          // inputFormat="DD/MM/YYYY hh:mm"
          value={value}
          ampm={false}
          onChange={handleMoment}
        />
      </LocalizationProvider>
      {selectedDate?.isAfter(value) ? 'Current date is after old date' : 'Current date is not after old date'}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type='submit'>submit</Button>


      </form>
    </>
  );
};

export default Testgrid;