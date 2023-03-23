import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import '../Dashboard/Dashboard.scss'
import { UploadButton } from '../../../framework/control'
import { useUploadFile } from '../../../file/useUploadFile'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'
import { useForm } from 'react-hook-form'
import { Button, Grid, Typography } from '@mui/material'
import imagebg from '../../../assets/logo-rmutt/Slide1.jpeg'
import { useEffect, useState } from 'react'
import { useUploadFile1 } from '../../../file/useUploadFile1'
import { useUploadImage } from './useUploadImage'
import { usePutDefaultBanner } from './usePutDefaultBanner'
import { useGetBanner } from './useGetBanner'
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertSuccess } from '../../../store/slices/alertSlice'
const Banner = () => {
    const { displayName, uid, photoURL, favorite, about } = useAppSelector(({ auth }) => auth)
    const { banner, uploadBanner } = useGetBanner()
    const { uploadFile, uploadState } = useUploadFile()
    const { uploadFile1, uploadState1 } = useUploadFile1()
    const { uploadBannerAPI } = useUploadImage()
    const { setDefaultBannerAPI } = usePutDefaultBanner()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [urlfile, setUrlFile] = useState('');

    const dispatch = useAppDispatch()
    const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
    const [urlfile1, setUrlFile1] = useState('');


    useEffect(() => {
        if (selectedFile != null) {
            const imageUrl = URL.createObjectURL(selectedFile!);
            setUrlFile(imageUrl)
            setValue('banner1', uploadState.downloadURL)

        }
    }, [selectedFile, uploadState.downloadURL])

    useEffect(() => {
        if (selectedFile1 != null) {
            const imageUrl = URL.createObjectURL(selectedFile1!);
            setUrlFile1(imageUrl)
            console.log('banner2')
            setValue('banner2', uploadState1.downloadURL)
        }
    }, [selectedFile1, uploadState1.downloadURL])

    const onUploadImage = async (files: FileList | null) => {
        if (files) {
            try {
                dispatch(isShowLoading())
                const file = files[0]
                await uploadFile(files[0], `myImages/banner1/${uid}/${new Date}`)
                const img = new Image();
                setSelectedFile(file)
            } catch (err) {
                console.log("🚀 ~ file: Banner.tsx:57 ~ onUploadImage ~ err:", err)
            } finally {
                dispatch(isCloseLoading())
            }
            // img.onload = () => {
            //     if (img.height >= 1500) { // check if image height is at least 1500 pixels
            //     } else {
            //         alert('The image you selected is too small. Please select an image that is at least 1500 pixels tall.');
            //     }
            // };
        }
    };
    const onUploadImage1 = async (files: FileList | null) => {
        if (files) {
            const file = files[0]
            await uploadFile1(files[0], `myImages/banner2/${uid}/${new Date}`)
            const img = new Image();
            setSelectedFile1(file)
            // img.onload = () => {
            //     if (img.height >= 1500) { // check if image height is at least 1500 pixels
            //     } else {
            //         alert('The image you selected is too small. Please select an image that is at least 1500 pixels tall.');
            //     }
            // };
        }
    }
    const statusAPI = banner[0]?.default_banner
    const image_banner1 = banner[0]?.banner1
    const image_banner2 = banner[0]?.banner2
    const connvertAPI = statusAPI === 'true' ? true : false
    const [defaultBanner, setDefaultBanner] = useState(connvertAPI)
    console.log("🚀 ~ file: Banner.tsx:87 ~ Banner ~ defaultBanner:", defaultBanner)

    useEffect(() => {
        setDefaultBanner(connvertAPI)
    }, [banner[0]?.default_banner])
    const setBannerStatus = async () => {
        setDefaultBanner(!defaultBanner)
        await setDefaultBannerAPI(!defaultBanner)
        await uploadBanner()
    }



    const myForm = useForm()
    const { getValues, setValue, handleSubmit } = myForm
    const onSubmit = async () => {
        if (getValues()) {
            try {
                await uploadBannerAPI(getValues())
                console.log("🚀 ~ file: Banner.tsx:72 ~ onSubmit ~ getValues", getValues())
                dispatch(openAlertSuccess('อัพโหลดข่าวสาร'))
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className='home' >
            <Sidebar />
            <div className="homeContainer">
                <Navbar />

                <div className="listContainer">
                    <div className="listTitle">
                        <Typography variant="h1"  >
                            Banner
                        </Typography>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container justifyContent={'center'} alignItems={'center'}>
                            <Grid container justifyContent={'center'} item xs={6}>
                                <Grid item >
                                    <Typography variant="h1" sx={{ mt: 3 }}>
                                        Banner1
                                    </Typography>
                                    <Typography variant="body1" >
                                        Select an image that is at least 1500 pixels tall
                                    </Typography>
                                    {defaultBanner === false ? (<>
                                        <img src={image_banner1 ? image_banner1 : urlfile} alt="" width={500} height={500} />
                                    </>) : (<>
                                        <img src={urlfile === '' ? imagebg : urlfile} alt="" width={500} height={500} />

                                    </>)}
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                                    {uploadState.status !== 'none' ? `${uploadState.progress}%` : uploadState.fileName}
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12} mt={2}>
                                    <UploadButton label={'Upload'} onUploadChange={onUploadImage} />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={6}>
                                <Grid item >

                                    <Typography variant="h1" sx={{ mt: 3 }}>
                                        Banner2
                                    </Typography>
                                    <Typography variant="body1" >
                                        Select an image that is at least 1500 pixels tall
                                    </Typography>
                                    {defaultBanner === false ? (<>
                                        <img src={image_banner2 ? image_banner2 : urlfile} alt="" width={500} height={500} />
                                    </>) : (<>
                                        <img src={urlfile === '' ? imagebg : urlfile} alt="" width={500} height={500} />

                                    </>)}
                                </Grid>
                                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                                    {uploadState.status !== 'none' ? `${uploadState.progress}%` : uploadState.fileName}
                                </Grid>
                                <Grid container justifyContent={'center'} item xs={12} mt={2}>
                                    <UploadButton label={'Upload'} onUploadChange={onUploadImage1} />
                                </Grid>
                            </Grid>
                            {defaultBanner === true ? <>
                                <Button color='primary' onClick={setBannerStatus} sx={{ mt: 2, mr: 2 }}>Set Default on</Button>

                            </> : <>
                                <Button color='warning' onClick={setBannerStatus} sx={{ mt: 2, mr: 2 }}>Set Default off</Button>
                            </>}
                            <Button type='submit' sx={{ mt: 2 }}>Submit</Button>
                        </Grid>

                    </form>
                </div>
            </div>
        </div >

    )
}
export default Banner
