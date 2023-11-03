"use client";
import Link from "next/link";
import Button from "../miscellaneous/form/Button";
import { AiOutlineMenu } from "react-icons/ai";
import styles from "./header.module.scss";
import SideBar from "../sidebar/SideBar";
import { useState } from "react";

const Header = () => {
    const [isSideBarVisible, setSideBarVisible] = useState(false);

    const toggle = () => {
        setSideBarVisible(!isSideBarVisible);
    };

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.contact_list}>
                <p>Contact List</p>
            </Link>

            <div onClick={toggle} className={styles.menu}>
                <AiOutlineMenu size={25} />
            </div>

            <Link href="/add-contact">
                <Button content="Add Contact" simple />
            </Link>

            {isSideBarVisible && <SideBar isVisible={isSideBarVisible} setVisible={setSideBarVisible} />}
        </div>
    );
};

export default Header;
