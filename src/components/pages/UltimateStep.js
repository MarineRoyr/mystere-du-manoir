import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';

const UltimateStep = () => {
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
    const validAnswers = ["liberte", "liberté", "Liberté", "Liberte", "LIBERTÉ", "LIBERTE"];
    // Indice caché à fournir lorsque le bouton est cliqué
    const hint = "L'indice est : Prenez toutes les premières lettres des mots de votre boîte à outil et tentez de trouver le mot recherché, qui commence par L et finit par E, un état d'être que toute l'humanité souhaite, le contraire de l'esclavage. Renseignez le à votre guide afin d'obtenir le code qui permettra de déverouiller le cryptex contenu dans le coffre que vous trouverez à l'étage sous l'un des lits du Manoir";
    useEffect(() => {
        setInputValue(inputs.ultimateStep);
    }, [inputs.ultimateStep]);

    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            // Mettre à jour l'input dans le contexte
            updateInput('ultimateStep', inputValue.trim()); // Mise à jour de l'input
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };
    // Passer à la page suivante
    const goToNextStep = () => {
        if (isValid) {
            navigate('/rituel-step');
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
                <h4>Les derniers indices</h4>
                <div className="clue-container">
                    <div className="responsive-iframe-container">
                        <iframe
                            title="Vidéo explicative de la dernière étape"
                            src="https://www.canva.com/design/DAGT2GXjyNE/KVQq9bAD1iE2Gox_R4JNPQ/watch?embed"
                            allowFullScreen
                            allow="fullscreen"
                            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                        />
                    </div>

                    {/* Section du score et du temps restant */}
                    <div className="bottom-content">
                        <h3 className="score">Score: {score}</h3>
                        <h3 className="chrono-display">Temps restant: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h3>

                    </div>

                    <p>Entrez l'indice pour débloquer l'étape suivante :</p>
                    <input
                        type="text"
                        value={inputValue} // Garde la saisie, même si le chrono n'est pas démarré
                        onChange={(e) => setInputValue(e.target.value)} // Mise à jour de l'input
                        placeholder="Entrez l'indice ici"
                        disabled={timeLeft <= 0} // Désactiver l'input si le temps est écoulé
                    />

                    <button className="validate-button" onClick={handleValidation} disabled={timeLeft <= 0}>Valider</button>
                    <button className="next-button" onClick={goToNextStep} disabled={!isValid || timeLeft <= 0}>
                        Aller à l'étape suivante
                    </button>

                    {/* Bouton pour obtenir un indice en réduisant le score */}
                    <button className="hint-button" onClick={getHint} disabled={timeLeft <= 0}>
                        Obtenir un Indice (-1000 points)
                    </button>
                </div>
            </div>
            {/* Affichage des réponses fournies */}
            <div className="responses-container">
                <h3>Boîte à indices</h3>
                <ul>
                    {responses.map((response, index) => (
                        <li key={index}>{response}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UltimateStep