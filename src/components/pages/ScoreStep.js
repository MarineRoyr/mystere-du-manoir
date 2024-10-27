import React, { useContext, useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';


const Score = () => {
    const { teamName, score, setTimeLeft } = useContext(TeamNameContext);
    const [userEmail, setUserEmail] = useState(''); // État pour stocker l'email de l'utilisateur

    // Arrête le chronomètre lorsque le composant est monté
    useEffect(() => {
        setTimeLeft(0);
    }, [setTimeLeft]);

    // Fonction pour envoyer un email via EmailJS
    const sendEmail = () => {
        if (!userEmail) {
            alert("Veuillez entrer votre email pour recevoir le score.");
            return;
        }

        const templateParams = {
            to_name: teamName,
            score: score,
            to_email: "gitesetcouvertdeslacs@gmail.com",  // L'adresse fixe de l'organisateur
            user_email: userEmail // L'adresse email de l'utilisateur
        };

        emailjs.send(
            'service_re5awgl',       // Remplacez par votre Service ID
            'template_vsjlcha',      // Remplacez par votre Template ID
            templateParams,
            'EfOQSaTvmWK8iU_L0'      // Remplacez par votre User ID
        )
            .then((response) => {
                console.log('Email envoyé avec succès !', response.status, response.text);
                alert("Score envoyé par email avec succès !");
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi de l'email :", error);
                alert("Échec de l'envoi de l'email.");
            });
    };

    return (
        <div className='step-container'>
            <div className='welcome-section'>
                <div className='clue-container'>
                    <h1 className="score-display" style={{ fontSize: '3rem' }}> Félicitations, aventuriers !  </h1>

                    <h2>Vous avez survécu au mystère du manoir, équipe {teamName} !</h2>
                    <p style={{ fontSize: '1.5rem' }}>Votre score final est : <strong>{score}</strong></p>
                    <p style={{ fontSize: '1.2rem' }}>Un grand bravo pour votre détermination et votre esprit d'équipe !</p>
                    <p style={{ fontSize: '1.2rem' }}>Vous avez su relever tous les défis et déverrouiller le mystère du manoir. Votre aventure a été épique et vous méritez d'être félicités !</p>
                    <p style={{ fontSize: '1.2rem' }}>Nous espérons vous revoir pour une nouvelle aventure pleine de surprises !</p>
                </div>

                {/* Formulaire pour recueillir l'email de l'utilisateur */}
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="userEmail">Votre email :</label>
                    <input
                        type="email"
                        id="userEmail"
                        placeholder="Entrez votre email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        style={{ padding: '8px', fontSize: '1rem', margin: '10px 0' }}
                    />
                </div>
                <div>
                    {/* Bouton pour envoyer l'email */}
                    <button onClick={sendEmail} style={{ padding: '10px 20px', fontSize: '1rem', marginTop: '20px' }}>
                        Recevoir votre Score par Email
                    </button></div>
            </div>
        </div>
    );
};

export default Score;
