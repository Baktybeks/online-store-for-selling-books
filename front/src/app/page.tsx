import React from 'react'
import TheOpenWorld from '@/components/theOpenWorld/TheOpenWorld'
import TheCriteria from '@/components/theCriteria/TheCriteria'
import TheReceipts from '@/components/theReceipts/TheReceipts'
import TheBestseller from '@/components/theBestseller/TheBestseller'
import TheOffers from '@/components/theOffers/TheOffers'
import TheBooksSold from '@/components/theBooksSold/TheBooksSold'
import styles from './styles/Home/Home.module.scss'
import TheCollection from '@/components/theCollections/TheCollection'


const Home = () => {
	return (
		<>
			<section className={styles.wrapperOpenWorld}>
				<TheOpenWorld />
			</section>
			<section className={styles.wrapperCriteria}>
				<TheCriteria />
			</section>
			<section className={styles.wrapperBestseller}>
				<TheBestseller />
			</section>
			<section className={styles.wrapperFeatured}>
				<TheReceipts />
			</section>
			<section className={styles.wrapperOffers}>
				<TheOffers />
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