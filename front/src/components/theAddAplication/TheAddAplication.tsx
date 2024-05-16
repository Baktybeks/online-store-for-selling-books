'use client'

import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import styles from './TheAddAplication.module.scss';


interface Props {
    paymentMethod: string;
    delivery: boolean;
    processed: boolean;
}

const TheAddAplication = () => {
    const session = useSession();
    const [newDirection, setNewDirection] = useState<Props>({
        paymentMethod: '',
        delivery: false,
        processed: false,
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewDirection(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('paymentMethod', newDirection.paymentMethod);
            formData.append('delivery', newDirection.delivery.toString());
            formData.append('processed', newDirection.processed.toString());

            const response = await fetch('http://localhost:5000/api/application/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.componentFooter}>
                <form className={styles.headerInput} onSubmit={handleSubmit}>
                    <h2 className={styles.nameFooter}>Оформите покупку</h2>
                    <div className={styles.inputEmail}>
                        <div className={styles.inputForm}>
                            <label>Форма Обучения:</label>
                            <select className={styles.selectForm} name="paymentMethod" value={newDirection.paymentMethod}
                                    onChange={handleChange}>
                                <option className={styles.oprions} value=""></option>
                                <option className={styles.oprions} value="Мбанк">Мбанк</option>
                                <option className={styles.oprions} value="Элкарт">Элкарт</option>
                                <option className={styles.oprions} value="Viza">Viza</option>
                            </select>
                        </div>
                        <div className={styles.checboxInfo}>
                            <input type='checkbox' name='delivery' value={'true'} className={styles.inputText}
                                   onChange={handleChange}/>
                            <p className={styles.textInput}>
                                Доставка
                            </p>
                        </div>
                        <div className={styles.checboxInfo}>
                            <div>
                                <input type='checkbox' name='processed' value={'false'} required
                                       onChange={handleChange} className={styles.checkbox}/>
                            </div>
                            <p className={styles.textInput}>
                                Подтвердить покупку
                            </p>
                        </div>
                    </div>
                    {
                        session?.data ? <button className={styles.submit}>Отправить</button> :
                            <div className={styles.warning}>Для того что бы купить книгу вы должны
                                авторизоваться</div>
                    }
                </form>
            </div>
        </footer>
    )
};

export default TheAddAplication;