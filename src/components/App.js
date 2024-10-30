import React, { useContext, useState } from 'react';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from './TeamNameContext'; // Import du contexte

function App() {
  // Extraction des valeurs nécessaires depuis le contexte
  const {
    setTeamName,
    resetLocalStorage } = useContext(TeamNameContext); // Utilisation de `useContext` pour récupérer setTeamName et resetLocalStorage
  const [input, setInput] = useState(''); // État pour capturer le nom de l'équipe
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      alert("Veuillez entrer un nom d'équipe valide.");
      return; // Ne pas continuer si le champ est vide
    }
    setTeamName(input); // Mettre à jour le nom de l'équipe dans le contexte
    navigate('/first-step'); // Naviguer vers la première étape
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Le mystère du Manoir</h1>
        <p>Avant de plonger dans votre enquête, n'oubliez pas de regarder cette vidéo d'introduction !</p>
        <div className="responsive-iframe-container">
          <iframe
            title="Vidéo explicative de la première étape"
            src="https://www.canva.com/design/DAGNV6RUHm0/bF9yG_6hMKL9IvBNTkACKw/watch?embed"
            allowFullScreen
            allow="fullscreen"
            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none' }}
          ></iframe>
        </div>

        {/* Formulaire pour entrer le nom de l'équipe */}
        <h3>Entrez le nom de votre équipe</h3>
        <div className="form-team">
          <form className="App-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Quel nom d'équipe ?"
            />
            <button type="submit">Enregistrer et Aller à la première étape</button>
          </form>

          {/* Bouton pour remettre à zéro le local storage */}
          <button onClick={resetLocalStorage} style={{ marginTop: '20px' }}>
            Réinitialiser la session A ZERO
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
