import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };
  
// Fonction pour capitaliser la première lettre d'un mot
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Fonction pour extraire le prénom de l'email
const getFirstNameFromEmail = (email) => {
  return capitalize(email.split('@')[0].split('.')[0]);
};

// Utilise le prénom extrait de l'email si firstName est null ou undefined
const displayName = profile?.firstName
  ? capitalize(profile.firstName)
  : profile?.email
  ? getFirstNameFromEmail(profile.email)
  : '';


  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img 
          src="/img/argentBankLogo.png" 
          alt="Argent Bank Logo" 
          className="main-nav-logo-image" 
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated && profile ? (
          <>
            <Link to="/profile" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              {displayName}
            </Link>
            <button onClick={handleLogout} className="main-nav-item main-nav-button">
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;