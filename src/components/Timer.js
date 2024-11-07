import React, { useEffect, useState, useContext } from 'react';
import { TeamNameContext } from './TeamNameContext'; // Importez votre contexte

const Timer = ({ onTimerComplete }) => {
    const { score, setScore } = useContext(TeamNameContext); // Accédez au score en temps réel
    const [expiryTimestamp, setExpiryTimestamp] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isTimerComplete, setIsTimerComplete] = useState(false);  // Nouvel état pour savoir si le timer est terminé

    useEffect(() => {
        const storedExpiryTimestamp = localStorage.getItem('expiryTimestamp');
        if (storedExpiryTimestamp) {
            setExpiryTimestamp(new Date(storedExpiryTimestamp));
        } else {
            const defaultExpiry = new Date(Date.now() + 90 * 60 * 1000);
            setExpiryTimestamp(defaultExpiry);
            localStorage.setItem('expiryTimestamp', defaultExpiry.toISOString());
        }
    }, []);

    useEffect(() => {
        if (expiryTimestamp) {
            const interval = setInterval(() => {
                const remaining = expiryTimestamp - new Date();
                if (remaining <= 0) {
                    setIsTimerComplete(true);  // Timer complet
                    setTimeRemaining(0);  // Mettre à jour le temps restant
                    clearInterval(interval);
                    if (onTimerComplete) onTimerComplete();  // Appeler la fonction callback si elle est passée
                } else {
                    setTimeRemaining(remaining);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [expiryTimestamp, onTimerComplete]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

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

    return (
        <div>
            {isTimerComplete ? (
                <h2>Le temps est écoulé, votre session de jeu est terminée.</h2>
            ) : (
                <h2>Temps restant : {formatTime(timeRemaining)}</h2>
            )}
        </div>
    );
};

export default Timer;
