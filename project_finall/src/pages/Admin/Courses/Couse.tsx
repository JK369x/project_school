import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteCourse } from './Hook/useDeleteCourse'
import { Button, ListItemIcon, TextField } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import { CourseListsType, useGetCourseLists } from './Hook/useGetCourse'
import Testgrid from '../../test/Testgrid'
import Image from '../../../components/Image/Image'
import { Box } from '@mui/system'
import SearchBar from '@mkyy/mui-search-bar'
import moment, { Moment } from 'moment'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'

const Course: FC = () => {

  const { CourseLists, getCourseLists } = useGetCourseLists()
  const data = CourseLists
  const { openConfirmDialog } = useDialog()
  const { deleteCourse } = useDeleteCourse()
  const navigate = useNavigate()
  const newdata = data.filter((item) => item.approval === true)

  const delItem = (data: CourseListsType) => {
    openConfirmDialog({
      textContent: 'deleteCourse',
      onConfirm: async () => {
        await deleteCourse(data.id_document)
        getCourseLists()
      },
    })
  }

  const viewDetailCourse = (data: CourseListsType) => {
    console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
    navigate(`/detailcourse/${data.id_document}`)
  }

  const onClickAddCourse = () => {
    navigate('/addcourses')
  }
  const [datalist, setDataList] = useState<CourseListsType[]>(newdata)
  console.log("🚀 ~ file: Couse.tsx:56 ~ datalist", datalist)
  const [textFieldValue, setTextFieldValue] = useState<any>('')
  const title_course = newdata.map((item: any) => { return item.title })
  const [datebefore, setDateBefore] = useState(moment());
  const [dateafter, setDateAfter] = useState(moment());
  const [btncalendar, setBtncalendar] = useState(false);
  useEffect(() => {
    setDataList(newdata)
  }, [data, datebefore, dateafter])
  const columnOptions: TableColumnOptions[] = [

    {
      width: '100',
      alignHeader: 'center',
      alignValue: 'center',
      label: 'ID',
      value: 'countID',
    },

    {
      width: '50',
      alignHeader: 'center',
      alignValue: 'center',
      label: 'Course',
      value: 'imageTitle',
    },
    {
      alignValue: 'left',
      value: 'title',
    },
    {
      alignHeader: 'left',
      alignValue: 'left',
      label: 'Category',
      value: 'category.label',
    },

    {
      width: '200',
      alignHeader: 'left',
      alignValue: 'center',
      label: 'Action',
      value: 'delitem',
    },

  ]
  const handleSearch = async (labelOptionValue: any) => {
    const data_search: any = newdata.filter((item: any) => item.title == labelOptionValue)
    if (data_search.length > 0) {
      setDataList(data_search)
    } else {
      setDataList(newdata)
    }
  };
  const handleBefore = (date: any) => {
    const date_time = new Date(date).toDateString()
    setDateBefore(moment(date_time))
  };
  const handleAfter = (date: any) => {
    const date_time = new Date(date).toDateString()
    setDateAfter(moment(date_time))
  };
  const onclickSearch = () => {
    console.log(`before ${moment(datebefore)} after ${moment(dateafter)}`)
    const coursedata = datalist.filter((item) => {

      let create_date = moment(item.createDate._seconds * 1000)
      console.log("🚀 ~ file: Couse.tsx:121 ~ coursedata ~ create_date", create_date)
      if (moment(create_date).isBetween(datebefore, dateafter)) {
        console.log('true')
        return item
      } else {
        console.log('false')
        return false
      }
    })
    if (coursedata.length > 0) {
      console.log("🚀 ~ file: Couse.tsx:130 ~ coursedata ~ coursedata", coursedata)
      setDataList(coursedata)

    } else {
      setDataList(coursedata)
      console.log("not found course")

    }
  }
  const clickcalendar = () => {
    console.log('btn =', btncalendar)
    setBtncalendar(!btncalendar)

  }
  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">

        </div>
        <div className="charts">

        </div>
        <div className="listContainer">
          <div className="listTitle">
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid container justifyContent={'space-between'} alignItems={'center'} >
                <Typography variant="h1" component="h1" ml={3}>
                  Courses
                </Typography>
                <Button sx={{ width: '140px', height: '40px', mr: 3 }} color='success' onClick={() => onClickAddCourse()} >+Add course</Button>
              </Grid>


            </Grid>
            <Grid container justifyContent={'flex-end'} alignContent={'center'} alignItems={'center'} sx={{ pr: 3 }} >
              {btncalendar && <>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label="Select Value"
                    inputFormat="DD/MM/YYYY"
                    value={datebefore}
                    onChange={handleBefore}
                    renderInput={(params) => <TextField {...params} sx={{
                      // input: { color: '#fff' },
                      // svg: { color: '#77baee' },
                      // label: { color: '#77baee' },
                      mr: 3, ml: 0.5

                      // border: '1px solid #ced4da',
                    }} />}
                  />

                  <DesktopDatePicker
                    label="Select Value"
                    inputFormat="DD/MM/YYYY"
                    value={dateafter}
                    onChange={handleAfter}
                    renderInput={(params) => <TextField {...params} sx={{
                      // input: { color: '#fff' },
                      // svg: { color: '#77baee' },
                      // label: { color: '#77baee' },
                      // border: '1px solid #ced4da',
                    }} />}
                  />
                </LocalizationProvider>
                <Button onClick={onclickSearch} sx={{ ml: 3, mr: 2 }}> ค้นหา </Button>

              </>}
              <ListItemIcon onClick={clickcalendar}>
                <CalendarMonthIcon color="primary" fontSize="large" sx={{
                  '&:hover': {
                    color: '#77baee',
                    cursor: 'pointer',
                  }
                  , mr: 1
                }} />
              </ListItemIcon>
              <SearchBar
                value={textFieldValue}
                onChange={newValue => setTextFieldValue(newValue)}
                onSearch={() => { handleSearch(textFieldValue) }}
                options={title_course} style={{ color: "#100d0d", border: '1px solid #121010' }}
              />
            </Grid>
            <Table columnOptions={columnOptions} dataSource={datalist.map((e, index) => {
              return {
                ...e,
                countID: index + 1,
                delitem: <>
                  <Button sx={{ mr: 1 }} color='success' onClick={() => {
                    viewDetailCourse(e)
                  }}>View</Button>
                  <Button sx={{ mr: 0 }} color='error' onClick={() => {
                    delItem(e)
                  }}>Delete</Button>
                </>,
                imageTitle: <Grid >
                  <Image src={e.image} width={90} height={60} />
                </Grid>,
              }
            })} defaultRowsPerPage={10} />
          </div>

        </div>
      </div>
    </div>

  )
}

export default Course