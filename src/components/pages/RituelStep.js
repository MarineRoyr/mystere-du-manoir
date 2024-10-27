import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';

const RituelStep = () => {
    const { teamName, responses, setIsGameOver } = useContext(TeamNameContext); // Utilisez setIsGameOver ici
    const [inputValue, setInputValue] = useState('');
    const [isFinalValid, setIsFinalValid] = useState(false); // Pour valider l'entrée finale
    const navigate = useNavigate();

    // Mot à deviner pour terminer le jeu
    const finalAnswer = "UNION";

    // Fonction pour gérer la validation de l'indice
    const handleFinalSubmission = () => {
        if (inputValue.trim().toUpperCase() === finalAnswer) {
            setIsFinalValid(true);
            setIsGameOver(true); // Utilisez setIsGameOver pour marquer le jeu comme terminé
            handleScorePage(); // Redirige vers la page des scores après validation
        } else {
            alert('Indice incorrect. Essayez encore!');
        }
    };

    // Fonction pour rediriger vers la page des scores
    const handleScorePage = () => {
        if (isFinalValid) {
            navigate('/score-step'); // Naviguer vers la page des scores
        }
    };

    return (
        <div className='step-container'>
            <div className='welcome-section'>
                <h2>Bienvenue </h2>
                <h3>{teamName}</h3>
                <div className='clue-container'>
                    <p>Le mot à déverrouiller le cryptex que vous trouverez dans le manoir est : <strong>RITUEL</strong>.</p>
                    <p>Utilisez-le pour déverrouiller le cryptex dans le coffre que vous avez trouvé.</p>
                    <p>Entrez l'indice contenu dans le cryptex pour terminer le jeu :</p>
                    <input
                        type="text"
                        value={inputValue} // Garder la saisie
                        onChange={(e) => setInputValue(e.target.value)} // Mise à jour de l'input
                        placeholder="Entrez l'indice ici"
                    />
                    <button className="finalize-button" onClick={handleFinalSubmission}>
                        Libérons ensemble le manoir grâce au mot clé du cryptex
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

export default RituelStep;
