"use client"
import useModal from "@/hooks/useModal";
import Link from "next/link";
import { FaUser } from "react-icons/fa"
import Button from "../miscellaneous/form/Button";
import Modal from "../modals";
import styles from "./contact-list.module.scss";

const ContactCard = () => {
    const deleteModal = useModal();

    return (
        <div className={styles.card}>

            <div className={styles.top}>
                <div>
                    <div className={styles.user}>
                        <FaUser size={30} />
                        <p>John Doe</p>
                    </div>

                    <p className={styles.job}><b>Job:</b> Designer</p>

                </div>

                <div className={styles.cta}>
                    <Link href={"/1/edit-contact"}>
                        <Button content="Edit" className={styles.button} simple />
                    </Link>
                    <Button content="Delete" onClick={deleteModal.open} />
                </div>

            </div>


            <p className={styles.desc}><b>Description:</b> Talented with CSS animations</p>

            <Modal controller={deleteModal} title="Delete Card">
                <p className={styles.delete_desc}>Are you sure you want to delete this card ?</p>
                <div className={styles.button_cover}>
                    <Button content="No" isMedium isDanger onClick={deleteModal.close} growth />
                    <Button content="Yes" isMedium isPrimary growth />
                </div>
            </Modal>

        </div>
    )
}

export default ContactCard;