import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { parse } from 'papaparse'; // A CSV parsing library

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
          console.log(filteredData)
          setOrderHistory(filteredData);
        })
        .catch(error => console.error(error));
    }
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orderHistory.map((order, index) => (
          <li key={index}>
            Product ID: {order.ProductId}, Product Name: {order.Product_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
