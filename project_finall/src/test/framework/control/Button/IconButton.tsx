import React, { FC } from "react";

// mui & control
import { Tooltip } from "@mui/material";
import MaterialButton, { ButtonProps } from "@mui/material/Button";
import MuiIconButton, { IconButtonProps } from "@mui/material/IconButton";

export type ControlIconButtonProps = {
    label?: string;
    primary?: true;
    secondary?: true;
    info?: true;
    success?: true;
    warning?: true;
    error?: true;
    fullWidth?: true;
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    custom?: ButtonProps;
    letterSpacing?: string | number;
    varaint?: "text" | "outlined" | "contained";
    icon: JSX.Element;
    textHover?: string;
} & IconButtonProps;
export const IconButton: FC<ControlIconButtonProps> = ({
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    onClick,
    custom,
    letterSpacing,
    icon,
    textHover,
}) => {
    const typeColor = primary
        ? "primary"
        : secondary
        ? "secondary"
        : info
        ? "info"
        : success
        ? "success"
        : warning
        ? "warning"
        : error
        ? "error"
        : undefined;
    return (
        <Tooltip title={textHover ?? ""}>
            <MuiIconButton {...custom} color={typeColor} onClick={onClick}>
                {icon}
            </MuiIconButton>
        </Tooltip>
    );
};

export default IconButton;
