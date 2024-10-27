import React, { useContext, useState } from 'react';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import { TeamNameContext } from './TeamNameContext'; // Import du contexte

function App() {
  const { setTeamName } = useContext(TeamNameContext); // Utilisation du contexte pour mettre à jour le nom de l'équipe
  const [input, setInput] = useState(''); // État pour capturer le nom d'équipe
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      alert('Veuillez entrer un nom d\'équipe valide.');
      return; // Ne pas continuer si le champ est vide
    }
    setTeamName(input); // Mettre à jour le nom dans le contexte
    navigate('/first-step'); // Naviguer vers la première étape
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Le mystère du Manoir</h1>
        <p >Avant de plonger dans votre enquête, n'oubliez pas de regarder cette vidéo d'introduction !</p>
        <div className="responsive-iframe-container">
          <iframe
            loading="lazy"
            title="Vidéo explicative de la première étape"
            src="https://www.canva.com/design/DAGNV6RUHm0/bF9yG_6hMKL9IvBNTkACKw/watch?embed"
            allowFullScreen
            allow="fullscreen"
          ></iframe>
        </div>
        <h3>Entrez le nom de votre équipe</h3>
        <div className='form-team'>
          <form className="App-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Quel nom d'équipe ?"
            />
            <button type="submit">Enregistrer et Aller à la première étape</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
