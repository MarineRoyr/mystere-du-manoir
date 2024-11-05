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

    // Fonction pour mettre à jour le score dans le localStorage
    const updateScoreInLocalStorage = (newScore) => {
        setScore(newScore);
        localStorage.setItem('score', newScore);
    };

    // Fonction pour marquer la fin du jeu
    const markGameOver = () => {
        setIsGameOver(true);
        alert("Le jeu est terminé !");
    };


    useEffect(() => {
        if (isGameOver) {
            updateScoreInLocalStorage(0);
        }
    }, [isGameOver]);

    useEffect(() => {
        if (!isGameOver) {
            const interval = setInterval(() => {
                updateScoreInLocalStorage(Math.max(score - 500, 0));
            }, 10 * 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [score, isGameOver]);

    const resetLocalStorage = () => {
        localStorage.clear();
        setTeamName('');
        updateScoreInLocalStorage(50000); // Utilisez la fonction pour mettre à jour le score
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
        alert('La session de jeu est réinitialisée');
    };

    useEffect(() => {
        // Réduire le score toutes les 10 minutes
        const interval = setInterval(() => {
            const newScore = Math.max(score - 500, 0); // Ne pas permettre de descendre en dessous de 0
            updateScoreInLocalStorage(newScore);
        }, 10 * 60 * 1000); // 10 minutes

        return () => clearInterval(interval); // Nettoyer l'intervalle à la désinstallation du composant
    }, [score]); // Ajoutez score comme dépendance

    return (
        <TeamNameContext.Provider value={{
            teamName,
            setTeamName,
            score,
            setScore: updateScoreInLocalStorage,
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
            markGameOver, // Exposez la fonction pour marquer la fin du jeu
            resetLocalStorage,
        }}>
            {children}
        </TeamNameContext.Provider>
    );
};
