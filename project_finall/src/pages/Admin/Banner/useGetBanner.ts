import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios"

interface typeBanner {
    banner1: string
    banner2: string
    id_document: string
    default_banner: any
}

export const useGetBanner = () => {
    const [banner, setBanner] = useState<typeBanner[]>([])
    useEffect(() => {
        uploadBanner()
    }, [])

    const uploadBanner = async () => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}upload/getbanner`
            axios.defaults.withCredentials = true
            const result = await axios.get(url)
            const newdata = result.data
            setBanner(
                newdata.map((item: any) => {
                    return { banner1: item.banner1, banner2: item.banner2, default_banner: item.default_banner }

                }) as typeBanner[]
            )

        } catch (error) {
            console.log(error)
            return false
        }
    }

    return { banner, uploadBanner }
}