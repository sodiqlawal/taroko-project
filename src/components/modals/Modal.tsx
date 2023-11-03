import type { FC, PropsWithChildren } from "react";
import { ModalController } from "@/hooks/useModal";
import { GrClose } from "react-icons/gr";
import classNames from "classnames";
import styles from "./modal.module.scss";

const Modal: FC<
    PropsWithChildren<{
        controller: ModalController;
        title?: string;
        className?: string;
    }>
> = ({ controller, children, title, className }) => {
    if (!controller.isOpen) return null;
    return (
        <div className={styles.modal} data-testid="modal">
            <div
                className={classNames(
                    styles.paper,
                    className
                )}
            >
                <div
                    className={styles.close}
                    onClick={controller.close}
                >
                    <GrClose className="text-gray-600" />
                </div>

                <h2>{title}</h2>
                
                <div className={styles.children}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
