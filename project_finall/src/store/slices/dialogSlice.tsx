import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FC } from "react";

type DialogStateType = "open" | "clear" | "close" | "cancel" | "confirm";

interface DialogState {
    open: boolean;
    textHeader: string;
    textContent: string;
    componentContent?: FC<any>;
    closeButton?: boolean;
    confirmButton?: boolean;
    cancelButton?: boolean;
    state: DialogStateType;
}

const initialState: DialogState = {
    open: false,
    textHeader: "Default Header Dialog",
    textContent: "Default Dialog Content... Text content dialog ________",
    state: "clear",
};

interface ActionDialog {
    textHeader?: string;
    textContent?: string;
    componentContent?: FC<any>;
    closeButton?: boolean;
    confirmButton?: boolean;
    cancelButton?: boolean;
    state?: DialogStateType;
}

export const DialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        showConfirmDialog(
            state,
            {
                payload: { textHeader, textContent, componentContent },
            }: PayloadAction<ActionDialog>
        ) {
            state.open = true;
            state.textHeader = textHeader ?? "Confirm ?";
            state.textContent = textContent ?? "Confirm ? ? ?";
            state.cancelButton = true;
            state.confirmButton = true;
            state.componentContent = componentContent;
        },
        showErrorDialog(
            state,
            {
                payload: { textHeader, textContent, componentContent },
            }: PayloadAction<ActionDialog>
        ) {
            state.open = true;
            state.textHeader = textHeader ?? "Error !";
            state.textContent = textContent ?? "Error !";
            state.closeButton = true;
            state.componentContent = componentContent;
        },
        closeDialog(
            state,
            { payload: { state: st } }: PayloadAction<ActionDialog>
        ) {
            state.open = false;
            state.state = st ?? "clear";
            state.closeButton = false;
            state.cancelButton = false;
            state.confirmButton = false;
        },
        clearFunctionDialog(state) {
            state.state = "clear";
        },
    },
});

export const {
    closeDialog,
    showConfirmDialog,
    showErrorDialog,
    clearFunctionDialog,
} = DialogSlice.actions;

export default DialogSlice.reducer;
