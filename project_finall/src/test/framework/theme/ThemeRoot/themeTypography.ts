import { TypographyOptions } from "@mui/material/styles/createTypography";

const themeTypography: TypographyOptions = {
    fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
    h1: {
        fontSize: 42,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    h2: {
        fontSize: 36,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    h3: {
        fontSize: 30,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    h4: {
        fontSize: 28,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    h5: {
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    h6: {
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    subtitle1: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    subtitle2: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    body1: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    body2: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.6,
    },
};

export default themeTypography;
