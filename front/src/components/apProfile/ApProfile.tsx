'use client'

import React, {useEffect, useState} from 'react';
import styles from './ApProfile.module.scss'
import {useSession} from "next-auth/react";


const ApProfile = () => {
    const [applications, setApplications] = useState<any>([]);
    // const [sum, setSum] = useState(0);
    const session = useSession();

    console.log(applications)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:5000/api/application/');
            if (!res.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const applicationsData = await res.json();
            setApplications(applicationsData);
        };

        fetchData();
    }, []);

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setApplications((prevApplications: any) => prevApplications.filter((app: any) => app.id !== index));
                console.log('Объект удален');
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const totalSum = applications.reduce((acc: number, elem: any) => acc + Number(elem.Book.price), 0);
    return (
        <div>
            {session?.data &&
                <div className={styles.hello}>
                    <ul className={styles.user}>
                        <li>Здравствуйте {session.data?.user?.name} у вас</li>
                        <li className={styles.wait}>В обработке = {applications.filter((elem: any) => elem.name === session.data?.user?.name && !elem.approved && !elem.processed).length}</li>
                        <li className={styles.ok}>Принятые = {applications.filter((elem: any) => elem.name === session.data?.user?.name && elem.processed).length}</li>
                        <li className={styles.not}>Отказанные = {applications.filter((elem: any) => elem.name === session.data?.user?.name && elem.approved).length}</li>
                        <li >Общая сумма = {totalSum} сом</li>
                    </ul>
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

                                        <div>
                                            <img src={`http://localhost:5000/${elem.Book.Genre.cover_image}`} alt='tower'
                                                 className={styles.imgesBooks}/>
                                            <li className={styles.nameBook}>{elem.Book.title}</li>
                                            <li className={styles.renovationBook}>{elem.Book.author}</li>
                                            <li className={styles.prise}>Сумма: <span className={styles.num}>{elem.Book.price}</span> сом</li>
                                            <button className={styles.delete} onClick={() => handleDelete(elem.id)}>Удалить</button>
                                        </div>
                                    </ul>
                                );
                            })
                    }</div>
            }
        </div>
    );
};

export default ApProfile;