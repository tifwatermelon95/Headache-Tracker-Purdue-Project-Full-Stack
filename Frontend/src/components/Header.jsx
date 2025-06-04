import React from 'react';
import brainImage from '../assets/brain.png';
import {useNavigate} from 'react-router-dom';


function Header(){
    const navigate = useNavigate();

    return (
        <div className = "header-container"> 
            <div className = "brain-image-container">
                <img src={brainImage} alt="brain" className = "brain-image" />
            </div>
            <header className = "webapp-header">
                <h1 className = "header-title">Headache Tracker𓂃🖊</h1>
                <nav>  
                    <button onClick={() => navigate('/')}>HOME</button>
                    <button onClick={() => navigate('/entries')}>ENTRIES</button>
                    <button onClick={() => navigate('/stats')}>STATS</button>
                </nav>
            </header>
        </div>

        

    );

}

export default Header;

