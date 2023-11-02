"use client"
import { TOAST_OPTION } from "@/constant";
import { useToast } from "@/hooks/useToast";
import { getContacts } from "@/lib/api/contact";
import { Contact } from "@/models/contact";
import { isAxiosError } from "axios";
import type { FC } from "react";
import { useEffect, useState } from "react";
import NoData from "../no-data/NoData";
import styles from "./contact-list.module.scss";
import ContactCard from "./ContactCard";

type Order = "none" | "asc" | "desc";

const Contacts: FC<{ sortOrder: Order }> = ({ sortOrder }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);

    // this is the default data, untouchable
    const [data, setData] = useState<Contact[]>([]);

    const [sortedOrders, setSortedOrders] = useState<Contact[]>([])

    const fetchContacts = async () => {
        setLoading(true)
        try {
            const result = await getContacts();
            setData(result!);
            setSortedOrders(result);
            setLoading(false)

        } catch (error) {
            let message = isAxiosError(error) ? error.response?.data?.message || "" : error
            toast({
                type: TOAST_OPTION.ERROR,
                message
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, []);

    useEffect(() => {
        if (sortOrder === "none") {
            setSortedOrders(data)
        } else if (sortOrder === "asc") {
            const newData = [...data];

            setSortedOrders(newData.sort((a, b) => (a.first_name > b.first_name) ? 1 : ((b.first_name > a.first_name) ? -1 : 0)))

        } else if (sortOrder === "desc") {
            const newData = [...data];
            setSortedOrders(newData.sort((a, b) => (a.first_name < b.first_name) ? 1 : ((b.first_name < a.first_name) ? -1 : 0)))

        }
    }, [sortOrder])

    if(!sortedOrders.length && !loading) return <NoData />
    if(!sortedOrders.length && loading) return null
    return (
        <div className={styles.list}>
            {
                sortedOrders.map((contact: Contact) => (
                    <ContactCard key={contact.id} contact={contact} refetch={fetchContacts} />
                ))
            }
        </div>
    )
}

export default Contacts;