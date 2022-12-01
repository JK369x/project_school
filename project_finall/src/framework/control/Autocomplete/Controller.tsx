import { FC, useState, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { AutocompleteProps } from "./Autocomplete";
import { Autocomplete as MuiAutocomplete } from "@mui/material";
import { TextField } from "../TextField/TextField";

export type ControllerAutocompleteProps = {
    formprop: UseFormReturn<any,any>;
    name: string;
} & AutocompleteProps;

export const ControllerAutocomplete: FC<ControllerAutocompleteProps> = (
    props
) => {
    const { formprop, name } = props;
    const { getValues, control } = formprop;
    const [options, setOptions] = useState(props.options);

    useEffect(() => {
        setOptions(props.options);
    }, [props.options]);

    const autoNewOption = (data: any) => {
        if (props.options.filter((e) => e.label === data).length > 0) return;
        setOptions([...props.options, { id: data, label: data }]);
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={getValues("name")}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                    <MuiAutocomplete
                        {...props}
                        value={value}
                        options={options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={props.label}
                                helperText={error?.message}
                                error={error?.message ? true : false}
                            />
                        )}
                        onChange={(_, data) => {
                            onChange(data);
                            return data;
                        }}
                        onInputChange={(_, data) => {
                            autoNewOption(data);
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.label === value.label
                        }
                    />
                );
            }}
        />
    );
};
