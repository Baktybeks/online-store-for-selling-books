'use client'

import React, {useState} from 'react';
import TheBooks from "@/components/theBooks/TheBooks";
import TheAddAplication from "@/components/theAddAplication/TheAddAplication";

import styles from '../styles/allBook/AllBook.module.scss'
import classNames from "classnames";

const Page = () => {
    const [active, setActive] = useState(false);
    return (
        <>
            <div className={classNames(styles.shadow, {[styles.shadowNot]: !active})} onClick={() => setActive(!active)}></div>
            <div className={classNames(styles.application, {[styles.applicationNot]: !active})}>
                <TheAddAplication onActive={setActive} active={active}/>
            </div>
            <div className={styles.blockBooks}>
                <div className={styles.blockHeader}>
                    <h2 className={styles.nameHeader}>Все книги</h2>
                </div>
                <div>
                    <TheBooks onActive={setActive} active={active}/>
                </div>
            </div>
        </>
    );
};

export default Page;