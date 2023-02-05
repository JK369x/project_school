import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function QuestionCard(props: any) {
    const { newdata = {}, questionNumber, submitAnswer } = props;
    const [value, setValue] = React.useState(null);

    const handleChangeRadio = (e: any) => {
        setValue(e.target.value);
    }

    const handleSubmit = () => {
        submitAnswer(value);
        setValue(null);
    }

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>

                    <Typography variant="h2" component="div">
                        Question {questionNumber}
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 1.5 }} color="text.secondary">
                        {newdata.question}
                    </Typography>

                    <FormControl>
                        <RadioGroup name="radio-group-quiz" value={value} onChange={handleChangeRadio}>
                            {Array(newdata)?.map((o: any, i: any) => {
                                return (<React.Fragment >
                                    <FormControlLabel name={`A.${i}`} value={"A"} control={<Radio />} label={o.A} />
                                    <FormControlLabel name={`B.${i}`} value={"B"} control={<Radio />} label={o.B} />
                                    <FormControlLabel name={`C.${i}`} value={"C"} control={<Radio />} label={o.C} />
                                    <FormControlLabel name={`D.${i}`} value={"D"} control={<Radio />} label={o.D} />
                                </React.Fragment>)
                            })}
                        </RadioGroup>
                    </FormControl>


                </CardContent>
                <CardActions>
                    <Button disabled={!value} onClick={handleSubmit} fullWidth variant="outlined" size="small">Submit</Button>
                </CardActions>
            </Card>
        </Box>
    );
}