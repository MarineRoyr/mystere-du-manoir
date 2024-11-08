import React, { useContext, useState } from 'react';
import emailjs from 'emailjs-com';
import { TeamNameContext } from '../TeamNameContext';
import '../../styles/step.css';


const Score = () => {
    const { teamName,
        score} = useContext(TeamNameContext);
    const [userEmail, setUserEmail] = useState(''); // État pour stocker l'email de l'utilisateur



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
                            src="https://www.canva.com/design/DAGUx4Aj6Fo/OUDtgboWJbYZDhwAFEpHMw/watch?embed"
                            allowFullScreen
                            allow="fullscreen"
                        />
                    </div>

                    <p style={{ fontSize: '1.5rem' }}>Votre score final est : <strong>{score}</strong></p>
                    <p style={{ fontSize: '1.2rem' }}>Un grand bravo pour votre détermination et votre esprit d'équipe ...</p>
                    <p style={{ fontSize: '1.2rem' }}>Vous avez su relever tous les défis et déverrouiller le mystère du manoir. Aujourd'hui, le Manoir et Laura sont libérés de la malédiction grâce à vous ! Votre aventure fut épique et vous méritez d'être félicités.</p>
                    <p style={{ fontSize: '1.2rem' }}>Nous espérons vous revoir pour une nouvelle aventure pleine de surprises !</p>
                </div>

                {/* Formulaire pour recueillir l'email de l'utilisateur */}
                <div style={{ marginTop: '20px', paddingTop: '10px' }}>
                    <label htmlFor="userEmail">Votre email </label><br />
                    <input
                        type="email"
                        id="userEmail"
                        placeholder="Entrez votre email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        style={{ padding: '8px', fontSize: '18px' }}
                    />
                </div>
                <div>
                    {/* Bouton pour envoyer l'email */}
                    <button onClick={sendEmail} style={{ marginLeft: '10%', padding: '10px 20px', fontSize: '20px' }}>
                        Recevoir votre Score par Email
                    </button></div>
            </div>
        </div>
    );
};

export default Score;
