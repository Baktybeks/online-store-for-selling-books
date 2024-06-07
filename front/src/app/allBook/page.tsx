import React from 'react';
import TheBooks from "@/components/theBooks/TheBooks";

import styles from '../styles/allBook/AllBook.module.scss'

const Page = () => {

    return (
        <div className={styles.blockBooks}>
            <div className={styles.blockHeader}>
                <h2 className={styles.nameHeader}>Все книги</h2>
            </div>
            <div>
                <TheBooks/>
            </div>
        </div>
    );
};

export default Page;