// Profile.jsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile } from '../store/userSlice';
import { getUserProfile, updateUserProfile } from '../services/api';
import AccountCardData from '../data/AccountCardData.json';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(token);
        dispatch(setUserProfile(data.body));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    if (token && !profile) {
      fetchUserProfile();
    }
  }, [token, profile, dispatch]);

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

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back</h1>
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
              <button onClick={handleSave} className="edit-button">Save</button>
              <button onClick={() => setIsEditing(false)} className="edit-button">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={handleEdit} className="edit-button">Edit Name</button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {AccountCardData.map((account) => (
        <section className="account" key={account.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={() => navigate(`/transactions/${account.id}`)}>View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Profile;