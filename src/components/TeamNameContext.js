import React, { useState, createContext, useEffect } from 'react';

export const TeamNameContext = createContext();

export const TeamNameProvider = ({ children }) => {
    const [teamName, setTeamName] = useState(localStorage.getItem('teamName') || '');
    const [score, setScore] = useState(() => {
        const storedScore = localStorage.getItem('score');
        return storedScore ? parseInt(storedScore) : 50000;
    });
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
    const [isTimerComplete, setIsTimerComplete] = useState(false); // Nouvel état pour vérifier si le timer est terminé

    // Vérifie si le temps est écoulé au chargement
    useEffect(() => {
        const storedExpiryTimestamp = localStorage.getItem('expiryTimestamp');
        if (storedExpiryTimestamp) {
            const isExpired = new Date() > new Date(storedExpiryTimestamp);
            setIsTimerComplete(isExpired);
        }
    }, []);

    // Met à jour le score dans le localStorage
    useEffect(() => {
        localStorage.setItem('score', score); // Assurez-vous que le score est sauvegardé en localStorage
    }, [score]);

   

    // Fonction pour marquer la fin du jeu
    const markGameOver = () => {
        setIsGameOver(true);
        alert("Le jeu est terminé !");
    };

    const resetLocalStorage = () => {
        localStorage.clear();
        setTeamName('');
        setScore(50000); // Réinitialise le score à 50000
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
        setIsTimerComplete(false); // Réinitialise l'état du timer
        alert('La session de jeu est réinitialisée');
    };

    return (
        <TeamNameContext.Provider value={{
            teamName,
            setTeamName,
            score,
            setScore,
            responses,
            addResponse: (response) => {
                setResponses((prevResponses) => [...new Set([...prevResponses, response])]);
                localStorage.setItem('responses', JSON.stringify([...new Set([...responses, response])]));
            },
            inputs,
            updateInput: (step, value) => {
                setInputs((prevInputs) => ({ ...prevInputs, [step]: value }));
                localStorage.setItem('inputs', JSON.stringify({ ...inputs, [step]: value }));
            },
            isGameOver,
            markGameOver,
            isTimerComplete, // Expose l'état du timer pour les autres composants
            resetLocalStorage,
        }}>
            {children}
        </TeamNameContext.Provider>
    );
};
