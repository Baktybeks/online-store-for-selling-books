import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Girl from './icons/pusyka.png'
import styles from './TheOpenWorld.module.scss'

interface Props {
	onActive: (value: boolean) => void;
}

const TheOpenWorld = ({onActive}: Props) => {

	const handleChange = () => {
		onActive(true);
	}

	return (
		<>
			<div className={styles.openWorld}>
				<div className={styles.info}>
					<h1 className={styles.nameHeader}>Откройте мир знаний с нами: ваш интернет-магазин книжных сокровищ!</h1>
					<Link href={'#'} onClick={handleChange} className={styles.btnServices}>Купить</Link>
				</div>
				<div className={styles.image}>
					<Image src={Girl} alt='image' />
				</div>
			</div>
		</>
	)
}

export default TheOpenWorld