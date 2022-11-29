import { FC } from "react";

// mui & control
import { Typography, FormControl, FormLabel } from "@mui/material";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { ControllerTextField } from "./Controller";

export { ControllerTextField };

export const TextField: FC<TextFieldProps> = (props) => {
    return (
        <FormControl fullWidth={props.fullWidth}>
            {props.label ? (
                <FormLabel sx={{ mb: 0.5 }}>
                    <Typography variant="subtitle2">{props.label}</Typography>
                </FormLabel>
            ) : null}
            <MuiTextField {...props} label="" sx={{ ...props.sx, mt: -0.2 }} />
        </FormControl>
    );
};
