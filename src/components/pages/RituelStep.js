import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext'; 
import Timer from '../Timer';

const RituelStep = () => {
    const { 
        teamName,
        responses,
        addResponse,
        inputs,
        updateInput,
        markGameOver // Utilisez la fonction pour marquer la fin du jeu
    } = useContext(TeamNameContext);
    
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const finalAnswer = "UNION";

    // Mise à jour de l'inputValue à partir de inputs.rituelStep
    useEffect(() => {
        if (inputs?.rituelStep) {
            setInputValue(inputs.rituelStep);
        }
    }, [inputs]);

    // Gestion de la soumission finale
    const handleFinalSubmission = () => {
        if (inputValue.trim().toUpperCase() === finalAnswer) {
            markGameOver(); // Appeler cette fonction pour marquer le jeu comme terminé
            updateInput('rituelStep', inputValue.trim());
            navigate('/score-step');
        } else {
            alert('Indice incorrect. Essayez encore!');
        }
    };

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const handleTimerComplete = () => {
        setIsButtonDisabled(true);  // Désactive le bouton lorsque le timer est terminé
    };


    // Gestion de l'ajout de réponse
    const handleAddResponse = () => {
        if (inputValue.trim()) {
            addResponse(inputValue);
            setInputValue('');
        } else {
            alert('Veuillez entrer un indice valide.');
        }
    };

    return (
        <div className='step-container'>
            <div className='welcome-section'>
                <h2>Bienvenue</h2>
                <h3>{teamName}</h3>
                <h4>Le Rituel</h4>
                <div className='chrono-display'><Timer onTimerComplete={handleTimerComplete} /></div>
                <div className='clue-container'>
                    <p>Le mot à déverrouiller le cryptex que vous trouverez dans le manoir est : <strong>RITUEL</strong>.</p>
                    <p>Utilisez-le pour déverrouiller le cryptex dans le coffre que vous avez trouvé.</p>
                    <p>Une fois le RITUEL TERMINE ...</p>
                    <p>Vous pourrez entrer l'indice contenu dans le cryptex pour terminer le jeu, ci dessous :</p>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Entrez l'indice ici"
                    />
                    <button className="finalize-button" onClick={handleFinalSubmission} disabled={isButtonDisabled}>
                        Libérons ensemble le manoir grâce au mot clé du cryptex
                    </button>
                    <button className="add-response-button" onClick={handleAddResponse}>
                        Ajouter à la boîte à indices
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

export default RituelStep;
