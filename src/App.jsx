import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { loginSuccess } from './store/authSlice';
import { getUserProfile } from './services/api';
import { setUserProfile } from './store/userSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profil';
import Transaction from './pages/Transaction';
import './styles/main.scss';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess(token));
      getUserProfile(token)
        .then(profileData => {
          dispatch(setUserProfile(profileData.body));
        })
        .catch(error => {
          console.error('Failed to fetch user profile:', error);
        });
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions/:id" element={<Transaction />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;