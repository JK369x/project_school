import { FC } from "react";
// import { useTranslation } from "react-i18next";

// store
import { useAppSelector, useAppDispatch } from "../../../store/useHooksStore";
import { closeDialog } from "../../../store/slices/dialogSlice";

// mui & control
import {
    Dialog as MuiDialog,
    Card,
    Grid,
    Typography,
    Divider,
    useTheme,
} from "@mui/material";
import { Button } from "../index";

export const Dialog: FC = () => {
    // const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        open,
        textHeader,
        textContent,
        closeButton,
        confirmButton,
        cancelButton,
    } = useAppSelector(({ dialog }) => dialog);
    const {
        palette: {
            background: { paper: shadowColor },
        },
    } = useTheme();
    return (
        <MuiDialog open={open}>
            <Card>
                <Grid container item sx={{ px: 2, py: 2, maxWidth: "480px" }}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{textHeader}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider
                            sx={{
                                my: 1,
                                boxShadow: `0px 2px 2px 0px ${shadowColor} !important`,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">{textContent}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider
                            sx={{
                                my: 2,
                                boxShadow: `0px 2px 2px 0px ${shadowColor} !important`,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent={"right"} spacing={1}>
                            {closeButton ? (
                                <Grid item>
                                    <Button
                                        varaint="outlined"
                                        label={"close"}
                                        onClick={() => {
                                            dispatch(
                                                closeDialog({ state: "close" })
                                            );
                                        }}
                                    />
                                </Grid>
                            ) : null}
                            {cancelButton ? (
                                <Grid item>
                                    <Button
                                        error
                                        label={"cancel"}
                                        onClick={() => {
                                            dispatch(
                                                closeDialog({ state: "cancel" })
                                            );
                                        }}
                                    />
                                </Grid>
                            ) : null}
                            {confirmButton ? (
                                <Grid item>
                                    <Button
                                        primary
                                        label={"confirm"}
                                        onClick={() => {
                                            dispatch(
                                                closeDialog({
                                                    state: "confirm",
                                                })
                                            );
                                        }}
                                    />
                                </Grid>
                            ) : null}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </MuiDialog>
    );
};
