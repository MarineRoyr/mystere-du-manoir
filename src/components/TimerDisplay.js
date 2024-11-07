import React, { useEffect, useState, useContext } from 'react';
import { TeamNameContext } from './TeamNameContext'; // Importez votre contexte

const TimerDisplay = () => {
    const { score, setScore } = useContext(TeamNameContext); // Accédez au score et à la fonction de mise à jour
    const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
        const storedExpiryTimestamp = localStorage.getItem('expiryTimestamp');
        return storedExpiryTimestamp ? new Date(storedExpiryTimestamp) : new Date(Date.now() + 90 * 60 * 1000); // 90 minutes par défaut
    });
    const [isTimerRunning, setIsTimerRunning] = useState(() => localStorage.getItem('isTimerRunning') === 'true');
    const [timeRemaining, setTimeRemaining] = useState(expiryTimestamp - new Date());

    // Fonction pour gérer la fin du timer
    const handleTimerComplete = () => {
        setIsTimerRunning(false);
        alert("Temps écoulé !");
        localStorage.removeItem('expiryTimestamp');
    };

    // Fonction pour démarrer le timer
    const startTimer = () => {
        if (!isTimerRunning) {
            const newExpiryTimestamp = new Date(Date.now() + 90 * 60 * 1000); // 90 minutes
            setExpiryTimestamp(newExpiryTimestamp);
            setIsTimerRunning(true);
            localStorage.setItem('isTimerRunning', 'true');
            localStorage.setItem('expiryTimestamp', newExpiryTimestamp.toISOString());
        }
    };

    // Fonction pour mettre en pause le timer
    const pauseTimer = () => {
        setIsTimerRunning(false);
        localStorage.setItem('isTimerRunning', 'false');
    };

    // Fonction pour réinitialiser le timer
    const resetTimer = () => {
        const newExpiryTimestamp = new Date(Date.now() + 90 * 60 * 1000); // 90 minutes
        setExpiryTimestamp(newExpiryTimestamp);
        localStorage.setItem('expiryTimestamp', newExpiryTimestamp.toISOString());
        setIsTimerRunning(false); // Pause le timer
        setTimeRemaining(newExpiryTimestamp - new Date()); // Réinitialise le temps restant
    };

    // Logique pour mettre à jour le temps restant sur le timer
    useEffect(() => {
        const interval = setInterval(() => {
            if (isTimerRunning) {
                const remaining = expiryTimestamp - new Date();
                if (remaining <= 0) {
                    handleTimerComplete();
                    clearInterval(interval); // Arrêter le timer
                } else {
                    setTimeRemaining(remaining);
                }
            }
        }, 1000); // Met à jour chaque seconde

        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, [isTimerRunning, expiryTimestamp]);

    // Utiliser un effet pour réduire le score toutes les 10 minutes
    useEffect(() => {
        const scoreInterval = setInterval(() => {
            if (score > 0) {
                const newScore = Math.max(0, score - 500); // Réduit le score de 500, mais ne le laisse pas devenir négatif
                setScore(newScore); // Mise à jour du score
                localStorage.setItem('score', newScore); // Mise à jour dans localStorage
            }
        }, 600000); // 600000 ms = 10 minutes

        return () => clearInterval(scoreInterval); // Nettoyage de l'intervalle
    }, [score, setScore]);

    // Fonction pour formater le temps restant en minutes et secondes
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            <h2>Temps restant : {formatTime(timeRemaining)}</h2>
            <h3 className="score">Score: {score}</h3> {/* Affichez le score en temps réel */}
            <div>
                <button onClick={startTimer}>Démarrer</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Réinitialiser</button>
            </div>
        </div>
    );
};

export default TimerDisplay;
