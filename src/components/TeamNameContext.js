import React, { useState, createContext, useEffect } from 'react';

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

    // Mettre à jour localStorage chaque fois que `teamName`, `score`, `timeLeft`, `responses`, ou `inputs` changent
    useEffect(() => {
        localStorage.setItem('teamName', teamName);
    }, [teamName]);

    useEffect(() => {
        localStorage.setItem('score', score);
    }, [score]);

    useEffect(() => {
        localStorage.setItem('timeLeft', timeLeft);
    }, [timeLeft]);

    useEffect(() => {
        localStorage.setItem('responses', JSON.stringify(responses));
    }, [responses]);

    useEffect(() => {
        localStorage.setItem('inputs', JSON.stringify(inputs));
    }, [inputs]);

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
    const startTimer = () => {
        if (timerId) return; // Ne pas démarrer un nouveau timer si déjà en cours

        const newTimerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
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
    };

    // Fonction pour réinitialiser le local storage et l'état
    const resetLocalStorage = () => {
        localStorage.clear(); // Effacer tout le stockage local
        setTeamName('');
        setScore(50000);
        setTimeLeft(90 * 60);
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
        if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
        }
    };

    // Nettoyage du timer si le composant est démonté ou si le jeu se termine
    useEffect(() => {
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [timerId]);

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