import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';
import Timer from '../Timer'

const SevenStep = () => {
    const { teamName,
        score,
        setScore,
        responses,
        addResponse,
        inputs,
        updateInput } = useContext(TeamNameContext);
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    // Réponses valides
    const validAnswers = ["rêve", "Rêve", "reve", "Reve", "REVE", "RÊVE"];
    // Indice caché à Sevennir lorsque le bouton est cliqué
    const hint = "L'indice est : Un état où l'imaginaire prend le pas sur le réel, rempli de fantaisie et de possibilités infinies. Ce que vous vivez souvent pendant la nuit, lorsque votre esprit voyage au-delà de la réalité. Ce mot à deviner est à renseigner à votre guide, qui vous mènera à l'étape suivante afin de pouvoir effectuer le rituel.";

    useEffect(() => {
        setInputValue(inputs.sevenStep);
    }, [inputs.sevenStep]);

    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            // Mettre à jour l'input dans le contexte
            updateInput('sevenStep', inputValue.trim()); // Mise à jour de l'input
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };

    // Passer à la page suivante
    const goToNextStep = () => {
        if (isValid) {
            navigate('/ultimate-step');
        }
    };

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const handleTimerComplete = () => {
        setIsButtonDisabled(true);  // Désactive le bouton lorsque le timer est terminé
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
                <h3>dans votre guide virtuel</h3>
                <h4>Les fleurs du silence</h4>
                <div className="clue-container">
                    <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.2500%', paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px', willChange: 'transform' }}>
                        <iframe
                            title="Vidéo explicative de la septième étape"
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
                            src="https://www.canva.com/design/DAGT0o0IpyU/MPU04a2UosxnL5OO_H8IXw/watch?embed"
                            allowFullScreen
                            allow="fullscreen"
                        />
                    </div>

                    <div className="bottom-content">
                        <h3 className="score">Score: {score}</h3>
                        <div className="chrono-display"><Timer onTimerComplete={handleTimerComplete}/></div>

                    </div>

                    <p>Entrez l'indice pour débloquer l'étape suivante :</p>
                    <label htmlFor="input-hint"></label>
                    <input
                        id="input-hint"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Entrez l'indice ici"
                    />

                    <button onClick={handleValidation} >Valider</button>
                    <button onClick={goToNextStep} disabled={!isValid ||isButtonDisabled}>
                        Aller à l'étape suivante
                    </button>

                    <button onClick={getHint} >
                        Obtenir un Indice (-1000 points)
                    </button>

                </div></div>

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

export default SevenStep;
