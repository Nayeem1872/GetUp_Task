import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import GetupData from './getupApi';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Data() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
// MOCK API
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the API response to check its structure
        // Update the state with the fetched products data
        setProducts(data.products);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  // GETUP API





  // Get the current products to display on the current page
  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-2xl mb-4">Mock API Products</h1>
      <table className="w-full table-auto">
  <thead>
    <tr>
      <th className="px-4 py-2 text-left">Image</th>
      <th className="px-4 py-2 text-left">Title</th>
      <th className="px-4 py-2 text-left">Brand</th>
      <th className="px-4 py-2 text-left">Rating</th>
      <th className="px-4 py-2 text-left">Stock</th>
    </tr>
  </thead>
  <tbody>
    {currentProducts.map(product => (
      <tr key={product.id}>
        <td className="px-4 py-2">
          <img src={product.thumbnail} alt={product.title} className="w-12 h-12" />
        </td>
        <td className="px-4 py-2 text-left">{product.title}</td>
        <td className="px-4 py-2 text-left">{product.brand}</td>
        <td className="px-4 py-2 text-left">{product.rating}</td>
        <td className="px-4 py-2 text-left">{product.stock}</td>
      </tr>
    ))}
  </tbody>
</table>
      {/* Pagination */}
      <div className="mt-4">
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          pageCount={Math.ceil(products.length / productsPerPage)}
          containerClassName={'flex'}
          pageClassName={'px-3 py-1 rounded-md'}
          previousLinkClassName={'bg-blue-500 text-white mr-2'}
          nextLinkClassName={'bg-blue-500 text-white ml-2'}
          disabledClassName={'text-gray-400'}
          activeClassName={'bg-blue-500 text-white'}
          onPageChange={handlePageChange}
        />
      </div>
      {/* Getup's api */}
      <GetupData />
       {/* Registration */}
       <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    
      <Link href="/registration" >
   
        GetUp  Register 
        
      </Link>
    </div>
    {/* Login Form */}
    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3 mb-3">
    
      <Link href="/loginPage" >
   
          GetUp Login 
        
      </Link>
    </div>
    {/* Toast notifications */}
    <ToastContainer />

    </div>
  );
}
