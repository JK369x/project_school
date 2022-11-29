import { FC, ChangeEvent } from "react";
import {
    Grid,
    Radio as MuiRadio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormHelperText,
} from "@mui/material";
import { ControllerRadio } from "./Controller";
import { Typography } from "@mui/material";

export { ControllerRadio };

interface OptionType {
    id: string | number;
    label: string;
}
export interface RadioProps {
    label?: string;
    name?: string;
    value?: string;
    options: OptionType[];
    size?: "small" | "medium";
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    errorType?: string;
    textError?: string;
    vertical?: true;
    disabled?: boolean;
}

export const Radio: FC<RadioProps> = ({
    label,
    name,
    value,
    options,
    size,
    onChange,
    onBlur,
    errorType,
    textError,
    vertical,
    disabled = false,
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event);
        if (onBlur) onBlur();
    };

    return (
        <FormControl component="fieldset">
            {label ? (
                <FormLabel>
                    <Typography variant="subtitle2">{label}</Typography>
                </FormLabel>
            ) : null}
            <RadioGroup
                row
                aria-label="position"
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
            >
                {options.map((item) =>
                    vertical ? (
                        <Grid container key={item.id} sx={{ pb: 0.5 }}>
                            <FormControlLabel
                                key={item.id}
                                value={item.id}
                                disabled={disabled}
                                control={
                                    <MuiRadio color="primary" size={size} />
                                }
                                label={item.label}
                            />
                        </Grid>
                    ) : (
                        <FormControlLabel
                            key={item.id}
                            value={item.id}
                            disabled={disabled}
                            control={<MuiRadio color="primary" size={size} />}
                            label={item.label}
                        />
                    )
                )}
            </RadioGroup>
            <FormHelperText>
                {errorType === "required" ? textError : ""}
            </FormHelperText>
        </FormControl>
    );
};
