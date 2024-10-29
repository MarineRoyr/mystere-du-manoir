import React, { useState, createContext } from 'react';

// Créez le contexte pour le nom de l'équipe et d'autres états
export const TeamNameContext = createContext();

// Le fournisseur de contexte pour encapsuler l'application
export const TeamNameProvider = ({ children }) => {
    const [teamName, setTeamName] = useState(localStorage.getItem('teamName') || '');
    const [score, setScore] = useState(() => {
        const storedScore = localStorage.getItem('score');
        return storedScore ? parseInt(storedScore) : 50000;
    });
    const [timeLeft, setTimeLeft] = useState(() => {
        const storedTime = localStorage.getItem('timeLeft');
        return storedTime ? parseInt(storedTime) : 90 * 60;
    });
    const [timerId, setTimerId] = useState(null);
    const [responses, setResponses] = useState(() => {
        const storedResponses = JSON.parse(localStorage.getItem('responses')) || [];
        return [...new Set(storedResponses)];
    });

    const [isGameOver, setIsGameOver] = useState(false);

    const addResponse = (response) => {
        setResponses((prevResponses) => {
            const newResponses = [...new Set([...prevResponses, response])]; // Utiliser Set pour éliminer les doublons
            localStorage.setItem('responses', JSON.stringify(newResponses)); // Enregistrer dans le localStorage
            return newResponses;
        });
    };
    const [inputs, setInputs] = useState({ firststep: '', secondStep: '', thirdStep: '', fourstep: '', fivestep: '', sixstep: '', sevenstep: '', ultimatestep: '', scorestep: '' })


    const updateInput = (step, value) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [step]: value,
        }));
    };
    // Fonction pour démarrer le chronomètre
    const startTimer = () => {
        if (timerId) return; // Ne pas démarrer un nouveau timer si déjà en cours

        const newTimerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;

                if (newTime <= 0) {
                    clearInterval(newTimerId);
                    alert("Temps écoulé !");
                    localStorage.clear();
                    return 0;
                }
                return newTime;
            });
        }, 1000); // Timer de 1 seconde

        setTimerId(newTimerId); // Enregistrer l'ID du timer
    };

    const resetLocalStorage = () => {
        localStorage.clear(); // Effacer tout le stockage local
        setTeamName(''); // Réinitialiser le nom de l'équipe
        setScore(50000); // Réinitialiser le score
        setTimeLeft(90 * 60); // Réinitialiser le temps restant
        setResponses([]); // Réinitialiser les réponses
        setInputs({ firststep: '', secondStep: '', thirdStep: '', fourstep: '', fivestep: '', sixstep: '', sevenstep: '', ultimatestep: '', scorestep: '' }); // Réinitialiser les inputs
        setIsGameOver(false); // Réinitialiser l'état de la fin de jeu
    };

    // Rendre le contexte
    return (
        <TeamNameContext.Provider value={{
            teamName,
            setTeamName,
            score,
            setScore,
            timeLeft,
            setTimeLeft,
            startTimer, // Assurez-vous que ceci est présent
            responses,
            setResponses,
            addResponse,
            inputs,
            updateInput,
            isGameOver,
            setIsGameOver,
            resetLocalStorage
        }}>
            {children}
        </TeamNameContext.Provider>
    );
};
