"use client";

import { useRouter } from "next/navigation";
import { Form, Formik, FormikHelpers } from "formik";
import styles from "./contact-form.module.scss";
import { FC, useEffect, useState } from "react";
import { MyField } from "../miscellaneous/form/Input";
import * as yup from "yup";
import Button from "../miscellaneous/form/Button";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { TOAST_OPTION } from "@/constant";
import { useToast } from "@/hooks/useToast";
import { isAxiosError } from "axios";
import { addContact, updateContact } from "@/lib/api/contact";
import { Contact } from "@/models/contact";

export const validationSchema = yup.object({
    first_name: yup.string().required("Enter your first name"),
    last_name: yup.string().required("Enter your last name"),
    job: yup.string().required("Enter your job title"),
    description: yup.string().required("Enter your job description"),
});

type Form = {
    first_name: string;
    last_name: string;
    job: string;
    description: string;
};

const ContactForm: FC<{ payload?: Contact, isEditing?: boolean }> = ({ payload, isEditing }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const [values, setValues] = useState<Form>({
        first_name: "",
        last_name: "",
        job: "",
        description: "",
    });

    useEffect(() => {
        if (!!payload) {
            setValues({
                first_name: payload.first_name,
                last_name: payload.last_name,
                job: payload.job,
                description: payload.description,
            });
        }
    }, [payload]);


    const submit = async (value: Form, helpers:FormikHelpers<Form>) => {
        setLoading(true)
        try {
            if (isEditing) {
                await updateContact(payload?.id || "", value);
            } else {
                await addContact(value);
            }

            
            toast({
                type: TOAST_OPTION.SUCCESS,
                message: `Contact ${isEditing ? "updated" : "added"} successfully`,
            });
            
            helpers.resetForm();
            
            setLoading(false);
            
            router.push("/");
            

        } catch (error) {
            let message = isAxiosError(error) ? error.response?.data?.message || "" : error
            toast({
                type: TOAST_OPTION.ERROR,
                message
            })

            setLoading(false);
        } 
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
                                    name="first_name"
                                    placeholder="John"
                                    label="First Name"
                                    id="first_name"
                                    className={styles.field}
                                />
                                <MyField
                                    name="last_name"
                                    placeholder="Doe"
                                    label="Last Name"
                                    id="last_name"
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
                                    disabled={loading}
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