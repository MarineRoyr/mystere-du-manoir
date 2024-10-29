import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';

const FirstStep = () => {
    const { teamName, score, setScore, timeLeft, addResponse, responses, inputs, updateInput, startTimer } = useContext(TeamNameContext);

    // Déclaration de l'état pour l'input
    const [inputValue, setInputValue] = useState(inputs.firstStep || ''); // Initialiser avec la valeur existante
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const validAnswers = ["Bougie", "bougie"];
    const hint = "L'indice est : Pensez à une source de lumière.";

    // Vérifiez si une réponse a déjà été fournie pour pré-remplir l'input
    useEffect(() => {
        // Pré-remplir l'input avec la valeur de firstStep de inputs
        setInputValue(inputs.firstStep);
    }, [inputs.firstStep]);

    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            // Mettre à jour l'input dans le contexte
            updateInput('firstStep', inputValue.trim()); // Mise à jour de l'input
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };

    const goToNextStep = () => {
        if (isValid) {
            navigate('/second-step');
        }
    };

    const getHint = () => {
        if (score >= 1000) {
            setScore(score - 1000);
            alert(hint);
        } else {
            alert("Désolé, vous n'avez pas assez de points pour obtenir un indice.");
        }
    };

    return (
        <div className="step-container">
            <div className="welcome-section">
                <h2>Bienvenue </h2>
                <h3>{teamName}</h3>
                <h4>Au Commencement</h4>
            </div>
            <div className="clue-container">
                <div className="responsive-iframe-container">
                    <iframe
                        title="Vidéo explicative de la première étape"
                        src="https://www.canva.com/design/DAGNWTa9L0k/HktgB8trjriT564GR1jCZA/watch?embed"
                        allowFullScreen
                        allow="fullscreen"
                    ></iframe>
                </div>
                <div className="bottom-content">
                    <h3 className="score">Score: {score}</h3>
                    <button className="chrono" onClick={startTimer}>Démarrer le Chronomètre</button>
                    <h3 className="chrono-display">Temps restant: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h3>
                </div>
                <p>Décoder cette lettre vous permettra de découvrir les premiers indices liés au mystère de la disparition de Laura.</p>
                <p>Entrez l'indice pour débloquer l'étape suivante (le chronomètre doit être démarré) :</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        updateInput('firstStep', e.target.value); // Mettre à jour l'input dans le contexte
                    }}
                    placeholder="Entrez l'indice ici"
                    disabled={timeLeft <= 0}
                />
                <button onClick={handleValidation} disabled={timeLeft <= 0}>Valider</button>
                <button onClick={goToNextStep} disabled={!isValid || timeLeft <= 0}>
                    Aller à l'étape suivante
                </button>
                <button onClick={getHint} disabled={timeLeft <= 0}>
                    Obtenir un Indice (-1000 points)
                </button>
            </div>
            <div className="responses-container">
                <h3>Votre Boîte à indices</h3>
                <ul>
                    {responses.map((response, index) => (
                        <li key={index}>{response}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FirstStep;
