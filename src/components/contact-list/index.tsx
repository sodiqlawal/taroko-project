import styles from "./contact-list.module.scss";
import ContactCard from "./ContactCard";

const Contacts = () => {
    return (
        <div className={styles.list}>
            {
                [1,2,3,4].map((el) => (
                    <ContactCard key={el} />
                ))
            }
        </div>
    )
}

export default Contacts;