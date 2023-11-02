import classNames from "classnames";
import { FC, ButtonHTMLAttributes } from "react";
import styles from "./form.module.scss";

const Button: FC<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        content: string;
        loading?: boolean;
        isFull?: boolean;
        className?: string;
        isDanger?: boolean;
        isPrimary?: boolean;
        isMedium?: boolean;
        growth?: boolean;
        simple?:boolean
    }
> = ({ content, className, loading, isFull, ...props }) => {
    return (
        <button
            type={props.type || "button"}
            className={classNames(styles.button, className, {
                [styles.full]: isFull,
                [styles.danger]: props.isDanger,
                [styles.primary]: props.isPrimary,
                [styles.medium]: props.isMedium,
                [styles.growth]: props.growth,
                [styles.simple]: props.simple,
                [styles.disabled]: props.disabled
            })}
            {...props}
        >
            <span>{loading ? "loading..." : content}</span>
        </button>
    );
};

export default Button;
