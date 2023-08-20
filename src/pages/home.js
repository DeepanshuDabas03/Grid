import Suggestion from "../../components/home";
import React from 'react'
import NavBar from "../../components/Header";
import Footer from "../../components/Footer";
const links = [
  { url: '/about', text: 'About' },
  { url: '/contact', text: 'Contact' },
  { url: '/terms', text: 'Terms of Service' },
];
const companyInfo = 'Copyright © 2023 Snatkart';
const suggestions = () => {
  return (
    <div>
      <NavBar className = "w-full w-screen"/>
      <Suggestion/>
      <Footer links={links} companyInfo={companyInfo} />
    </div>
  )
}

export default suggestions