import { Button, Grid, Typography } from "@mui/material"
import Sidebar from "../../../components/componentsAdmin/sidebar/Side-bar"
import Navbar from "../../../components/componentsAdmin/navbar/Navbar"
import { useGetDetailComment } from "./Hook/useGetDetailComment"
import { ControllerTextField } from "../../../framework/control"
import { useForm } from "react-hook-form"
import { TypeComment } from "./Hook/usePostComment"
import { useUpdateReplyComment } from "./Hook/useUpdateReplyComment"

const ReplyComment = () => {
    const { state, getData } = useGetDetailComment()
    console.log('reply comment', state)
    const { updateReplyComment } = useUpdateReplyComment()
    const myForm = useForm<TypeComment>({

    })
    const { handleSubmit, getValues, setValue, watch } = myForm
    const onSubmit = async () => {
        if (getValues()) {
            await updateReplyComment(getValues())
            getData()
        }

        console.log("🚀 ~ file: ReplyComment.tsx:19 ~ onSubmit ~ getValues", getValues())
    }
    return (<>
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Typography variant="h1" component="h1" ml={3}>
                            Comment Detail
                        </Typography>
                        <Grid container justifyContent={'flex-start'} alignContent={'center'} alignItems={'center'}>
                            <Typography variant="h4" component="h4" ml={3} >
                                Ratting :
                            </Typography>
                            <Typography variant="h4" component="h4" ml={1} color={'primary'}>
                                {state.ratting}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'flex-start'} alignContent={'center'} alignItems={'center'}>
                            <Typography variant="h4" component="h4" ml={3} >
                                Comment :
                            </Typography>
                            <Typography variant="h4" component="h4" ml={1}>
                                {state.comment_user}
                            </Typography>
                        </Grid>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container justifyContent={'flex-start'} alignContent={'center'} alignItems={'center'} sx={{ ml: 3, mt: 1 }}>
                                <ControllerTextField multiline minRows={3} maxRows={6} sx={{ width: 500 }} formprop={myForm} name={"reply"} label={'Reply'} />
                            </Grid>
                            <Button type="submit" sx={{ ml: 3, mt: 1 }} disabled={state.status_reply === 'true' ? true : false} color="success">Reply</Button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ReplyComment