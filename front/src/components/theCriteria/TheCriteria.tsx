'use client'

import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import ArrowRight from '@/components/theCriteria/icons/ArrowRight'

import './TheCriteria.scss'
import styles from './TheCriteria.module.scss'


const TheCriteria = () => {
	const [data, setData] = useState([])
	const [slideIndex, setSlideIndex] = useState<number>(0)
	const [updateCount, setUpdateCount] = useState<number>(0)

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
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		afterChange: () => setUpdateCount(updateCount + 1),
		beforeChange: (current: number, next: number) => setSlideIndex(next)
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
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value)
		if (sliderRef.current) {
			sliderRef.current.slickGoTo(value)
		}
	}

	return (
		<div>
			<h2 className={styles.nameHeader}>Магазин по категориям</h2>
			<div className='sliderCriteria'>
				<Slider
					ref={slider => {
						sliderRef.current = slider
					}}
					{...settings}
				>
					{data.map((elem: any) => (
						<div key={elem.id} className={styles.blocBook}>
							<div className={styles.blockImage}>
								<img className={styles.images} src={elem.cover_image} alt='image' />
							</div>
							<div className={styles.blockText}>{elem.genre[0]}</div>
						</div>
					))}
				</Slider>
				<div className={styles.blockButtons}>
					<button className={styles.buttonPrev} onClick={previous}>
						<ArrowRight />
					</button>
					<input
						className={styles.inputRange}
						onChange={handleChange}
						value={slideIndex}
						type='range'
						min={0}
						max={4}
					/>
					<button className={styles.buttonNext} onClick={next}>
						<ArrowRight />
					</button>
				</div>
			</div>
		</div>
	)
}

export default TheCriteria
