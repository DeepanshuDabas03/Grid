import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "../../components/Header";
import Footer from "../../components/Footer";
import Login from "./login.js"
const links = [
  { url: "/about", text: "About" },
  { url: "/contact", text: "Contact" },
  { url: "/terms", text: "Terms of Service" },
];
const companyInfo = "Copyright © 2023 Snatkart";
export default function Home() {
  return (
    
    <div className="w-full">
      <NavBar className = "w-1/2"/>
      <Login/>
      <Footer links={links} companyInfo={companyInfo} />
    </div>
  );
}
