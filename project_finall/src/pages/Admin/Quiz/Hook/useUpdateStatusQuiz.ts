import axios from "axios"

export const useUpdateStatusQuiz = () => {
    const updateStatusQuiz = async (id_course: string, id_quiz: string, status: boolean) => {
        console.log("🚀 status", status)
        console.log("🚀id_quiz", id_quiz)
        console.log("🚀id_course", id_course)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/updatequizstatus/${id_course}/${id_quiz}/${status}`
            axios.defaults.withCredentials = true
            await axios.put(url, { status })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateStatusQuiz }
}