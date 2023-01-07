import { createTheme } from "@mui/material";
import ThemeRoot from "../ThemeRoot";

const ThemeDark = createTheme({
    ...ThemeRoot,
    palette: {
        mode: "dark",
        primary: {
            main: "#0000FF",
        },
        background: {
            default: "#1e1e1e",
            paper: "#181818",
        },
    },
});

export default ThemeDark;
