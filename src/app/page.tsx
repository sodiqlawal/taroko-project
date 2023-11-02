"use client"
import ContactList from "@/components/contact-list"
import SortButton from "@/components/miscellaneous/sort-button/SortButton";
import { useState } from "react";
import styles from "./page.module.scss"

export default function Home() {
  const [sortOrder, setOrder] = useState<"none" | "asc" | "desc">("none");

  return (
    <main className={styles.main}>

      <h1>Contacts</h1>

      <SortButton onSortClick={setOrder} title="Sort by name" />

      <ContactList sortOrder={sortOrder} />

    </main>
  )
}
