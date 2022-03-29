import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { loading, user, logout } = useAuth();

  const logoutHandler = () => {
    logout();
  }

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link passHref href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">bee</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link passHref href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="dropdown-ml-3">
              <a 
                id="dropdown-menu" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false" 
                className="btn dropdown-toggle mr-4"
              >
                <span>Hi, {user.first_name}</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown-menu">
                <Link passHref href="/employer/jobs">
                  <a className="dropdown-item">
                    My Jobs
                  </a>
                </Link>
                <Link passHref href="/me/applied">
                  <a className="dropdown-item">
                    Jobs Applied
                  </a>
                </Link>
                <Link passHref href="/me">
                  <a className="dropdown-item">
                    Profile
                  </a>
                </Link>
                <Link passHref href="/upload/resume">
                  <a className="dropdown-item">
                    Upload Resume
                  </a>
                </Link>
                <Link passHref href="/">
                  <a 
                    className="dropdown-item text-danger" 
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link passHref href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
