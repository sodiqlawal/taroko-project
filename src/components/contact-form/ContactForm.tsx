"use client";

import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import styles from "./contact-form.module.scss";
import { FC, useEffect, useState } from "react";
import { MyField } from "../miscellaneous/form/Input";
import * as yup from "yup";
import Button from "../miscellaneous/form/Button";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { TOAST_OPTION } from "@/constant";
import { useToast } from "@/hooks/useToast";

export const validationSchema = yup.object({
    firstName: yup.string().required("Enter your first name"),
    lastName: yup.string().required("Enter your last name"),
    job: yup.string().required("Enter your job title"),
    description: yup.string().required("Enter your job description"),
});



type Form = {
    firstName: string;
    lastName: string;
    job: string;
    description: string;
};

const ContactForm: FC<{ payload?: Form, isEditing?: boolean }> = ({ payload, isEditing }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {toast} = useToast();

    const [values, setValues] = useState<Form>({
        firstName: "",
        lastName: "",
        job: "",
        description: "",
    });

    useEffect(() => {
        if (!!payload) {
            setValues({
                firstName: payload.firstName,
                lastName: payload.lastName,
                job: payload.job,
                description: payload.description,
            });
        }
    }, [payload]);


    const submit = () => { 
        toast({
            type: TOAST_OPTION.SUCCESS,
            message: "Hello",
        });
    };

    return (
        <main className={styles.container}>

            <HiArrowNarrowLeft
                className={styles.back}
                size={24}
                onClick={() => router.back()}
            />

            <h1>{`${isEditing ? "Update" : "Add"} Contact`}</h1>

            <div>

                <Formik<Form>
                    initialValues={values}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={submit}
                >
                    {() => (
                        <Form className={styles.full}>
                            <div>
                                <MyField
                                    name="firstName"
                                    placeholder="John"
                                    label="First Name"
                                    id="firstName"
                                    className={styles.field}
                                />
                                <MyField
                                    name="lastName"
                                    placeholder="Doe"
                                    label="Last Name"
                                    id="lastName"
                                    className={styles.field}
                                />
                                <MyField
                                    name="job"
                                    placeholder="Designer"
                                    label="Job"
                                    id="job"
                                    className={styles.field}
                                />
                                <MyField
                                    name="description"
                                    placeholder="Talented with CSS animation"
                                    label="Description"
                                    id="description"
                                    className={styles.field}
                                />

                                <Button
                                    content={isEditing ? "Update" : "Add"}
                                    type="submit"
                                    className={styles.button}
                                    loading={loading}
                                    isFull
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}


export default ContactForm;