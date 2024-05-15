'use client'

import React, {useEffect, useState} from 'react';
import styles from '../styles/admin/Admin.module.scss'

interface Direction {
    id: string;
    title: string;
    description: string;
    form_of_studies: string;
    price: string;
    img: string;
}


const PageAdmin = () => {
    const [directions, setDirections] = useState<Direction[]>([]);
    const [newDirection, setNewDirection] = useState<Direction>({
        id: '',
        title: '',
        img: '',
        description: '',
        form_of_studies: '',
        price: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/direction/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setDirections(jsonData.rows);
        };

        fetchData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'img') {
            setNewDirection(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewDirection(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/direction/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', newDirection.id);
            formData.append('title', newDirection.title);
            formData.append('description', newDirection.description);
            formData.append('form_of_studies', newDirection.form_of_studies);
            formData.append('price', newDirection.price);
            formData.append('img', newDirection.img);

            const response = await fetch('http://localhost:5000/api/direction/', {
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
        <div className={styles.wrapperAdmin}>
            <h2 className={styles.nameAdmin}>Создать новое направление</h2>
            <form className={styles.formAdmin} onSubmit={handleSubmit}>
                <div className={styles.inputForm}>
                    <label>Название:</label>
                    <input className={styles.input} placeholder='Название' type="text" name="title"
                           value={newDirection.title} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Информация:</label>
                    <textarea maxLength={400} className={styles.inputText} placeholder='Текст' name="description"
                              value={newDirection.description} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Форма Обучения:</label>
                    <select className={styles.selectForm} name="form_of_studies" value={newDirection.form_of_studies}
                            onChange={handleChange}>
                        <option className={styles.oprions} value="FULL_TIME">Очный</option>
                        <option className={styles.oprions} value="DISTANCE_LEARNING">Заочный</option>
                    </select>
                </div>
                <div className={styles.inputForm}>
                    <label>Цена:</label>
                    <input className={styles.input} placeholder='Цена' type="number" name="price"
                           value={newDirection.price} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Картинка:</label>
                    <div className={styles.blockImages}>
                        <input className={styles.imagesInput} type="file" name="img" accept='/image/*, .png, .jpg, .web'
                               onChange={handleChange}/>
                    </div>
                </div>
                <button className={styles.summit} type="submit">Отправить</button>
            </form>

            <h2>Направления</h2>
            <ul className={styles.blockList}>
                {directions.map((elem, index) => (
                    <li key={elem.id} className={styles.infoList}>
                        <div className={styles.blockImages}>
                            <img className={styles.image} src={`http://localhost:5000/${elem.img}`} alt={elem.title}/>
                        </div>
                        <div>
                            <h2 className={styles.nameHeader}>{elem.title}</h2>
                            <div className={styles.line}></div>
                        </div>
                        <div>
                            <p className={styles.Desctiption}>{elem.description}</p>
                            <ul className={styles.blockInfo}>
                                <li className={styles.infoDescrition}>
                                    <div className={styles.nameDescrition}>Форма обучения:</div>
                                    <div
                                        className={styles.textDescrition}>{elem.form_of_studies === 'FULL_TIME' ? 'Заочный' : 'Очный'}</div>
                                </li>
                                <li className={styles.infoDescrition}>
                                    <div className={styles.nameDescrition}>Основа обучения:</div>
                                    <div className={styles.textDescrition}>Контракт</div>
                                </li>
                                <li className={styles.infoDescrition}>
                                    <div className={styles.nameDescrition}>Контракт:</div>
                                    <div className={styles.textDescrition}>{elem.price}</div>
                                </li>
                                <li className={styles.infoDescrition}>
                                    <div className={styles.nameDescrition}>На базе 9 класса:</div>
                                    <div className={styles.textDescrition}>2 года 10 месяцев</div>
                                </li>
                                <li className={styles.infoDescrition}>
                                    <div className={styles.nameDescrition}>На базе 11 класса:</div>
                                    <div className={styles.textDescrition}>1 год 10 месяцев</div>
                                </li>
                            </ul>
                        </div>
                    <button className={styles.delete} onClick={() => handleDelete(elem.id)}>Удалить</button>
                    </li>
                ))}
        </ul>
        </div>
    );
};

export default PageAdmin;
