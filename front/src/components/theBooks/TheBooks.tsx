import React, { useEffect, useState } from 'react';
import styles from './TheBooks.module.scss';

interface Props {
    onActive: (value: boolean) => void;
    active: boolean;
    setBookId: (value: string) => void;
}

const TheBooks = ({ onActive, active, setBookId }: Props) => {
    const [data, setData] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [filter, setFilter] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/book/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setData(jsonData.rows);
            setFiltered(jsonData.rows);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (filter) {
            setFiltered(
                data.filter((book: any) => book[filter])
            );
        } else {
            setFiltered(data);
        }
    }, [filter, data]);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextSearch(e.target.value);
    };

    const handleChange = (id: string) => {
        onActive(!active);
        setBookId(id);
    };

    const handlerFilter = (filterValue: string) => {
        setFilter(filterValue);
    };

    return (
        <>
            <div className={styles.blockBtnFiltered}>
                <button onClick={() => handlerFilter('bestseller')} className={styles.btnServices}>Бестселлеры</button>
                <button onClick={() => handlerFilter('isNew')} className={styles.btnServices}>Новые книги</button>
                <button onClick={() => handlerFilter('discount')} className={styles.btnServices}>Скидки</button>
            </div>
            <div className={styles.search}>
                <input
                    type='text'
                    value={textSearch}
                    onChange={handleChangeInput}
                    className={styles.inputSearch}
                    placeholder='Поиск по автору или названию'
                />
                <button className={styles.btn}>Поиск</button>
            </div>
            <div className={styles.blockBooks}>
                {(textSearch ? filtered.filter((book: any) =>
                    book.author.toLowerCase().includes(textSearch.toLowerCase()) ||
                    book.title.toLowerCase().includes(textSearch.toLowerCase())
                ) : filtered).map((elem: any) => (
                    <div key={elem.id}>
                        <img
                            src={`http://localhost:5000/${elem.cover_image}`}
                            alt={elem.title}
                            className={styles.imgesBooks}
                        />
                        <div className={styles.textBooks}>
                            <div className={styles.nameBook}>{elem.author}</div>
                            <div className={styles.renovationBook}>{elem.title}</div>
                            <div className={styles.prise}>{elem.price} сом</div>
                            <button onClick={() => handleChange(elem.id)} className={styles.btnServices}>Купить</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TheBooks;
