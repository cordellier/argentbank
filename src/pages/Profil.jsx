import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile } from '../store/userSlice';
import { getUserProfile, updateUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!profile) {
      const fetchUserProfile = async () => {
        try {
          const data = await getUserProfile(token);
          dispatch(setUserProfile(data.body));
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [isAuthenticated, token, profile, dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      setNewFirstName(profile.firstName);
      setNewLastName(profile.lastName);
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await updateUserProfile(token, newFirstName, newLastName);
      dispatch(setUserProfile(updatedProfile.body));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update username:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

// Fonction pour capitaliser la première lettre d'un mot
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Fonction pour extraire le prénom et le nom de l'email
const getNameFromEmail = (email) => {
  const [name, domain] = email.split('@');
  const [firstName, ...lastNameParts] = name.split('.');
  const lastName = lastNameParts.join(' ') || domain.split('.')[0];
  return {
    firstName: capitalize(firstName),
    lastName: capitalize(lastName),
  };
};

// Utilise le nom extrait de l'email si firstName ou lastName est null
const displayName = profile.firstName && profile.lastName
  ? {
      firstName: capitalize(profile.firstName),
      lastName: capitalize(profile.lastName),
    }
  : getNameFromEmail(profile.email);


  return (
    <main className="main bg-dark">
      <div className="header">
      <h1>Welcome back<br />{displayName.firstName} {displayName.lastName}!</h1>
        {isEditing ? (
          <div className="edit-name-content">
            <div className="edit-name-inputs">
              <input
                type="text"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                placeholder="Firstname"
              />
              <input
                type="text"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                placeholder="Lastname"
              />
            </div>
            <div className="edit-name-buttons">
              <button onClick={handleSave} className="edit-button-save">Save</button>
              <button onClick={() => setIsEditing(false)} className="edit-button-cancel">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={handleEdit} className="edit-button">Edit Name</button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={() => navigate('/transactions/checking')}>View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={() => navigate('/transactions/savings')}>View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={() => navigate('/transactions/credit-card')}>View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;