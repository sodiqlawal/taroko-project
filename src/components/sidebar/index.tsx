import classNames from "classnames";
import type { FC } from "react";
import styles from "./sidebar.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

const SideBar: FC<{ isVisible: boolean; setVisible: (arg: boolean) => void }> = ({ isVisible, setVisible }) => {
    const router = useRouter();

    const goHome = () => {
        setVisible(false)
        router.push("/");
    }

    return (
        <div className={classNames(styles.container, { [styles.visible]: isVisible })}>
            <div className={styles.content}>

                <AiOutlineClose size={25} className={styles.close} onClick={() => setVisible(false)} />

                <p onClick={goHome}>Contact List</p>

            </div>
        </div>
    )
}

export default SideBar;