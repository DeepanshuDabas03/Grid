import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { parse } from 'papaparse'; // A CSV parsing library
import  Header from "../../components/Header";
import Footer from "../../components/Footer";
const links = [
  { url: '/about', text: 'About' },
  { url: '/contact', text: 'Contact' },
  { url: '/terms', text: 'Terms of Service' },
];
const companyInfo = 'Copyright © 2023 Snatkart';

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  
  useEffect(() => {
    // Read UserId from the cookie
    const userId = Cookies.get('myCookie');

    if (userId) {
      fetch('/OrderHistory.csv') // Assuming OrderHistory.csv is in the public folder
        .then(response => response.text())
        .then(data => {
          // Parse CSV data
          const parsedData = parse(data, { header: true }).data;
          const filteredData = parsedData.filter(row => row.UserId === userId);
          setOrderHistory(filteredData);
        })
        .catch(error => console.error(error));
    }
  }, []);

  return (
    <div>
      <Header/>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <table className="min-w-full divide-y divide-gray-200 text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Product Name</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2 text-black">{order.ProductId}</td>
              <td className="px-4 py-2 text-black">{order.Product_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <Footer links={links} companyInfo={companyInfo} />
    </div>
  );
}
