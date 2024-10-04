import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav__logo">
        <img 
          src="/img/argentBankLogo.png" 
          alt="Argent Bank Logo" 
          className="main-nav__logo-image" 
        />
      </Link>
      <div className="main-nav__items">
        {isAuthenticated && profile ? (
          <>
            <Link to="/profile" className="main-nav__item">
              <i className="fa fa-user-circle"></i>
              {profile.firstName}
            </Link>
            <button onClick={handleLogout} className="main-nav__item main-nav__item--button">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="main-nav__item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;