import React, { FC } from "react";

// mui & control
import { Typography } from "@mui/material";
import MaterialButton, { ButtonProps } from "@mui/material/Button";

interface ControlButtonProps {
    label?: string;
    primary?: true;
    secondary?: true;
    info?: true;
    warning?: true;
    error?: true;
    fullWidth?: true;
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    custom?: ButtonProps;
    letterSpacing?: string | number;
    varaint?: "text" | "outlined" | "contained";
    //
}
export const Button: FC<ControlButtonProps> = ({
    label,
    primary,
    secondary,
    info,
    warning,
    error,
    fullWidth,
    type,
    onClick,
    custom,
    letterSpacing,
    varaint,
}) => {
    const typeColor = primary
        ? "primary"
        : secondary
        ? "secondary"
        : info
        ? "info"
        : warning
        ? "warning"
        : error
        ? "error"
        : undefined;
    return (
        <MaterialButton
            {...custom}
            color={typeColor}
            fullWidth={fullWidth}
            type={type}
            onClick={onClick}
            variant={varaint}
            sx={{ minHeight: "40px", minWidth: "120px" }}
        >
            <Typography
                fontWeight={600}
                letterSpacing={letterSpacing}
                style={{ textTransform: "none" }}
            >
                {label}
            </Typography>
        </MaterialButton>
    );
};

export default Button;
