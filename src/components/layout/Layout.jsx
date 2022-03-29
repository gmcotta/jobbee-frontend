import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

import Header from './Header';
import Footer from './Footer';

const Layout = ({ title = 'Jobbee - Find yout Job Now', children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ToastContainer position='bottom-right' />
      <Header />
        {children}
      <Footer />
    </div>
  );
}

export default Layout;
