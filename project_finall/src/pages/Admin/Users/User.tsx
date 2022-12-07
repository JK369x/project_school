import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import './User.scss'
import Table from '../../../framework/control/Table/Table'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'

const User = () => {
  const data = [{ test1: '...tesasdasdt1', test2: 'test2' },{ test1: '...test1', test2: 'test2' }]
  const columnOptions: TableColumnOptions[] = [
    {
      label: 'ID',
      value: 'test1',
    },
    {
      label: 'User',
      value: 'test1',
    },
    {
      label: 'Email',
      value: 'test1',
    },
    {
      label: 'Status',
      value: 'test1',
    },
    {
      label: 'Action',
      value: 'test1',
    },

  ]

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
              <Grid item xs={12}>
                <Table columnOptions={columnOptions} dataSource={data} defaultRowsPerPage={10} />
              </Grid>
            </Grid>
          </div>

        </div>
      </div>
    </div>

  )
}

export default User