import { FC } from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";

const Checkbox: FC = () => {
    return (
        <FormControlLabel
            control={<MuiCheckbox defaultChecked />}
            label="Label"
        />
    );
};
