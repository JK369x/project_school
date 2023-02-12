import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import './Dashboard.scss'
import Widget from '../../../components/Widgetuser'
import React from 'react';
import moment, { invalid } from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/system';
import { useGetCourseLists } from '../Courses/Hook/useGetCourse';
import { useGetUserLists } from '../Users/Hook/useGetUserLists';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const Dashboard = () => {
  const { CourseLists } = useGetCourseLists()
  const { userLists } = useGetUserLists()
  console.log("🚀 ~ file: Dashboard.tsx:36 ~ Dashboard ~ userLists", userLists)
  const userListss = userLists.map((item: any, index: any) => {
    const y_now = new Date().getFullYear()
    let data_now = new Date(item.createDate?._seconds * 1000).getFullYear()
    if (y_now == data_now) {
      let data = new Date(item.createDate?._seconds * 1000).toDateString()
      return data
    } else {
      console.log('false')
      return ''
    }
  })

  const datenew = CourseLists.map((item: any, index: any) => {
    const y_now = new Date().getFullYear()

    return new Date(item.createDate._seconds * 1000).toDateString()
  })
  console.log("🚀 ~ file: Dashboard.tsx:40 ~ userListss ~ userListss", userListss)
  const counts: { [key: string]: number } = {};
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  months.forEach(month => {
    counts[month] = 0;
  });

  userListss.forEach(date => {
    const month = date.split(' ')[1];
    counts[month] += 1;
  });
  const count = Object.entries(counts).map(([month, value]) => {
    return ({ month, value })
  })



  const options = {
    responsive: true,



    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },

    },
  };
  const data = {
    labels: months,
    datasets: [
      {
        fill: true,
        label: 'Total User',
        data: count.map((item: any, index: number) => { return item.value }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',


      },


    ],
  };
  return (
    <div className='home' >
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Dashboard
          </div>
          <Box>
            <Line options={options} data={data} />;
          </Box>

        </div>
      </div>
    </div >

  )
}

export default Dashboard