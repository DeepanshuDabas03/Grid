import { Inter } from "next/font/google";
import NavBar from "../../components/Header";
import Footer from "../../components/Footer";
const inter = Inter({ subsets: ["latin"] });
import Sign from "../../components/SignIn";
const links = [
    { url: '/about', text: 'About' },
    { url: '/contact', text: 'Contact' },
    { url: '/terms', text: 'Terms of Service' },
  ];
  const companyInfo = 'Copyright © 2023 Your Company';
export default function SignIn() {
  return (
    <div>
      <Sign/>
    </div>
  );
}
