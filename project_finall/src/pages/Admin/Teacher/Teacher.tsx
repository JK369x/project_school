import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import '../Dashboard/Dashboard.scss'
import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from '../Users/Hook/useGetUserLists'
import { useGetUserLists } from '../Users/Hook/useGetUserLists'

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from '../Users/Hook/useDeleteUser'
import { Button, ListItemIcon, TextField } from '@mui/material'
//react dom 
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import SearchBar from '@mkyy/mui-search-bar'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
const Teacher: FC = () => {
  const { userLists, getUserLists } = useGetUserLists()
  const data = userLists
  const { openConfirmDialog } = useDialog()
  const { deleteUser } = useDeleteUser()
  const navigate = useNavigate()
  //  const [detailUser, setDetailUser] = useState<UserListsType>()
  console.log("🚀 ~ file: User.tsx:20 ~ data", data)

  const delItem = (data: UserListsType) => {
    openConfirmDialog({
      textContent: 'deleteUser',
      onConfirm: async () => {
        await deleteUser(data.id_document)
        getUserLists()
      },
    })
  }

  const viewDetailUser = (data: UserListsType) => {
    console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
    // setDetailUser(data)
    navigate(`/detailuser/${data.id_document}`)

  }

  let newdata = data.filter((item: any) => item.status.id === "4")
  console.log("🚀 ~ file: Teacher.tsx:49 ~ newdata", newdata)


  const CreateTeacher = () => {
    navigate(`/createteacher`)

  }
  const columnOptions: TableColumnOptions[] = [

    {
      width: '100',
      alignHeader: 'left',
      alignValue: 'left',
      label: 'ID',
      value: 'countID',
    },
    {

      label: 'User',
      value: 'firstName',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      alignValue: 'left',
      alignHeader: 'left',
      label: 'Status',
      value: 'status.label',
    },
    {
      width: '200',
      alignHeader: 'left',
      alignValue: 'center',
      label: 'Action',
      value: 'delitem',
    },


  ]
  const [datalist, setDataList] = useState(newdata)
  console.log("🚀 ~ file: Couse.tsx:56 ~ datalist", datalist)
  const [textFieldValue, setTextFieldValue] = useState<any>('')
  const firstName_lastName = newdata.map((item: any) => { return `${item.firstName} ${item.lastName}` })
  console.log("🚀 ~ file: User.tsx:87 ~ title_course", firstName_lastName)
  const [datebefore, setDateBefore] = useState(moment());
  const [dateafter, setDateAfter] = useState(moment());
  const [btncalendar, setBtncalendar] = useState(false);
  useEffect(() => {
    setDataList(newdata)
  }, [data, datebefore, dateafter])
  const handleSearch = async (labelOptionValue: any) => {
    const label_data = labelOptionValue.split(" ")
    console.log("🚀 ~ file: User.tsx:96 ~ handleSearch ~ label_data", label_data)
    const data_search: any = newdata.filter((item: any) => item.firstName == label_data[0])
    console.log("🚀 ~ file: Couse.tsx:103 ~ handleSearch ~ data_search", data_search)
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

      let create_date = moment(item.createDate?._seconds * 1000)
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
                  Teacher
                </Typography>
                <Button sx={{ width: '140px', height: '40px', mr: 3 }} color='success' onClick={CreateTeacher}>
                  + ADD Teacher
                </Button>
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
                  options={firstName_lastName} style={{ color: "#100d0d", border: '1px solid #121010' }}
                />
              </Grid>
            </Grid>
            <Table isSelectTable columnOptions={columnOptions} dataSource={datalist.map((e, index) => {
              return {
                ...e,
                countID: index + 1,
                delitem: <>
                  <Button sx={{ mr: 1 }} color='success' onClick={() => {
                    viewDetailUser(e)
                  }}>View</Button>
                  <Button sx={{ mr: 0 }} color='error' onClick={() => {
                    delItem(e)
                  }}>Delete</Button>
                </>
              }
            })} defaultRowsPerPage={10} />


          </div>
        </div>
      </div>
    </div>

  )
}

export default Teacher


