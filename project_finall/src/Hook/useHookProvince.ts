import React from 'react'

import axios from 'axios'
import { useEffect, useState } from 'react'




export const useHookProvince = () => {
    const [data, setData] = useState<any[]>([]);

 
        useEffect(() => {
            getDataProvince()
        }, [])

    
    const getDataProvince = async () => {
        
        await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json')
            .then(res => {
                setData(res.data)
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
    }
    return {data,setData}
}