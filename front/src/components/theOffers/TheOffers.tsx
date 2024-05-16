'use client'

import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import ArrowRight from '@/components/theCriteria/icons/ArrowRight'

import './TheOffers.scss'
import styles from './TheOffers.module.scss'
import Link from 'next/link'
import AroowLinck from '@/components/theBestseller/icons/AroowLinck'
import Countdown from "@/components/theOffers/CountDown/CountDown";

interface Props {
	onActive: (value: boolean) => void;
	active: boolean
}

const TheOffers = ({onActive, active}: Props) => {
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

	const handleChange = () => {
		onActive(!active);
	}

	return (
		<>
			<div className={styles.blockSlider}>
				<div className={styles.blockHeader}>
					<h2 className={styles.nameSliders}>Предложения дня <Countdown/></h2>
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
					<div className='sliderOffers'>
						<Slider
							ref={(slider : any) => {
								sliderRef.current = slider
							}}
							{...settings} className={styles.slider}>
							{data.map((elem: any, index) =>
								<div key={elem.id} className={styles.blockInfoBook}>
									<div className={styles.images}>
										<img src={`http://localhost:5000/${elem.cover_image}`} alt='tower' className={styles.imgesBooks} />
									</div>
									<div className={styles.textTower}>
										<div className={styles.nameBook}>{elem.author}</div>
										<div className={styles.renovationBook}>{elem.title}</div>
										<div className={styles.prise}>{elem.price} сом</div>
										<button className={styles.linkAdd} onClick={handleChange} >Добавить книгу<AroowLinck /></button>
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

export default TheOffers