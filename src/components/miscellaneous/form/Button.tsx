import classNames from "classnames";
import { FC, ButtonHTMLAttributes } from "react";
import styles from "./form.module.scss";

type ButtonProps = {
    content: string;
    loading?: boolean;
    isFull?: boolean;
    className?: string;
    isDanger?: boolean;
    isPrimary?: boolean;
    isMedium?: boolean;
    growth?: boolean;
    simple?: boolean
}

const Button: FC<
    ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ content, className, loading, isFull, isDanger, isPrimary, isMedium, growth, simple, ...props }) => {
    return (
        <button
            type={props.type || "button"}
            className={classNames(styles.button, className, {
                [styles.full]: isFull,
                [styles.danger]: isDanger,
                [styles.primary]: isPrimary,
                [styles.medium]: isMedium,
                [styles.growth]: growth,
                [styles.simple]: simple,
                [styles.disabled]: props.disabled
            })}
            {...props}
        >
            {loading ? "loading..." : content}
        </button>
    );
};

export default Button;
