import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/App.css';


const Error = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            color: '#f8f8f8' // Couleur du texte
        }}>
            <main>
                <div style={{
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '3rem', color: '#f8f8f8' }}>404</h2>
                    <p style={{ fontSize: '1.5rem', color: '#f8f8f8' }}>Oups! La page que vous demandez n'existe pas.</p>
                    <Link to='/' style={{
                        color: 'white',
                        backgroundColor: '#007bff', // Couleur de fond pour le lien
                        padding: '10px 20px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}>
                        Retourner sur la page d’accueil
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Error;