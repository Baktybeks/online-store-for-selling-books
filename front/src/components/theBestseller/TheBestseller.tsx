import React from 'react'
import Link from 'next/link'
import styles from './TheBestseller.module.scss'
import AroowLinck from '@/components/theBestseller/icons/AroowLinck'

interface Props {
	onActive: (value: boolean) => void;
}

const TheBestseller = ({onActive}: Props) => {

	const handleChange = () => {
		onActive(true);
	}

	return (
		<div className={styles.Bestseller}>
			<div className={styles.info}>
				<p className={styles.text}><span className={styles.scidcka}>Скидка 20%</span> на избранные книги</p>
				<h2 className={styles.nameBestseller}><span className={styles.textName}>Бестселлер</span><br /> Нехудожественные
					книги!</h2>
				<Link href={'/'} onClick={handleChange} className={styles.linckBestseller}>Купить сейчас <AroowLinck /></Link>
			</div>
			<ul className={styles.imgBestseller}>
				<li className={styles.imageOne}></li>
				<li className={styles.imageTwo}></li>
				<li className={styles.imageThere}></li>
			</ul>
		</div>
	)
}

export default TheBestseller