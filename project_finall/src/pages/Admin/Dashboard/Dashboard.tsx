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
import { useGetAllJoinCourseCategory } from './useGetallJoinCourseCategory';

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
  const { getJoinCategory } = useGetAllJoinCourseCategory()
  const { userLists } = useGetUserLists()
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


  const counts: { [key: string]: number } = {};
  const counts_new: { [key: string]: number } = {};
  let filteredCounts: any = [];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  months.forEach(month => {
    counts[month] = 0;
  });

  months.forEach(month => {
    counts_new[month] = 0;
  });

  const counts_nww: any = {};
  getJoinCategory.forEach((item: any) => {
    const category_title = item.data.category_title;
    if (!counts_nww[category_title]) {
      counts_nww[category_title] = {};
    }
    months.forEach((month) => {
      counts_nww[category_title][month] = 0;
    });
  });

  // นับจำนวนเดือนแต่ละเดือนในแต่ละหมวดหมู่
  getJoinCategory.forEach((item: any) => {
    const month_new = new Date(item.data.joinDate._seconds * 1000).toDateString().split(' ')[1];
    const category_title = item.data.category_title;
    counts_nww[category_title][month_new] += 1;
  });
  console.table(counts_nww)


  userListss.forEach(date => {
    const month = date.split(' ')[1];
    counts[month] += 1;
    // console.log("🚀month", month)
  });
  const count = Object.entries(counts).map(([month, value]) => {
    return ({ month, value })
  })

  const count_new = Object.entries(counts_new).map(([month, value]) => {
    return ({ month, value })
  })
  console.log('asdasd', counts_nww)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Total and User Join in Course',
      },
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Total User',
        data: count.map((item: any, index: number) => { return item.value }),
        // borderColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      ...Object.keys(counts_nww).map((category_title, index) => {
        return {
          label: category_title,
          data: Object.values(counts_nww[category_title]),
          // borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        }
      })]
  }

  return (
    <div className='home' >
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Dashboard
          </div>

          <Line options={options} data={data} />


        </div>
      </div>
    </div >

  )
}

export default Dashboard