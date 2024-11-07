import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import TimerDisplay from '../TimerDisplay'; // Importer le nouveau composant TimerDisplay
import '../../styles/step.css';

const FirstStep = () => {
    const {
        teamName,
        score,
        setScore,
        responses,
        addResponse,
        inputs,
        updateInput,
    } = useContext(TeamNameContext);

    const [inputValue, setInputValue] = useState(inputs.firstStep || '');
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    // Liste des réponses valides pour cette étape
    const validAnswers = ["Bougie", "bougie"];
    const hint = "L'indice est : Pensez à une source de lumière.";

    // Pré-remplir l'input avec la valeur de firstStep depuis le contexte au chargement
    useEffect(() => {
        setInputValue(inputs.firstStep || '');
    }, [inputs.firstStep]);

    // Fonction de validation de la réponse
    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);                   // Marquer comme valide
            addResponse(inputValue.trim());      // Ajouter la réponse au contexte
            updateInput('firstStep', inputValue.trim()); // Sauvegarder la réponse
        } else {
            setIsValid(false);                   // Réinitialiser la validation si la réponse est incorrecte
            alert('Indice incorrect. Essayez encore!');
        }
    };

    // Fonction pour passer à l'étape suivante si la réponse est correcte
    const goToNextStep = () => {
        if (isValid) {
            navigate('/second-step');            // Naviguer vers la deuxième étape
        }
    };

    // Fonction pour obtenir un indice en échange de points
    const getHint = () => {
        if (score >= 1000) {                     // Vérifie que le score est suffisant
            setScore(score - 1000);              // Réduire le score de 1000 points
            alert(hint);                         // Afficher l'indice
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
                        style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none' }}
                    ></iframe>
                </div>

                {/* Affichage du score */}
                <div className="bottom-content">
                   

                    {/* Intégration du composant TimerDisplay */}
                    <TimerDisplay />
                </div>

                {/* Instructions pour l'utilisateur */}
                <p>Décoder cette lettre vous permettra de découvrir les premiers indices liés au mystère de la disparition de Laura.</p>
                <p>Entrez l'indice pour débloquer l'étape suivante (le chronomètre doit être démarré) :</p>

                {/* Champ de saisie de l'indice */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        updateInput('firstStep', e.target.value); // Mettre à jour l'input dans le contexte
                    }}
                    placeholder="Entrez l'indice ici"
                    disabled={false} // Toujours actif, le chrono est géré par TimerDisplay
                />

                {/* Boutons d'actions */}
                <button onClick={handleValidation}>Valider</button>
                <button onClick={goToNextStep} disabled={!isValid}>
                    Aller à l'étape suivante
                </button>
                <button onClick={getHint} disabled={score < 1000}>
                    Obtenir un Indice (-1000 points)
                </button>
            </div>

            {/* Boîte à indices avec affichage des réponses validées */}
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
