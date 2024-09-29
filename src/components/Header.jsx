// Header.jsx

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions'; // Mise à jour de l'import

const Header = () => {
  const { profile } = useSelector((state) => state.user); // Changé pour utiliser le state user
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav__logo">
        <img src="/img/argentBankLogo.png" alt="Argent Bank Logo" className="main-nav__logo-image" />
      </Link>
      <div className="main-nav__items">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="main-nav__item">{profile?.firstName}</Link>
            <button onClick={handleLogout} className="main-nav__item main-nav__item--button">Sign Out</button>
          </>
        ) : (
          <Link to="/login" className="main-nav__item">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;