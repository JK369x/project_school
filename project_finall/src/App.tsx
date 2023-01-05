import { ThemeProvider, CssBaseline } from "@mui/material";
import ThemeLight from "./framework/theme/ThemeLight";
import ThemeDark from "./framework/theme/ThemeDark";
import Alert from "./framework/control/Alert/Alert";
import { Dialog } from "./framework/control/Dialog/Dialog";
import Loading from "./framework/control/Loading/Loading";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RouteAllPage from "./routes/routes";

type Props = {};

export default function App({ }: Props) {
  return (
    <ThemeProvider theme={ThemeLight}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <Dialog />
        <Loading />
        <Alert />
        <RouteAllPage />
      </LocalizationProvider>
    </ThemeProvider>

  );
}