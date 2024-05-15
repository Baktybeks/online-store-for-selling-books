'use client'

import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import ArrowRight from '@/components/theCriteria/icons/ArrowRight'

import 'slick-carousel/slick/slick.css'
import './TheSlider.scss'
import styles from './TheCollection.module.scss'

const TheCollection = () => {
	const [data, setData] = useState([])

	let sliderRef = useRef<Slider | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:5000/api/book/')
			if (!response.ok) {
				throw new Error('Unable to fetch posts!')
			}
			const jsonData = await response.json()
			setData(jsonData.rows)
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
					<h2 className={styles.nameSliders}>Последние коллекции</h2>
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
							ref={(slider :any) => {
								sliderRef.current = slider
							}}
							{...settings}>
							{data
								.filter((elem: any) => elem.bestseller)
								.map((elem: any, index) => (
									<div key={elem.id}>
										<img src={`http://localhost:5000/${elem.cover_image}`} alt='tower' className={styles.imgesBooks} />
										<div className={styles.textBooks}>
											<div className={styles.nameBook}>{elem.author}</div>
											<div className={styles.renovationBook}>{elem.title}</div>
											<div className={styles.prise}>{elem.price} сом</div>
										</div>
									</div>
								))}
						</Slider>
					</div>
				</div>
			</div>
		</>
	)
}

export default TheCollection
