import { createTheme } from "@mui/material";
import ThemeRoot from "../ThemeRoot";

const ThemeLight = createTheme({
    ...ThemeRoot,
    palette: {
        mode: "light",
        primary: {
            main: "#a436f1",
            light: "#f9b",
            dark: "#8c37f1",
        },
        secondary: {
            main: "#2df",
        },
        text: {
            primary: "#555",
            secondary: "#666",
        },
    },
});

export default ThemeLight;
