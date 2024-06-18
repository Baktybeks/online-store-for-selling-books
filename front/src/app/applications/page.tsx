'use client'

import React, {useEffect, useState} from 'react';
import styles from "@/app/styles/admin/Admin.module.scss";

interface Props {
    processed: boolean;
    approved: boolean;
}


const PageApplications = () => {
    const [applications, setApplications] = useState<any>([]);

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


    const handleSubmit = async (index: string, type: 'processed' | 'approved') => {
        try {
            const updatedApplications = applications.map((app: any) => {
                if (app.id === index) {
                    return { ...app, processed: type === 'processed', approved: type === 'approved' };
                }
                return app;
            });
            setApplications(updatedApplications);

            const formData = new FormData();
            formData.append('processed', (type === 'processed').toString());
            formData.append('approved', (type === 'approved').toString());

            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className={styles.wrapperAdmin}>
            <h1 className={styles.nameAdmin}>Заявки пользователей</h1>
            <ul className={styles.blockList}>
                {applications.map((elemAp: any) => (
                    <li key={elemAp.id} className={styles.infoList}>
                        <div className={styles.blockInfo}>
                            <h2 className={styles.name}>{elemAp.name}</h2>
                            <p className={styles.email}>тел: {elemAp.phone}</p>
                            <div className={styles.checboxInfo}>
                                            <ul>
                                                <img src={`http://localhost:5000/${elemAp.Book.Genre.cover_image}`} alt='img' className={styles.imgesBooks} />
                                                <li className={styles.product}>Товар: {elemAp.Book.title}</li>
                                                <li className={styles.product}>Автор: {elemAp.Book.author}</li>
                                                <li className={styles.summa}>Сумма: {elemAp.Book.price} сом</li>
                                                <li className={styles.product}>Оплата через: {elemAp.paymentMethod}</li>
                                                {elemAp.delivery ? <li className={styles.product}>Адрес доставки: {elemAp.address}</li> : ''}
                                            </ul>

                                <div className={styles.checboxBlock}>
                                    <input
                                        type='radio'
                                        name={`status-${elemAp.id}`}
                                        checked={elemAp.processed}
                                        onChange={() => handleSubmit(elemAp.id, 'processed')}
                                        className={styles.checkbox}
                                    />
                                    <p className={styles.textInput}>
                                        Подтверждение заявки
                                    </p>
                                </div>
                                <div className={styles.checboxBlock}>
                                    <input
                                        type='radio'
                                        name={`status-${elemAp.id}`}
                                        checked={elemAp.approved}
                                        onChange={() => handleSubmit(elemAp.id, 'approved')}
                                        className={styles.checkbox}
                                    />
                                    <p className={styles.textInput}>
                                        Отклонение заявки
                                    </p>
                                </div>
                            </div>
                            <button className={styles.delete} onClick={() => handleDelete(elemAp.id)}>Удалить</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageApplications;