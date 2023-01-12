import { useGetCourseDetail } from "../Hook/course/useGetCourseDtail"


export const timecourse = () => {
    const { state } = useGetCourseDetail()

    //*start register course
    const Start_Register_Date = new Date(state.start_register?.seconds * 1000).toLocaleDateString();
    const Start_Register_Time = new Date(state.start_register?.seconds * 1000).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    });

    //*end register course
    const End_Register_Date = new Date(state.start_registerEnd?.seconds * 1000).toLocaleDateString();
    const End_Register_Time = new Date(state.start_registerEnd?.seconds * 1000).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    });

    //*start course and End course
    const Start_Course_Time = new Date(state.start_register_time?.seconds * 1000).toLocaleDateString()
    const End_Course_Time = new Date(state.start_register_end?.seconds * 1000).toLocaleDateString()

    //*Course Date
    const Course_Date = Array.from(state.course_date!).map((params: any, index: number) => {
        return (index !== 0 ? ' - ' + params.label : params.label)
    })

    //*Course Time Start and End
    const start_course_learn = new Date(state.start_register_time?.seconds * 1000).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    })
    const start_course_end = new Date(state.start_register_end?.seconds * 1000).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    })
    return {Start_Register_Date,Start_Register_Time,End_Register_Date,End_Register_Time,Start_Course_Time,End_Course_Time,Course_Date,start_course_learn,start_course_end }
}