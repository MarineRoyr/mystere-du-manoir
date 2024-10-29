import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';

const SecondStep = () => {
    const { teamName, score, setScore, timeLeft, addResponse, responses, inputs, updateInput } = useContext(TeamNameContext);
    const [inputValue, setInputValue] = useState(''); // Déclaration de inputValue
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const validAnswers = ["theiere", "théière", "Théière", "theiere"];
    const hint = "L'indice est : Pensez à un objet qui contient du thé. Trouvez le, et trouvez également un coffre dans la pièce où l'on range la vaisselle.";

    // Utilisez useEffect pour pré-remplir l'input avec la valeur de inputs.secondStep
    useEffect(() => {
        setInputValue(inputs.secondStep);
    }, [inputs.secondStep]);

    const handleValidation = () => {
        if (validAnswers.includes(inputValue.trim())) {
            setIsValid(true);
            addResponse(inputValue.trim());
            // Mettre à jour l'input dans le contexte
            updateInput('secondStep', inputValue.trim()); // Mise à jour de l'input
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
                <h2>Bienvenue </h2>
                <h3>{teamName}</h3>
                <h4>Le Secret des visages oubliés</h4>
                <div className="clue-container">
                    <div className="responsive-iframe-container">
                        <iframe
                            title="Vidéo explicative de la deuxième étape"
                            src="https://www.canva.com/design/DAGTigmsw0Q/ac7Y3CxjJk6Ab2EdNs6zBQ/watch?embed"
                            allowFullScreen
                            allow="fullscreen"
                            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                        />
                    </div>

                    <div className="bottom-content">
                        <h3 className="score">Score: {score}</h3>
                        <h3 className="chrono-display">Temps restant: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h3>
                    </div>

                    <p>Entrez l'indice pour débloquer l'étape suivante :</p>
                    <input
                        type="text"
                        value={inputValue} // Utiliser l'input stocké dans l'état local
                        onChange={(e) => {
                            setInputValue(e.target.value); // Mettre à jour l'état local
                            updateInput('secondStep', e.target.value); // Mettre à jour l'input dans le contexte
                        }}
                        placeholder="Entrez l'indice ici"
                        disabled={timeLeft <= 0}
                    />

                    <button className="validate-button" onClick={handleValidation} disabled={timeLeft <= 0}>Valider</button>
                    <button className="next-button" onClick={goToNextStep} disabled={!isValid || timeLeft <= 0}>
                        Aller à l'étape suivante
                    </button>

                    <button className="hint-button" onClick={getHint} disabled={timeLeft <= 0}>
                        Obtenir un Indice (-1000 points)
                    </button>
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
