import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';

const FiveStep = () => {
    const { teamName,
        score,
        setScore,
        timeLeft,
        responses,
        addResponse, // Assurez-vous que cela est ici
        inputs,
        updateInput } = useContext(TeamNameContext);
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    // Réponses valides
    const validAnswers = ["Lune", "lune", "LUNE"];
    // Indice caché à Fivenir lorsque le bouton est cliqué
    const hint = "L'indice est : Ce mot éclaire les nuits sombres et peut être en croissant ou pleine. Renseignez le à votre guide, et pensez à remonter tout en haut de la maison afin de découvrir les DEUX indices suivants.";

    // Utilisez useEffect pour pré-remplir l'input avec la valeur de inputs.secondStep
    useEffect(() => {
        setInputValue(inputs.fiveStep);
    }, [inputs.fiveStep]);

    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            // Mettre à jour l'input dans le contexte
            updateInput('fiveStep', inputValue.trim()); // Mise à jour de l'input
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };
    // Passer à la page suivante
    const goToNextStep = () => {
        if (isValid) {
            navigate('/six-step');
        }
    };

    // Fonction pour obtenir un indice
    const getHint = () => {
        if (score >= 1000) {
            setScore(score - 1000); // Réduire le score de 1000
            alert(hint); // Afficher l'indice
        } else {
            alert("Désolé, vous n'avez pas assez de points pour obtenir un indice.");
        }
    };

    return (
        <div className='step-container'>
            <div className='welcome-section'>
                <h2>Bienvenue </h2>
                <h3>{teamName}</h3>
                <h4>Les mots cachés</h4>
                <div className="clue-container">
                    <div className="responsive-iframe-container">
                        <iframe
                            title="Vidéo explicative de la cinquième étape"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                border: 'none',
                                padding: 0,
                                margin: 0
                            }}
                            src="https://www.canva.com/design/DAGT0aUc8QY/LwuCLpobQ9sZQHjgEY7dcw/watch?embed"
                            allowFullScreen
                            allow="fullscreen"
                        />

                    </div>

                    <div className="bottom-content">
                        <h3 className="score">Score: {score}</h3>
                        <h3 className="chrono-display">Temps restant: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h3>

                    </div>

                    {/* Condition pour empêcher l'entrée d'un indice si le chrono n'est pas démarré */}
                    <p>Entrez l'indice pour débloquer l'étape suivante :</p>
                    <input
                        type="text"
                        value={inputValue} // Garde la saisie, même si le chrono n'est pas démarré
                        onChange={(e) => setInputValue(e.target.value)} // Mise à jour de l'input
                        placeholder="Entrez l'indice ici"
                        disabled={timeLeft <= 0} // Désactiver l'input si le temps est écoulé
                    />

                    <button onClick={handleValidation} disabled={timeLeft <= 0}>Valider</button>
                    <button onClick={goToNextStep} disabled={!isValid || timeLeft <= 0}>
                        Aller à l'étape suivante
                    </button>

                    {/* Bouton pour obtenir un indice en réduisant le score */}
                    <button onClick={getHint} disabled={timeLeft <= 0}>
                        Obtenir un Indice (-1000 points)
                    </button>

                </div></div>

            {/* Affichage des réponses Fivenies */}
            <div className="responses-container">
                <h3>Boîte à indices:</h3>
                <ul>
                    {responses.map((response, index) => (
                        <li key={index}>{response}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default FiveStep;
