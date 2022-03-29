import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, user, clearErrors } = useAuth();

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    };
  }, [user, error, clearErrors]);

  const submitHandler = async (evt) => {
    evt.preventDefault();
    await register({ firstName, lastName, email, password });
  }

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image 
              priority="true" 
              layout="fill" 
              src="/images/profile.svg" 
              alt="register" 
            />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2>Profile</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-user"></i>
                  <input 
                    type="text" 
                    placeholder="Enter First Name" 
                    required 
                    value={firstName}
                    onChange={(evt) => setFirstName(evt.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-user-tie"></i>
                  <input 
                    type="text" 
                    placeholder="Enter Last name" 
                    required 
                    value={lastName}
                    onChange={(evt) => setLastName(evt.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    placeholder="Enter Your Email" 
                    required 
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    title="Your email is invalid"
                    pattern='\S+@\S+\.\S+'
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    value={password}
                    minLength={6}
                    onChange={(evt) => setPassword(evt.target.value)}
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
