import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';
import Timer from '../Timer';

const SecondStep = () => {
    const {
        teamName,
        score,
        setScore,
        responses,
        addResponse,
        inputs,
        updateInput
    } = useContext(TeamNameContext);

    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const validAnswers = ["theiere", "théière", "Théière", "theiere"];
    const hint = "L'indice est : Pensez à un objet qui contient du thé. Trouvez-le, et trouvez également un coffre dans la pièce où l'on range la vaisselle.";

    useEffect(() => {
        setInputValue(inputs.secondStep);
    }, [inputs.secondStep]);


    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            updateInput('secondStep', inputValue.trim());
        } else {
            setIsValid(false);
            alert('Indice incorrect. Essayez encore!');
        }
    };

    const goToNextStep = () => {
        if (isValid) {
            navigate('/third-step');
        }
    };

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const handleTimerComplete = () => {
        setIsButtonDisabled(true);  // Désactive le bouton lorsque le timer est terminé
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
        <div className='step-container'>
            <div className='welcome-section'>
                <h2>Bienvenue</h2>
                <h3>{teamName}</h3>
                <h3>dans votre guide virtuel</h3>
                <h4>Le Secret des visages oubliés</h4>
                <div className="clue-container">
                    <div className="responsive-iframe-container">
                        <iframe
                            title="Vidéo explicative de la deuxième étape"
                            src="https://www.canva.com/design/DAGTigmsw0Q/ac7Y3CxjJk6Ab2EdNs6zBQ/watch?embed"
                            allowFullScreen
                            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none' }}
                        />
                    </div>

                    <div className="bottom-content">
                        <h3 className="score">Score: {score}</h3>
                        <div className="chrono-display">
                            <Timer  onTimerComplete={handleTimerComplete}  /> {/* Timer sans interaction avec l'état du bouton */}
                        </div>
                    </div>

                    <p>Entrez l'indice pour débloquer l'étape suivante :</p>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            updateInput('secondStep', e.target.value);
                        }}
                        placeholder="Entrez l'indice ici"
                    />

                    <button onClick={handleValidation}>Valider</button>
                    <button onClick={goToNextStep} disabled={!isValid ||isButtonDisabled} >Aller à l'étape suivante</button>
                    <button onClick={getHint} disabled={score < 1000 }>Obtenir un Indice (-1000 points)</button>
                </div>
            </div>

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

export default SecondStep;
