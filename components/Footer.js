import React from 'react';
const Footer = ({ links, companyInfo }) => {
  return (
    <footer>
      <ul>
        <li>{companyInfo}</li>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.text}</a>
          </li>
        ))}
      </ul>
      
    </footer>
  );
};

export default Footer;
