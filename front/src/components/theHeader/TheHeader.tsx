'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Logo from '../icons/Logo'
import { signOut, useSession } from 'next-auth/react'

import styles from './TheHeader.module.scss'
import Corzina from "@/components/theHeader/icons/corzina";

const TheHeader = () => {
	const [applications, setApplications] = useState<any>([]);
	const session = useSession();

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:5000/api/application/');
			if (!res.ok) {
				throw new Error('Unable to fetch posts!');
			}
			const applicationsData = await res.json();
			setApplications(applicationsData);
		};

		fetchData();
	}, []);

	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				<Link href={'/'} className={styles.logo}><Logo /></Link>
				<Link className={styles.textLink}
					  href='/allBook'>Все книги</Link>
			</div>
			<div className={styles.linck}>
				{
					session.data && (
						session.data?.user?.name === 'admin' ? (
							<>
								<Link className={styles.textLink}
									  href='/admin'>Профиль</Link>
								<Link className={styles.textLink}
									  href='/applications'>Заявки</Link>
							</>
						) : <>
							<div>
								{session.data?.user?.name &&  <div className={styles.corzina}><Corzina/><span className={styles.num}>{applications.length}</span></div>}
							</div>
							<Link className={styles.textLink} href='/profile'>Профиль</Link>
						</>
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
