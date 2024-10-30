import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext'; // Mettez à jour le chemin selon votre structure de projet

const RituelStep = () => {
    // Utilisation du contexte pour récupérer les valeurs
    const { teamName,
        responses,
        addResponse, // Assurez-vous que cela est ici
        inputs,
        updateInput,
        setIsGameOver } = useContext(TeamNameContext);
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
            setIsGameOver(true);
            navigate('/score-step');
            updateInput('rituelStep', inputValue.trim());
        } else {
            alert('Indice incorrect. Essayez encore!');
        }
    };

    // Gestion de l'ajout de réponse
    const handleAddResponse = () => {
        if (inputValue.trim()) {
            addResponse(inputValue); // Ajoute la réponse au contexte
            setInputValue(''); // Réinitialiser l'input
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
                <div className='clue-container'>
                    <p>Le mot à déverrouiller le cryptex que vous trouverez dans le manoir est : <strong>RITUEL</strong>.</p>
                    <p>Utilisez-le pour déverrouiller le cryptex dans le coffre que vous avez trouvé.</p>
                    <p>Entrez l'indice contenu dans le cryptex pour terminer le jeu :</p>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Entrez l'indice ici"
                    />
                    <button className="finalize-button" onClick={handleFinalSubmission}>
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
