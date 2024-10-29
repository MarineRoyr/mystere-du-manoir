import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';

const FirstStep = () => {
    const { teamName, score, setScore, timeLeft, setResponses, responses, startTimer } = useContext(TeamNameContext);
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    // Réponses valides
    const validAnswers = ["Bougie", "bougie"];
    // Indice caché à fournir lorsque le bouton est cliqué
    const hint = "L'indice est : Pensez à une source de lumière.";

    // Validation de l'indice
    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            setResponses((prevResponses) => [...prevResponses, inputValue.trim()]); // Ajouter la réponse à la liste
            setInputValue(''); // Réinitialiser le champ de saisie
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };

    // Passer à la page suivante
    const goToNextStep = () => {
        if (isValid) {
            navigate('/second-step');
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
        <div className="step-container">
            <div className="welcome-section">
                <h2>Bienvenue </h2>
                <h3>{teamName}</h3>
                <h4> Au Commencement</h4>
            </div>

            {/* Clue Container */}
            <div className="clue-container">


                {/* Conteneur de la vidéo avec effet arrondi */}
                <div className="responsive-iframe-container">
                    <iframe
                        title="Vidéo explicative de la première étape"
                        src="https://www.canva.com/design/DAGNWTa9L0k/HktgB8trjriT564GR1jCZA/watch?embed"
                        allowFullScreen
                        allow="fullscreen"
                    ></iframe>
                </div>

                {/* Contenu supplémentaire dans clue-container */}
                <div className="bottom-content">
                    <h3 className="score">Score: {score}</h3>
                    <button className="chrono" onClick={startTimer}>Démarrer le Chronomètre</button>
                    <h3 className="chrono-display">Temps restant: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h3>

                </div>

                <p>Décoder cette lettre vous permettra de découvrir les premiers indices liés au mystère de la disparition de Laura.</p><p> Cela vous conduira au premier objet ou indice nécessaire pour avancer à l'étape suivante</p>

                <p>Entrez l'indice pour débloquer l'étape suivante (le chronomètre doit être démarré) :</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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

            {/* Boîte à indices en dehors de clue-container */}
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
