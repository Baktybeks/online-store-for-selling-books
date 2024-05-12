import styles from './TheFooter.module.scss'
import CarIcon from '@/components/theFooter/icons/CarIcon'
import ClassssIcon from '@/components/theFooter/icons/ClassssIcon'
import ProsentIcon from '@/components/theFooter/icons/ProsentIcon'
import FileBlockIcon from '@/components/theFooter/icons/FileBlockIcon'
import Logo from '@/components/icons/Logo'
import Facebook from '@/components/theFooter/icons/facebook'
import Twiter from '@/components/theFooter/icons/twiter'
import Insta from '@/components/theFooter/icons/insta'
import Youtybe from '@/components/theFooter/icons/youtybe'
import Acounti from '@/components/theFooter/icons/acounti'

const TheFooter = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.contentYslug}>
				<div className={styles.yslygi}>
					<div className={styles.blockYsl}>
						<div><CarIcon /></div>
						<div className={styles.text}>Бесплатная доставка</div>
					</div>
					<div className={styles.blockYsl}>
						<div><ClassssIcon /></div>
						<div className={styles.text}>Экспертное обслуживание клиентов</div>
					</div>
					<div className={styles.blockYsl}>
						<div><ProsentIcon /></div>
						<div className={styles.text}>Удивительная ценность</div>
					</div>
					<div className={styles.blockYsl}>
						<div><FileBlockIcon /></div>
						<div className={styles.text}>Безопасная оплата</div>
					</div>
				</div>
			</div>
			<div className={styles.blockAcounti}>
				<div className={styles.follow}>
					<div className={styles.followText}>Follow Us</div>
					<ul className={styles.siti}>
						<li><Facebook /></li>
						<li><Twiter /></li>
						<li><Insta /></li>
						<li><Youtybe /></li>
					</ul>
				</div>
				<div className={styles.logo}><Logo /></div>
				<div className={styles.follow}>
					<div className={styles.followText}>We Accept</div>
					<div><Acounti /></div>
				</div>
			</div>
		</footer>
	)
}

export { TheFooter }
