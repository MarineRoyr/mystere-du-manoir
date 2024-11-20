import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';
import Timer from '../Timer'

const SixStep = () => {
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
    const validAnswers = ["Innocence", "innocence", "INNOCENCE"];
    // Indice caché à Sixnir lorsque le bouton est cliqué
    const hint = "L'indice est : Une qualité souvent associée à l'enfance, symbolisant la pureté et l'absence de malice.Ce que l'on perd parfois avec l'âge, souvent lié à la perception de la moralité. Cherchez ensuite sur la pièce palière au 1er étage, un bouquet de fleurs vous y attend avec de nouvelles surprises. ";

    useEffect(() => {
        setInputValue(inputs.sixStep);
    }, [inputs.sixStep]);

    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            // Mettre à jour l'input dans le contexte
            updateInput('sixStep', inputValue.trim()); // Mise à jour de l'input
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };

    // Passer à la page suivante
    const goToNextStep = () => {
        if (isValid) {
            navigate('/seven-step');
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
                <h4>Les pensées oubliées</h4>
                <div className="clue-container">
                    <div className="responsive-iframe-container">
                        <iframe
                            title="Vidéo explicative de la sixieme étape"
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
                            src="https://www.canva.com/design/DAGT0Z14d9w/bXpfYvR3jNLUrSkeh62c6w/watch?embed"
                            allowFullScreen
                            allow="fullscreen"
                        />

                    </div>

                    <div className="bottom-content">
                    <h3 className="score">Score: {score}</h3>
                        <div className="chrono-display"><Timer onTimerComplete={handleTimerComplete} /></div>

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
                    <button onClick={goToNextStep} disabled={!isValid ||isButtonDisabled}>
                        Aller à l'étape suivante
                    </button>

                    {/* Bouton pour obtenir un indice en réduisant le score */}
                    <button onClick={getHint} >
                        Obtenir un Indice (-1000 points)
                    </button>

                </div></div>

            {/* Affichage des réponses Sixnies */}
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

export default SixStep;
