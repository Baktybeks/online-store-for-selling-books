import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Girl from './icons/pusyka.png'
import styles from './TheOpenWorld.module.scss'

interface Props {
	onActive: (value: boolean) => void;
	active: boolean;
}

const TheOpenWorld = ({onActive, active}: Props) => {

	const handleChange = () => {
		onActive(!active);
	}

	return (
		<>
			<div className={styles.openWorld}>
				<div className={styles.info}>
					<h1 className={styles.nameHeader}>Откройте мир знаний с нами: ваш интернет-магазин книжных сокровищ!</h1>
					<button onClick={handleChange} className={styles.btnServices}>Купить</button>
				</div>
				<div className={styles.image}>
					<Image src={Girl} alt='image' />
				</div>
			</div>
		</>
	)
}

export default TheOpenWorld