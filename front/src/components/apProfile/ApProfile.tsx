'use client'

import React, {useEffect, useState} from 'react';
import styles from './ApProfile.module.scss'
import {useSession} from "next-auth/react";


const ApProfile = () => {
    const [applications, setApplications] = useState<any>([]);
    const [product, setProduct] = useState<any>();
    const session = useSession();

    console.log(applications)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:5000/api/application/');
            const resData = await fetch('http://localhost:5000/api/book/');
            if (!res.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const applicationsData = await res.json();
            const appData = await resData.json();
            setApplications(applicationsData);
            setProduct(appData.rows);
        };

        fetchData();
    }, []);

    return (
        <div>
            {session?.data &&
                <div className={styles.hello}>
                    <div className={styles.user}>Здравствуйте {session.data?.user?.name}</div>
                    {
                        applications
                            .filter((elem: any) => session.data?.user?.name === elem.name)
                            .map((elem: any, index: number) => {
                                return (
                                    <ul key={elem.id} className={styles.list}>
                                        {session.data?.user?.name === elem.name && (
                                            elem.processed === true && elem.approved === false ? (
                                                <li className={styles.ok}>Ваша заявка принята</li>
                                            ) : elem.approved === true && elem.processed === false ? (
                                                <li className={styles.not}>Ваша заявка отклонена</li>
                                            ) : (
                                                <li className={styles.wait}>Ваша заявка в обработке</li>
                                            )
                                        )}
                                        {product.map((elemData: any) => {
                                            if (elemData.id === elem.ProductId) {
                                                return (
                                                    <div key={elemData.id}>
                                                        <img src={`http://localhost:5000/${elemData.cover_image}`} alt='tower' className={styles.imgesBooks} />
                                                        <li className={styles.product}>Товар: {elemData.title}</li>
                                                        <li className={styles.product}>Товар: {elemData.author}</li>
                                                        <li className={styles.summa}>Сумма: <span className={styles.num}>{elemData.price}</span> сом</li>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </ul>
                                );
                            })
                    }</div>
            }
        </div>
    );
};

export default ApProfile;