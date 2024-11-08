import React, { useEffect, useState } from 'react';

const TimerDisplay = () => {
    const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
        const storedExpiryTimestamp = localStorage.getItem('expiryTimestamp');
        // Si un timestamp est stocké, assurez-vous qu'il est valide, sinon définissez-le à 90 minutes par défaut
        const parsedTimestamp = storedExpiryTimestamp ? new Date(storedExpiryTimestamp) : new Date(Date.now() + 90 * 60 * 1000);
        return parsedTimestamp instanceof Date && !isNaN(parsedTimestamp) ? parsedTimestamp : new Date(Date.now() + 90 * 60 * 1000); // Validation de la date
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
                    setTimeRemaining(remaining); // Met à jour le temps restant
                }
            }
        }, 1000); // Mise à jour chaque seconde

        return () => clearInterval(interval); // Nettoyage de l'intervalle à la désinstallation du composant
    }, [isTimerRunning, expiryTimestamp]); // L'effet dépend de l'état du timer et de l'expiryTimestamp



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
            <div>
                <button onClick={startTimer}>Démarrer</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Réinitialiser</button>
            </div>
        </div>
    );
};

export default TimerDisplay;
