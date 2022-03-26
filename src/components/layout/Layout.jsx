import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ title = 'Jobbee - Find yout Job Now', children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
