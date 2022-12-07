import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import './Dashboard.scss'

const  Dashboard= () => {
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
           Dashboard 
          </div>
          {/* <Table/> */}
        </div>
      </div> 
    </div>

  )
}

export default Dashboard