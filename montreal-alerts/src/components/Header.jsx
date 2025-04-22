import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/Logo_montréal.svg.png'; // Assurez-vous d'avoir le logo dans vos assets

function Header() {
  return (
    <header style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #e0e0e0',
      padding: '1rem 0'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="Ville de Montréal" 
            style={{ height: '40px' }}
          />
        </Link>
        
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: 'none',
            background: 'none',
            color: '#242424',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
          onClick={() => alert('La fonctionnalité de connexion n\'est pas encore disponible.')}
        >
          <AccountCircleIcon />
          Mon compte
        </button>
      </div>
    </header>
  );
}

export default Header;

