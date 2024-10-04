import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFail } from '../store/authSlice';
import { setUserProfile } from '../store/userSlice';
import { login, getUserProfile } from '../services/api';
import { isValidEmail, isValidPassword } from '../utils/regex';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must contain at least 3 characters, including letters and numbers');
      return;
    }

    try {
      const loginData = await login(email, password);
      dispatch(loginSuccess(loginData.body.token));

      // Fetch user profile immediately after successful login
      const profileData = await getUserProfile(loginData.body.token);
      dispatch(setUserProfile(profileData.body));

      // If "Remember me" is checked, you could save the token in localStorage here
      if (rememberMe) {
        localStorage.setItem('token', loginData.body.token);
      }

      navigate('/profile');
    } catch (err) {
      dispatch(loginFail(err.response?.data?.message || 'Login failed'));
      setError('Invalid email or password');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default Login;