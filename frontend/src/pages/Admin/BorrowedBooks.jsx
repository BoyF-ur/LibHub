import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

const BorrowedBooks = () => {
  const stats = [
    { title: "Tổng số sách hiện có", count: 100, color: "text-blue-600", icon: "fa-book" },
    { title: "Sách sẵn sàng cho mượn", count: 10, color: "text-green-600", icon: "fa-book-open" },
    { title: "Sách đang mượn", count: 1, color: "text-yellow-600", icon: "fa-exchange-alt" },
    { title: "Sách thanh lý hoặc mất", count: 1, color: "text-red-600", icon: "fa-trash-alt" }
  ];
  const books = [
    { id: 1, title: "The Great Gatsby", image: "https://hachette.imgix.net/books/9780762498130.jpg?auto=compress,format", borrowedDate: "2024-03-01", returnDate: "2024-03-15", status: "Borrowing" },
    { id: 2, title: "To Kill a Mockingbird", image: "https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg", borrowedDate: "2024-02-20", returnDate: "2024-03-05", status: "Returned" },
    { id: 3, title: "1984", image: "https://i.pinimg.com/originals/0d/2c/09/0d2c0915b3c86c8ac0680f3f6c88731d.jpg", borrowedDate: "2024-03-05", returnDate: "2024-03-20", status: "Borrowing" },
  ];

  return (
    <>

      <Header />
      
      <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Quick stats</h2>
      {/* Thống kê */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-xl shadow-md text-center border border-gray-300 flex flex-col h-32 overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
        >
          <div className="w-full text-left">
            <h3 className="text-sm font-semibold text-gray-600">{stat.title}</h3>
          </div>
     
          <div className="flex-1 flex justify-between items-center">
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.count}
            </p>
            <i className={`fas ${stat.icon} text-3xl ${stat.color}`}></i>
          </div>
        </div>
        ))}
      </div>


     

        {/* Danh sách sách */}
        <h2 className="text-2xl font-semibold mb-4">Borrowed Books List</h2>
        <div className="overflow-x-auto border border-gray-500 rounded-2xl">
          <table className="min-w-full bg-white border border-gray-400 shadow-md rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-3 px-4 text-left border-r border-gray-300">ID</th>
                <th className="py-3 px-4 text-left border-r border-gray-300">Title</th>
                <th className="py-3 px-4 text-left border-r border-gray-300">Image</th>
                <th className="py-3 px-4 text-left border-r border-gray-300">Borrowed Date</th>
                <th className="py-3 px-4 text-left border-r border-gray-300">Return Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="py-3 px-4 border-r border-gray-300">{book.id}</td>
                  <td className="py-3 px-4 border-r border-gray-300">{book.title}</td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    <img src={book.image} alt={book.title} className="w-16 h-16 object-cover rounded-md border border-gray-300" />
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">{book.borrowedDate}</td>
                  <td className="py-3 px-4 border-r border-gray-300">{book.returnDate}</td>
                  <td className="py-3 px-4 font-semibold text-sm">
                    <span className={book.status === "Borrowing" ? "text-red-500" : "text-green-500"}>{book.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BorrowedBooks;
