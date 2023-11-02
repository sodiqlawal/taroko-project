import ContactList from "@/components/contact-list"
import styles from "./page.module.scss"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Contacts</h1>
      <ContactList />
    </main>
  )
}
