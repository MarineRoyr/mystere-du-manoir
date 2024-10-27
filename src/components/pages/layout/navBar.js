import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <nav>
            <div className='nav-container'>

                <Link to="/"> <button> Accueil </button></Link>

            </div>

        </nav>
    );
}

export default NavBar