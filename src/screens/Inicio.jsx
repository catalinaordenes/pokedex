import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

const Inicio = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div className='inicio-container'>
            <div className='center-content'>
                <img src={logo} alt='Logo' className='logo' />
                <button className='boton-inicio' 
                onClick={goToHome}>PRESS START</button>
            </div>
        </div>
    )
}

export default Inicio