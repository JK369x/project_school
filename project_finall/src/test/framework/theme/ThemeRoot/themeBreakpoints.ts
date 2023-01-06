import { BreakpointsOptions } from "@mui/material";
declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        // xs: false // removes the `xs` breakpoint
        // sm: false
        // md: false
        // lg: false
        // xl: false
    }
}

const themeBreakpoints: BreakpointsOptions = {
    values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
};

export default themeBreakpoints;
