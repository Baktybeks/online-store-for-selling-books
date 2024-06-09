'use client'

import React, {useState} from 'react'
import TheOpenWorld from '@/components/theOpenWorld/TheOpenWorld'
import TheCriteria from '@/components/theCriteria/TheCriteria'
import TheReceipts from '@/components/theReceipts/TheReceipts'
import TheBestseller from '@/components/theBestseller/TheBestseller'
import TheOffers from '@/components/theOffers/TheOffers'
import TheBooksSold from '@/components/theBooksSold/TheBooksSold'
import TheCollection from '@/components/theCollections/TheCollection'
import TheAddAplication from "@/components/theAddAplication/TheAddAplication";


import styles from './styles/Home/Home.module.scss'
import classNames from "classnames";


const Home = () => {
	const [active, setActive] = useState(false);
	const [bookId, setBookId] = useState<string>('0')

	return (
		<>
			<div className={classNames(styles.shadow, {[styles.shadowNot]: !active})} onClick={() => setActive(!active)}></div>
			<div className={classNames(styles.application, {[styles.applicationNot]: !active})}>
				<TheAddAplication onActive={setActive} active={active} BookId={bookId}/>
			</div>
			<section className={styles.wrapperOpenWorld}>
				<TheOpenWorld/>
			</section>
			<section className={styles.wrapperCriteria}>
				<TheCriteria />
			</section>
			<section className={styles.wrapperBestseller}>
				<TheBestseller/>
			</section>
			<section className={styles.wrapperReceipts}>
				<TheReceipts />
			</section>
			<section className={styles.wrapperOffers}>
				<TheOffers onActive={setActive} active={active} setBookId={setBookId}/>
			</section>
			<section className={styles.wrapperBooksSold}>
				<TheBooksSold />
			</section>
			<section className={styles.wrapperCollection}>
				<TheCollection />
			</section>
			<section className={styles.wrapperRequest}>
			</section>
		</>
	)
}

export default Home