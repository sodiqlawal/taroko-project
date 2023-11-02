"use client"
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import classNames from "classnames";
import capitalize from "@/utils/capitalize";
import { BsExclamationLg } from "react-icons/bs";
import { ToastContext } from "@/context/ToastContext";
import { TOAST_OPTION } from "@/constant";
import styles from "./toast.module.scss";


const Toast = () => {
    const { toast, setToast } = useContext(ToastContext);
    const close = () => {
        setToast({
            isOpen: false,
            message: "",
            type: TOAST_OPTION.SUCCESS,
        });
    };

    if (!toast.isOpen) return null;

    return (
        <div className={styles.toast_container}>
            <div className={styles.toast_cell}>
                <div
                    className={classNames(styles.toast, {
                        [styles.toast_green]: toast.type === TOAST_OPTION.SUCCESS,
                        [styles.toast_error]: toast.type === TOAST_OPTION.ERROR,
                    })}
                >
                    <div className={styles.toast_icon}>
                        {toast.type === TOAST_OPTION.SUCCESS && (
                            <MdDone size={25} />
                        )}
                        {toast.type === TOAST_OPTION.ERROR && (
                            <BsExclamationLg size={25} />
                        )}
                    </div>
                    <div className={styles.toast_content}>
                        <p className={styles.toast_type}>{capitalize(toast.type || "")}</p>
                        <p className={styles.toast_message}>{toast.message}</p>
                    </div>
                    <div className={styles.toast_close} onClick={close}>
                        <AiOutlineClose size={25} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
