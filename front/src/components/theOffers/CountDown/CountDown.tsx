import {useEffect, useState} from 'react';
import styles from '../TheOffers.module.scss'

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div>
            {hours === 0 && minutes === 0 && seconds === 0 ? <h1 className={styles.time}>День закончен</h1> :
                <h1 className={styles.time}> {hours} : {minutes} : {seconds}</h1>}
        </div>
    );
}

export default Countdown;
