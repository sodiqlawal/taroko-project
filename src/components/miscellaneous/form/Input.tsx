import capitalize from "@/utils/capitalize";
import classNames from "classnames";
import { ErrorMessage, Field, useField } from "formik";
import styles from "./form.module.scss";

type MyFieldProps = React.InputHTMLAttributes<any> & {
    name: string;
    is_error?: boolean;
    label?: string;
    error_msg?: string;
};

export const MyErrorMessage: React.FC<{ name: string; error_msg?: string }> = (
    props
) =>
(
    <ErrorMessage name={props.name}>
        {(msg) => (
            <div className={styles.text_error}>
                {capitalize(msg).replace(/_/g, " ")}
            </div>
        )}
    </ErrorMessage>
);


export const MyField = ({ className, ...props }: MyFieldProps) => {
    const [input, meta] = useField<any>(props.name);

    const isError = (meta.error && meta.touched) || props.is_error;

    return (
        <div className={classNames(styles.input_cover, className)}>
            {props.label ? (
                <label htmlFor={props.id} className={styles.label}>
                    {props.label}
                </label>
            ) : null}

            <Field
                {...props}
                {...input}
                value={input.value ?? ""}
                className={classNames(styles.input, {
                    [styles.input_error]: isError
                })}
            />

            {isError ? (
                <MyErrorMessage name={props.name} error_msg={props?.error_msg} />
            ) : null}
        </div>
    );
};
