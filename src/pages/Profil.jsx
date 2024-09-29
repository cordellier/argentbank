import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUser } from '../store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import AccountCardData from '../data/AccountCardData.json';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile, isLoading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (isAuthenticated && !profile) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, profile, dispatch]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUser({ firstName, lastName }));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update name:', error);
    }
  };

  if (!profile) return null;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{profile.firstName} {profile.lastName}!</h1>
        {isEditing ? (
          <div className="edit-inputs">
            <div className="input-wrapper">
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Tony" />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Jarvis" />
            </div>
            <div className="button-wrapper">
              <button className="edit-button" onClick={handleSave}>Save</button>
              <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit Name</button>
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