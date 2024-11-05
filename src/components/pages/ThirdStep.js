import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';
import Timer from '../Timer'

const ThirdStep = () => {
    const { teamName,
        score,
        setScore,
        responses,
        addResponse,
        inputs,
        updateInput // Assurez-vous que cela est ici
    } = useContext(TeamNameContext);
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    // Réponses valides
    const validAnswers = ["eventail", "Eventail", "éventail", "Éventail"];
    // Indice caché à fournir lorsque le bouton est cliqué
    const hint = "L'indice est : Pensez à un objet qu'on secoue pour faire du vent et de se rafraîchir. Il est important de le renseigner à votre guide, et d'en chercher un au premier étage, au sein d'un lieu aux couleurs vives.";
    useEffect(() => {
        setInputValue(inputs.thirdStep);
    }, [inputs.thirdStep]);

    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            // Mettre à jour l'input dans le contexte
            updateInput('thirdStep', inputValue.trim()); // Mise à jour de l'input
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };
    // Passer à la page suivante
    const goToNextStep = () => {
        if (isValid) {
            navigate('/four-step');
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
                <h2>Bienvenue</h2> <h3>{teamName}</h3>
                <h4>Le Réconfort d'une pause ...</h4>
                <div className="clue-container">
                    <div className="responsive-iframe-container">
                        <iframe
                            title="Vidéo explicative de la troisième étape"
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
                            src="https://www.canva.com/design/DAGT0Ed-_BQ/ij9ACYO2lPMiluLmkrk0AQ/watch?embed"
                            allowFullScreen
                            allow="fullscreen"
                        ></iframe>
                    </div>

                    <div className="bottom-content">
                        <h3 className="score">Score: {score}</h3>
                        <div className="chrono-display">
                             <Timer />
                        </div>

                    </div>


                    {/* Condition pour empêcher l'entrée d'un indice si le chrono n'est pas démarré */}
                    <p>Entrez l'indice pour débloquer l'étape suivante :</p>
                    <input
                        type="text"
                        value={inputValue} // Garde la saisie, même si le chrono n'est pas démarré
                        onChange={(e) => setInputValue(e.target.value)} // Mise à jour de l'input
                        placeholder="Entrez l'indice ici"
                    />

                    <button onClick={handleValidation} >Valider</button>
                    <button onClick={goToNextStep} >
                        Aller à l'étape suivante
                    </button>

                    {/* Bouton pour obtenir un indice en réduisant le score */}
                    <button onClick={getHint} >
                        Obtenir un Indice (-1000 points)
                    </button>

                </div></div>

            {/* Affichage des réponses fournies */}
            <div className="responses-container">
                <h3>Boîte à indices :</h3>
                <ul>
                    {responses.map((response, index) => (
                        <li key={index}>{response}</li>
                    ))}
                </ul>
            </div>


        </div>
    );
};

export default ThirdStep;
