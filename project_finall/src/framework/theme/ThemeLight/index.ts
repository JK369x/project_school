import { createTheme } from "@mui/material";
import ThemeRoot from "../ThemeRoot";

const ThemeLight = createTheme({
    ...ThemeRoot,
    palette: {
        mode: "light",
        primary: {
            main: "#f8a",
            light: "#f9b",
            dark: "#f79",
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
