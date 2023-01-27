import { useEffect, useState } from "react";


export const setButtonStatus = () => {
    const [status, setStatus] = useState(false)
    useEffect(() => {

        StatusButton()

    }, [])
    const StatusButton = () => {

        try {
            console.log("🚀 ~ file: statueButton.ts:11 ~ setButtonStatus ~ status", status)

        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)

        }

    }
    return { status, setStatus }
}

