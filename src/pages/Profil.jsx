// Profile.jsx

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, updateUsername } from '../store/userSlice';
import { getUserProfile, updateUserProfile } from '../services/api';
import AccountCardData from '../data/AccountCardData.json';

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

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

  const handleEdit = () => {
    setIsEditing(true);
    setNewUsername(profile.userName);
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(token, newUsername);
      dispatch(updateUsername(newUsername));
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
        <h1>Welcome back<br />{profile.firstName} {profile.lastName}!</h1>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={handleSave} className="edit-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="edit-button">Cancel</button>
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
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Profile;