'use client'

import React from 'react'
import Link from 'next/link'
import Logo from '../icons/Logo'
import { signOut, useSession } from 'next-auth/react'

import styles from './TheHeader.module.scss'

const TheHeader = () => {
	const session = useSession()

	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				<div className={styles.logo}><Logo /></div>
			</div>
			<div className={styles.linck}>
				{
					session?.data && (
						<Link className={styles.textProfile} href='/profile'>Профиль</Link>
					)
				}
				{
					session?.data ?
						<Link className={styles.textLink} href='#'
									onClick={() => signOut({ callbackUrl: '/' })}>Выйти</Link>
						:
						<>
							<Link className={styles.textLink} href='/signin'>Войти</Link>
						</>
				}
			</div>
		</header>
	)
}

export { TheHeader }
