"use client"
import ContactForm from "@/components/contact-form/ContactForm";
import { TOAST_OPTION } from "@/constant";
import { useToast } from "@/hooks/useToast";
import { getContact } from "@/lib/api/contact";
import { Contact } from "@/models/contact";
import { isAxiosError } from "axios";
import { FC, useCallback, useEffect, useState } from "react";

interface PageProps {
    params: {
        id: string;
    };
}

const EditContact: FC<PageProps> = ({ params }) => {
    const { toast } = useToast();
    const [contact, setContact] = useState<Contact | null>(null);

    const fetchContact = useCallback(async () => {
        try {
            const result = await getContact(params.id);
            setContact(result!);

        } catch (error) {
            let message = isAxiosError(error) ? (error.response?.data?.message || "") : error
            toast({
                type: TOAST_OPTION.ERROR,
                message
            })

        }
    }, [params.id])

    useEffect(() => {
        fetchContact()
    }, [fetchContact]);

    return (
        <div>
            <ContactForm isEditing payload={contact!} />
        </div>
    )
}

export default EditContact;