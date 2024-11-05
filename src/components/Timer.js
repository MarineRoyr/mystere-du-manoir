import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
        const storedExpiryTimestamp = localStorage.getItem('expiryTimestamp');
        // Si le timestamp est présent, le convertir en date, sinon définir 90 minutes à partir de maintenant
        return storedExpiryTimestamp ? new Date(storedExpiryTimestamp) : new Date(Date.now() + 90 * 60 * 1000);
    });

    const [timeRemaining, setTimeRemaining] = useState(expiryTimestamp - new Date());

    const handleTimerComplete = () => {
        alert("Temps écoulé !");
        localStorage.removeItem('expiryTimestamp'); // Nettoyer le localStorage
        // Réinitialiser le timestamp d'expiration
        setExpiryTimestamp(new Date(Date.now() + 90 * 60 * 1000));
    };

    useEffect(() => {
        // Mettre à jour le temps restant chaque seconde
        const interval = setInterval(() => {
            const remaining = expiryTimestamp - new Date();
            if (remaining <= 0) {
                handleTimerComplete();
                clearInterval(interval); // Arrêter le timer
            } else {
                setTimeRemaining(remaining); // Met à jour le temps restant
            }
        }, 1000);

        return () => clearInterval(interval); // Nettoyer l'intervalle à la désinstallation du composant
    }, [expiryTimestamp]); // Surveiller expiryTimestamp pour mettre à jour le timer

    useEffect(() => {
        // Mettre à jour le temps restant lorsque expiryTimestamp change
        setTimeRemaining(expiryTimestamp - new Date());
    }, [expiryTimestamp]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000)); // Assurez-vous que les secondes ne soient pas négatives
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            <h2>Temps restant : {formatTime(timeRemaining)}</h2>
        </div>
    );
};

export default Timer;
