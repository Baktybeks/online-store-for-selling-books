'use client'

import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import ArrowRight from '@/components/theCriteria/icons/ArrowRight'

import 'slick-carousel/slick/slick.css'
import './TheSlider.scss'
import styles from './TheReceipts.module.scss'

const TheReceipts = () => {
	const [data, setData] = useState([])

	let sliderRef = useRef<Slider | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://freetestapi.com/api/v1/books')
			if (!response.ok) {
				throw new Error('Unable to fetch posts!')
			}
			const jsonData = await response.json()
			setData(jsonData)
		}

		fetchData()
	}, [])

	const settings = {
		focusOnSelect: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1
	}

	const next = () => {
		if (sliderRef.current) {
			sliderRef.current.slickNext()
		}
	}

	const previous = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPrev()
		}
	}

	return (
		<>
			<div className={styles.blockSlider}>
				<div className={styles.blockHeader}>
					<h2 className={styles.nameSliders}>Новые поступления</h2>
					<div className={styles.blockButtons}>
						<button className={styles.buttonPrev} onClick={previous}>
							<ArrowRight />
						</button>
						<button className={styles.buttonNext} onClick={next}>
							<ArrowRight />
						</button>
					</div>
				</div>
				<div>
					<div className='sliderReceipts'>
						<Slider
							ref={slider => {
								sliderRef.current = slider
							}}
							{...settings}>
							{data.map((elem: any, index) =>
								<div key={elem.id}>
									<img src={elem.cover_image} alt='tower' className={styles.imgesBooks} />
									<div className={styles.textBooks}>
										<div className={styles.nameBook}>{elem.author}</div>
										<div className={styles.renovationBook}>{elem.title}</div>
										<div className={styles.prise}>100$</div>
									</div>
								</div>
							)}
						</Slider>
					</div>
				</div>
			</div>
		</>
	)
}

export default TheReceipts
