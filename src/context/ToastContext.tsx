"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import type { FC, PropsWithChildren } from "react";
import { TOAST_OPTION } from "@/constant";

interface ToastContextInterface {
    toast: { isOpen: boolean; type: TOAST_OPTION; message: string };
    setToast: Dispatch<
        SetStateAction<{ isOpen: boolean; type: TOAST_OPTION; message: string }>
    >;
}

export interface ToastProp {
    isOpen: boolean;
    type: TOAST_OPTION;
    message: string;
}

const defaultToastContext: ToastContextInterface = {
    toast: { isOpen: false, type: TOAST_OPTION.ERROR, message: "" },
    setToast: () => { },
};

export const ToastContext =
    React.createContext<ToastContextInterface>(defaultToastContext);

const ToastProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [toast, setToast] = useState<ToastProp>({ isOpen: false, type: TOAST_OPTION.ERROR, message: "" });


    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
