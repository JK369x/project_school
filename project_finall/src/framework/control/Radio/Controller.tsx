import { FC, ChangeEvent } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Radio, RadioProps } from "./Radio";

type ControllerRadioProps = {
    formprop: UseFormReturn<any, any>;
    name: string;
} & RadioProps;
export const ControllerRadio: FC<ControllerRadioProps> = (props) => {
    const {
        formprop: { control, getValues },
        name,
        onChange: onChangeProps,
        onBlur: onBlurProps,
        options,
        size,
        vertical,
    } = props;

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={getValues()[name]}
                render={({
                    field: {
                        onChange,
                        value: controllerValue,
                        name: nameValue,
                    },
                    fieldState: { error },
                }) => (
                    <Radio
                        {...props}
                        name={nameValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            onChange(event);
                            onChangeProps && onChangeProps(event);
                        }}
                        onBlur={onBlurProps}
                        options={options}
                        value={controllerValue}
                        size={size}
                        errorType={error?.type ?? ""}
                        textError={error?.message ?? ""}
                        vertical={vertical}
                    />
                )}
            />
        </>
    );
};
