import React, { useEffect, useState, useContext } from 'react';
import { TeamNameContext } from './TeamNameContext'; // Importez votre contexte

const TimerDisplay = () => {
    const { score, setScore } = useContext(TeamNameContext); // Accédez au score et à la fonction de mise à jour
    const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
        const storedExpiryTimestamp = localStorage.getItem('expiryTimestamp');
        return storedExpiryTimestamp ? new Date(storedExpiryTimestamp) : new Date(Date.now() + 90 * 60 * 1000);
    });
    const [isTimerRunning, setIsTimerRunning] = useState(() => localStorage.getItem('isTimerRunning') === 'true');
    const [timeRemaining, setTimeRemaining] = useState(expiryTimestamp - new Date());

    const handleTimerComplete = () => {
        setIsTimerRunning(false);
        alert("Temps écoulé !");
        localStorage.removeItem('expiryTimestamp');
    };

    const startTimer = () => {
        if (!isTimerRunning) {
            const newExpiryTimestamp = new Date(Date.now() + 90 * 60 * 1000);
            setExpiryTimestamp(newExpiryTimestamp);
            setIsTimerRunning(true);
            localStorage.setItem('isTimerRunning', 'true');
            localStorage.setItem('expiryTimestamp', newExpiryTimestamp.toISOString());
        }
    };

    const pauseTimer = () => {
        setIsTimerRunning(false);
        localStorage.setItem('isTimerRunning', 'false');
    };

    const resetTimer = () => {
        const newExpiryTimestamp = new Date(Date.now() + 90 * 60 * 1000);
        setExpiryTimestamp(newExpiryTimestamp);
        localStorage.setItem('expiryTimestamp', newExpiryTimestamp.toISOString());
        setIsTimerRunning(false); // Pause le timer pour s'assurer que l'intervalle ne tourne pas
        setTimeRemaining(newExpiryTimestamp - new Date()); // Réinitialise le temps restant
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isTimerRunning) {
                const remaining = expiryTimestamp - new Date();
                if (remaining <= 0) {
                    handleTimerComplete();
                    clearInterval(interval);
                } else {
                    setTimeRemaining(remaining);
                }
            }
        }, 1000); // Met à jour chaque seconde

        return () => clearInterval(interval);
    }, [isTimerRunning, expiryTimestamp]);

    // Ajoutez un autre useEffect pour réduire le score toutes les 10 minutes
    useEffect(() => {
        const scoreInterval = setInterval(() => {
            if (score > 0) {
                const newScore = Math.max(0, score - 500); // Assurez-vous que le score ne tombe pas en dessous de 0
                setScore(newScore);
                localStorage.setItem('score', newScore); // Mettez à jour le localStorage
            }
        }, 600000); // 10 minutes

        return () => clearInterval(scoreInterval);
    }, [score, setScore]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            <h2>Temps restant : {formatTime(timeRemaining)}</h2>
            <button onClick={startTimer}>Démarrer</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Réinitialiser</button>
        </div>
    );
};

export default TimerDisplay;
