import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import './Home.scss'
// import Widget from '../../components/widgets/Widget'
// import Featured from '../../components/featured/Featured'
// import  Chart  from '../../components/chart/Chart'
import { Tab } from '@mui/material'
// import Table from '../../components/table/Table'

const  Home= () => {
  return (
    <div className='home'>
      <Sidebar/> 
      <div className="homeContainer"> 
        <Navbar/>
        <div className="widgets">
          {/* <Widget type='user'/>
          <Widget type='order'/>
          <Widget type='earning'/>
          <Widget type='balance'/> */}
        </div>
        <div className="charts">
          {/* <Featured/>
          <Chart/> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Latest Transactions
          </div>
          {/* <Table/> */}
        </div>
      </div> 
    </div>

  )
}

export default Home