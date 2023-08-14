import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export default function Home() {
  const [topNData, setTopNData] = useState([]);
  const [csvData, setCSVData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file in the public folder
    fetch('/top_n.json')
      .then((response) => response.json())
      .then((data) => setTopNData(data))
      .catch((error) => console.error('Error fetching data:', error));

    // Load and parse CSV data
    async function loadCSVData() {
      const response = await fetch('/Feviews2.csv'); // Adjust the file path
      console.log(response)
      // const text = await response.text();
      // setCSVData(Papa.parse(text, { header: true, dynamicTyping: true }).data);
    }
    loadCSVData();
  }, []);

  function getProductName(productId) {
    const product = csvData.find((item) => item.ProductId === productId);
    return product ? product.ProductName : 'Unknown Product';
  }

  return (
    <div>
      <h1>Top N Recommendations</h1>
      <ul>
        {Object.entries(topNData).map(([userId, ratings]) => (
          <li key={userId}>
            <strong>User ID: {userId}</strong>
            <ul>
              {ratings.map(([productId, rating]) => (
                <li key={productId}>
                  Product Name: {getProductName(productId)}, Rating: {rating}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}



// import { useRouter } from 'next/router';
// import Cookies from 'js-cookie';

// const callouts = [
//   {
//     name: "Desk and Office",
//     description: "Work from home accessories",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
//     imageAlt:
//       "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
//     href: "#",
//   },
//   {
//     name: "Self-Improvement",
//     description: "Journals and note-taking",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
//     imageAlt:
//       "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
//     href: "#",
//   },
//   {
//     name: "Travel",
//     description: "Daily commute essentials",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
//     imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
//     href: "#",
//   },
// ];

// export default function Collections() {
//   const router = useRouter();
//     const authToken = Cookies.get('myCookie');
//     console.log(authToken)
//     // // Check authentication status
//     const isAuthenticated = !!authToken;
//     console.log(Cookies.get('myCookie')); // Add the missing closing parenthesis here
//     console.log(isAuthenticated)
//     if (!isAuthenticated) {
//       // Redirect to the login page if not authenticated
//       router.replace('/login');
//       return null; // Return null to prevent rendering
//     }
//   return (
//     <div className="bg-black-100">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
//           <h2 className="text-2xl font-bold text-white-900">Collections</h2>

//           <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
//             {callouts.map((callout) => (
//               <div key={callout.name} className="group relative">
//                 <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
//                   <img
//                     src={callout.imageSrc}
//                     alt={callout.imageAlt}
//                     className="h-full w-full object-cover object-center"
//                   />
//                 </div>
//                 <h3 className="mt-6 text-sm text-white-500">
//                   <a href={callout.href}>
//                     <span className="absolute inset-0" />
//                     {callout.name}
//                   </a>
//                 </h3>
//                 <p className="text-base font-semibold text-white-900">
//                   {callout.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
