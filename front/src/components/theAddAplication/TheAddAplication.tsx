'use client'

import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import styles from './TheAddAplication.module.scss';


interface Props {
    name: string;
    phone: string;
    BookId: string;
    paymentMethod: string;
    address: string;
    delivery: boolean;
    processed: boolean;
}

interface PropsActive {
    onActive: (value: boolean) => void;
    active: boolean;
    BookId: string;
}

const TheAddAplication = ({onActive, active, BookId}: PropsActive) => {
    const session = useSession();
    const [newDirection, setNewDirection] = useState<Props>({
        name: '',
        phone: '',
        BookId: BookId,
        paymentMethod: '',
        address: '',
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

    const handleChangeActive = () => {
        onActive(!active);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newDirection.name);
            formData.append('phone', newDirection.phone);
            formData.append('address', newDirection.address);
            formData.append('BookId', BookId.toString());
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
        <div className={styles.componentApplication}>
                <form className={styles.headerInput} onSubmit={handleSubmit}>
                    <h2 className={styles.nameApplication}>Оформите покупку</h2>
                    <div className={styles.inputsAdds}>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>ФИО:</label>
                            <input type='text' name='name' value={newDirection.name} className={styles.inputs}
                                   placeholder='Имя' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Телефон:</label>
                            <input type='tel' name='phone' value={newDirection.phone} className={styles.inputs}
                                   placeholder='телефон' onChange={handleChange}/>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Оплата:</label>
                            <select className={styles.inputs} name="paymentMethod" value={newDirection.paymentMethod}
                                    onChange={handleChange}>
                                <option className={styles.oprions} value="Банки"></option>
                                <option className={styles.oprions} value="Мбанк">Мбанк</option>
                                <option className={styles.oprions} value="Элкарт">Элкарт</option>
                                <option className={styles.oprions} value="Viza">Viza</option>
                            </select>
                        </div>
                        <div className={styles.checboxInfo}>
                            <input type='checkbox' name='delivery' value={'true'} className={styles.inputs}
                                   onChange={handleChange}/>
                            <p className={styles.textInput}>
                                Доставка
                            </p>
                        </div>
                        <div className={styles.inputForm}>
                            <label className={styles.textInput}>Адрес:</label>
                            <input type='text' name='address' value={newDirection.address} className={styles.inputs}
                                   placeholder='Адрес' onChange={handleChange}/>
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
                        session?.data ? <button onClick={handleChangeActive} className={styles.submit}>Отправить</button> :
                            <div className={styles.warning}>Для того что бы купить книгу вы должны
                                авторизоваться</div>
                    }
                </form>
            </div>
    )
};

export default TheAddAplication;