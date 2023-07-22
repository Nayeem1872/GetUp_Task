import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Link from "next/link";

export default function GetupData() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;

  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch('https://app-area.bestu.com.bd/api/nextjs/products', {
      headers: {
        Authorization: 'GETUPLTD2023NEXTJS',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the API response to check its structure
        // Update the state with the fetched products data
        setProducts(data.data.data); // Access the 'data' array within the API response
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="font-bold text-2xl mb-4">Products</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Warranty</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="px-4 py-2">
                <img src={product.image} alt={product.name} className="w-12 h-12" />
              </td>
              <td className="px-4 py-2 text-left">{product.name}</td>
              <td className="px-4 py-2 text-left">{product.brand_name}</td>
              <td className="px-4 py-2 text-left">{product.price}</td>
              <td className="px-4 py-2 text-left">{product.stock}</td>
              <td className="px-4 py-2 text-left">{product.product_warrenty}</td>
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
           

            {/* Login */}

    </div>
  );
}
