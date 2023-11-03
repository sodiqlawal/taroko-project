import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import styles from "./sort-button.module.scss";

type Order = "none" | "asc" | "desc";

const SortButton: FC<{ onSortClick: (arg: Order) => void; title?:string }> = ({ onSortClick, title }) => {
    const [order, setOrder] = useState<Order>("none");

    const handleSortClick = () => {
        if (order === "none") {
            setOrder("asc")
        } else if (order === "asc") {
            setOrder("desc")
        } else if(order === "desc") {
            setOrder("none")
        }
    }

    useEffect(() => {
        onSortClick(order);
    }, [order])

    return (
        <div className={classNames(styles.container, { [styles.active]: order !== "none" })} onClick={handleSortClick} title={title || ""}>
            {order === "desc" ? <FaLongArrowAltUp size={30} /> : <FaLongArrowAltDown size={30} />}
            <div className={styles.right}>
                <p>A</p>
                <p>Z</p>
            </div>
        </div>
    )
}

export default SortButton;