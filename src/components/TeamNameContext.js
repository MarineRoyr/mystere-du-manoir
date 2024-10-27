import React, { useState, createContext, useEffect } from 'react';

// Créez le contexte pour le nom de l'équipe et d'autres états
export const TeamNameContext = createContext();

// Le fournisseur de contexte pour encapsuler l'application
export const TeamNameProvider = ({ children }) => {
    const [teamName, setTeamName] = useState(localStorage.getItem('teamName') || ''); // Récupérer le nom de l'équipe depuis localStorage
    const [score, setScore] = useState(() => {
        const storedScore = localStorage.getItem('score');
        return storedScore ? parseInt(storedScore) : 50000; // Récupérer le score depuis localStorage ou initialiser à 50 000
    });
    const [timeLeft, setTimeLeft] = useState(() => {
        const storedTime = localStorage.getItem('timeLeft');
        return storedTime ? parseInt(storedTime) : 90 * 60; // Récupérer le temps depuis localStorage ou initialiser à 90 minutes
    });
    const [timerId, setTimerId] = useState(null); // ID du timer pour pouvoir le nettoyer
    const [responses, setResponses] = useState(() => {
        const storedResponses = localStorage.getItem('responses');
        return storedResponses ? JSON.parse(storedResponses) : []; // Récupérer les réponses depuis localStorage
    }); // Nouvel état pour stocker les réponses
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        // Enregistrer les données dans le localStorage à chaque changement
        localStorage.setItem('teamName', teamName);
        localStorage.setItem('score', score);
        localStorage.setItem('timeLeft', timeLeft);
        localStorage.setItem('responses', JSON.stringify(responses));
    }, [teamName, score, timeLeft, responses]);

    // Fonction pour démarrer le chronomètre
    const startTimer = () => {
        if (timerId) return; // Ne pas démarrer un nouveau timer si déjà en cours

        const newTimerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1; // Réduire le temps restant de 1 seconde

                // Réduire le score de 500 points toutes les 10 minutes (600 secondes)
                if (newTime % 600 === 0 && newTime > 0) {
                    setScore((prevScore) => Math.max(prevScore - 500, 0)); // Réduire le score sans descendre sous 0
                }

                if (newTime <= 0) {
                    clearInterval(newTimerId); // Arrêter le timer si le temps est écoulé
                    alert("Temps écoulé !");
                    localStorage.clear(); // Effacer le localStorage après que le temps est écoulé
                    return 0;
                }
                return newTime; // Retourne le nouveau temps
            });
        }, 1000); // Timer de 1 seconde

        setTimerId(newTimerId); // Enregistrer l'ID du timer
    };

    // Fonction pour arrêter le chronomètre
    const stopTimer = () => {
        if (timerId) {
            clearInterval(timerId); // Arrêter le timer
            setTimerId(null); // Réinitialiser l'ID du timer
        }
    };

    return (
        <TeamNameContext.Provider value={{ teamName, setTeamName, score, setScore, timeLeft, setTimeLeft, startTimer, stopTimer, responses, setResponses, isGameOver, setIsGameOver }}>
            {children}
        </TeamNameContext.Provider>
    );
};