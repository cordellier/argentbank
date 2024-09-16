// Header.jsx

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav__logo">
        <img src="../../public/img/argentBankLogo.png" alt="Argent Bank Logo" className="main-nav__logo-image" />
      </Link>
      <div className="main-nav__items">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="main-nav__item">{user.firstName}</Link>
            <button onClick={() => dispatch(logout())} className="main-nav__item main-nav__item--button">Sign Out</button>
          </>
        ) : (
          <Link to="/login" className="main-nav__item">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;