import { FC, useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from '../../store/useHooksStore'
import {
    showConfirmDialog,
    showErrorDialog,
    clearFunctionDialog,
} from "../../store/slices/dialogSlice";

interface StateFunctionsType {
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export const useDialog = () => {
    const dispatch = useAppDispatch();
    const dialogState = useAppSelector(({ dialog }) => dialog.state);
    const [stateFunctions, setStateFunctions] = useState<StateFunctionsType>(
        {}
    );

    useEffect(() => {
        if (dialogState === "close" && stateFunctions.onClose) {
            stateFunctions.onClose();
        }
        if (dialogState === "cancel" && stateFunctions.onCancel) {
            stateFunctions.onCancel();
        }
        if (dialogState === "confirm" && stateFunctions.onConfirm) {
            stateFunctions.onConfirm();
        }
        dispatch(clearFunctionDialog());
        setStateFunctions({});
    }, [dialogState]);

    interface ParamsConfirmDialog {
        textHeader?: string;
        textContent?: string;
        componentContent?: FC<any>;
        closeButton?: boolean;
        onClose?: () => void;
        confirmButton?: boolean;
        onConfirm?: () => void;
        cancelButton?: boolean;
        onCancel?: () => void;
    }
    const openConfirmDialog = ({
        textHeader,
        textContent,
        componentContent,
        closeButton,
        onClose,
        cancelButton,
        onCancel,
        confirmButton,
        onConfirm,
    }: ParamsConfirmDialog) => {
        // dispatch(clearFunctionDialog());
        dispatch(
            showConfirmDialog({
                textHeader,
                textContent,
                componentContent,
                closeButton,
                cancelButton,
                confirmButton,
            })
        );
        setStateFunctions({ onClose, onCancel, onConfirm });
    };

    const openErrorDialog = ({
        textHeader,
        textContent,
        componentContent,
        closeButton,
        onClose,
        cancelButton,
        onCancel,
        confirmButton,
        onConfirm,
    }: ParamsConfirmDialog) => {
        // dispatch(clearFunctionDialog());
        dispatch(
            showErrorDialog({
                textHeader,
                textContent,
                componentContent,
                closeButton,
                cancelButton,
                confirmButton,
            })
        );
        setStateFunctions({ onClose, onCancel, onConfirm });
    };

    return { openConfirmDialog, openErrorDialog };
};
