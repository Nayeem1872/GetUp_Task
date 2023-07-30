import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    <div className="flex flex-col items-center justify-center mt-9 mb-9">

      <h1 className="font-bold text-2xl mb-4">Getup API Products</h1>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-blue-400">
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
      <div className="flex items-center mt-4  gap-4">
  <ReactPaginate
    pageCount={2}
    marginPagesDisplayed={1}
    pageRangeDisplayed={3}
    onPageChange={handlePageChange}
    containerClassName="pagination flex gap-2" // Added flex and gap-2 classes
    pageClassName="px-3 py-1 rounded-md bg-blue-500 text-white cursor-pointer"
    previousClassName="pagination-arrow"
    nextClassName="pagination-arrow"
    disabledClassName="text-gray-400 cursor-not-allowed"
    activeClassName="bg-blue-700"
    previousLabel={<IoIosArrowBack strokeWidth={2} className="h-5 w-5 mt-2" />}
    nextLabel={<IoIosArrowForward strokeWidth={2} className="h-5 w-5 mt-2" />}
  />
</div>
           

            {/* Login */}

    </div>
  );
}
