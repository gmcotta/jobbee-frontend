import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { loading, error, isAuthenticated, login, clearErrors } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    };
    if (isAuthenticated && !loading) router.push('/');
  }, [isAuthenticated, error, loading, router, clearErrors]);

  const submitHandler = async (evt) => {
    evt.preventDefault();
    await login({ username: email, password });
  }

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image 
              priority="true" 
              layout="fill" 
              src="/images/login.svg" 
              alt="login" 
            />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> LOGIN</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
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
                    onChange={(evt) => setPassword(evt.target.value)}
                  />
                </div>
              </div>
              <div className="loginButtonWrapper">
                <button type="submit" className="loginButton">
                  {loading ? 'Authenticating' : 'Login'}
                </button>
              </div>
              <p style={{ textDecoration: "none" }} className="signup">
                New to Jobbee? <Link passHref href="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
