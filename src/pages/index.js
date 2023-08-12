import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "../../components/Header";
import Footer from "../../components/Footer";
import Collections from "../../components/collections";
import SuggestItem from "../../components/suggestion";
const inter = Inter({ subsets: ["latin"] });
const links = [
  { url: "/about", text: "About" },
  { url: "/contact", text: "Contact" },
  { url: "/terms", text: "Terms of Service" },
];
const companyInfo = "Copyright © 2023 Your Company";
export default function Home() {
  return (
    <div>
      <NavBar />
      <Collections />
      <SuggestItem />
      <Footer links={links} companyInfo={companyInfo} />
    </div>
  );
}
