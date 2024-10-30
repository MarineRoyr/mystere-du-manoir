import React, { useState, createContext, useEffect, useCallback } from 'react';

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
    const [inputs, setInputs] = useState(() => {
        const storedInputs = JSON.parse(localStorage.getItem('inputs')) || {
            firstStep: '',
            secondStep: '',
            thirdStep: '',
            fourStep: '',
            fiveStep: '',
            sixStep: '',
            sevenStep: '',
            ultimateStep: '',
            scoreStep: '',
        };
        return storedInputs;
    });
    const [isGameOver, setIsGameOver] = useState(false);
    const [isResetting, setIsResetting] = useState(false); // État pour suivre la réinitialisation

    // Fonction pour ajouter une réponse et éviter les doublons
    const addResponse = (response) => {
        setResponses((prevResponses) => {
            const newResponses = [...new Set([...prevResponses, response])];
            return newResponses;
        });
    };

    // Fonction pour mettre à jour les inputs
    const updateInput = (step, value) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [step]: value,
        }));
    };

    // Fonction pour démarrer le chronomètre
    const startTimer = useCallback(() => {
        if (timerId || timeLeft <= 0) return; // Ne pas démarrer si déjà en cours ou si le temps est écoulé

        const newTimerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                // Vérifiez si 10 minutes (600 secondes) se sont écoulées
                if (prevTime % 600 === 1 && prevTime > 0) {
                    setScore((prevScore) => Math.max(prevScore - 500, 0)); // Réduit le score de 500, ne descend pas en dessous de 0
                }
                if (newTime <= 0) {
                    clearInterval(newTimerId);
                    setTimerId(null);
                    setIsGameOver(true);
                    alert("Temps écoulé !");
                    return 0;
                }
                return newTime;
            });
        }, 1000); // Timer de 1 seconde

        setTimerId(newTimerId); // Enregistrer l'ID du timer
    }, [timerId, timeLeft]);

    // Fonction pour réinitialiser le local storage et l'état
    const resetLocalStorage = () => {
        localStorage.clear(); // Effacer tout le stockage local
        setTeamName('');
        setScore(50000);
        setTimeLeft(90 * 60); // Remettre à 90 minutes
        setResponses([]);
        setInputs({
            firstStep: '',
            secondStep: '',
            thirdStep: '',
            fourStep: '',
            fiveStep: '',
            sixStep: '',
            sevenStep: '',
            ultimateStep: '',
            scoreStep: ''
        });
        setIsGameOver(false);

        // Ne pas redémarrer le timer ici
        if (timerId) {
            clearInterval(timerId);
            setTimerId(null); // Stopper le timer
        }

        alert('La session de jeu a été remise à zéro !');
        setIsResetting(true);
    };

    useEffect(() => {
        // Démarre le chronomètre si le tempsLeft est supérieur à 0, pas de timer en cours, et n'est pas en cours de réinitialisation
        if (timeLeft > 0 && !timerId && !isResetting) {
            startTimer(); // Démarre le chronomètre si les conditions sont remplies
        }

        return () => {
            if (timerId) {
                clearInterval(timerId); // Nettoie l'intervalle si le composant est démonté
            }
        };
    }, [timeLeft, timerId, isResetting, startTimer]); // Ajoutez isResetting ici

    // Mettre à jour localStorage chaque fois que `teamName`, `score`, `timeLeft`, `responses`, ou `inputs` changent
    useEffect(() => {
        localStorage.setItem('teamName', teamName);
        localStorage.setItem('score', score);
        localStorage.setItem('timeLeft', timeLeft);
        localStorage.setItem('responses', JSON.stringify(responses));
        localStorage.setItem('inputs', JSON.stringify(inputs));
    }, [teamName, score, timeLeft, responses, inputs]);

    // Rendre le contexte
    return (
        <TeamNameContext.Provider value={{
            teamName,
            setTeamName,
            score,
            setScore,
            timeLeft,
            setTimeLeft,
            startTimer,
            responses,
            addResponse, // Assurez-vous que cela est ici
            inputs,
            updateInput, // Assurez-vous que cela est ici
            isGameOver,
            setIsGameOver,
            resetLocalStorage
        }}>
            {children}
        </TeamNameContext.Provider>
    );
};
