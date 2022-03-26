import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-1">
      <p className="text-center mt-1">
        <span className="mr-4">
          Jobbee - 2021-2022, All Rights Reserved
        </span>
        <Link
          rel="noreferrer"
          target="_blank"
          passHref
          href="https://storyset.com/people"
        >
          People illustrations by Storyset
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
