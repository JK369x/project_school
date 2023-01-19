import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'



// console.log('auto slosgissdsadsssssadsasssaaasssaa aasssassuth me ')
// const url = `${import.meta.env.VITE_REACT_APP_API}auth/me`
// axios.defaults.withCredentials = true
// await axios.get(url)



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>




)

