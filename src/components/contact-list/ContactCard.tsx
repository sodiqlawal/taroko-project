"use client"
import { TOAST_OPTION } from "@/constant";
import useModal from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { deleteContact } from "@/lib/api/contact";
import { Contact } from "@/models/contact";
import { isAxiosError } from "axios";
import Link from "next/link";
import { FC, useState } from "react";
import { FaUser } from "react-icons/fa"
import Button from "../miscellaneous/form/Button";
import Modal from "../modals";
import styles from "./contact-list.module.scss";

const ContactCard: FC<{ contact: Contact; refetch:() => void }> = ({ contact, refetch }) => {
    const deleteModal = useModal();
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);

    const deleteAction = async () => {
        setLoading(true);
        try {
            await deleteContact(contact.id || "");

            toast({
                type: TOAST_OPTION.SUCCESS,
                message: "Contact deleted successfully"
            })

            // refetch all contacts 
            refetch();

            setLoading(false);

            deleteModal.close();

        } catch (error) {
            let message = isAxiosError(error) ? error.response?.data?.message || "" : error
            toast({
                type: TOAST_OPTION.ERROR,
                message
            })
            setLoading(false)
        }
    }

    if (!contact) return null;
    return (
        <div className={styles.card}>

            <div className={styles.top}>
                <div>
                    <div className={styles.user}>
                        <FaUser size={30} />
                        <p>{`${contact.first_name} ${contact.last_name}`}</p>
                    </div>

                    <p className={styles.job}><b>Job:</b> {contact.job}</p>

                </div>

                <div className={styles.cta}>
                    <Link href={`/${contact.id}/edit-contact`}>
                        <Button content="Edit" className={styles.button} simple />
                    </Link>
                    <Button content="Delete" onClick={deleteModal.open} />
                </div>

            </div>


            <p className={styles.desc}><b>Description:</b> {contact.description}</p>

            {/* this modal is triggered when we click on delete card button */}
            <Modal controller={deleteModal} title="Delete Card">
                <p className={styles.delete_desc}>Are you sure you want to delete this card ?</p>
                <div className={styles.button_cover}>
                    <Button content="No" isMedium isDanger onClick={deleteModal.close} growth />
                    <Button content="Yes" isMedium isPrimary growth onClick={deleteAction} loading={loading} disabled={loading} />
                </div>
            </Modal>

        </div>
    )
}

export default ContactCard;