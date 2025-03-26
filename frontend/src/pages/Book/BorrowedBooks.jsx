import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { Tooltip } from "react-tooltip";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const getBorrowedBooks = async() => {
    try{
      const response = await axiosInstance.get("/get-borrowed-book");
      if (response.data && response.data.borrowed) {
        setBooks(response.data.borrowed);
    }
    }catch(error){
      console.error("An unexpected error occurred. Please try again", error);
    }
  }
  
  const ReturnBook = async(data) => {
    const bookId = data._id;
    try{
      const response = await axiosInstance.delete("/delete-borrow/" + bookId);
      if (response.data && response.data.error) {
              toast.error("Book deleted successfully!", {
              autoClose: 1000,
            });
          await getBorrowedBooks();
        }
    }catch(error){
      setError("An unexpected error occurred.Please try again!");
    }
  }

  const handleReturnBook = (data) => {
    if (window.confirm("Bạn có chắc chắn muốn xác nhận trả sách không?")) {
      ReturnBook(data);
    }
  };

  useEffect(() => {
    getBorrowedBooks();
  }, []);

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Borrowed Books List</h2>
        <div className="overflow-x-auto border border-gray-500 rounded-2xl">
          <table className="min-w-full bg-white border border-gray-400 shadow-md rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-center">
                <th className="py-3 px-4 border-r border-gray-300">ID</th>
                <th className="py-3 px-4 border-r border-gray-300">Title</th>
                <th className="py-3 px-4 border-r border-gray-300">Image</th>
                <th className="py-3 px-4 border-r border-gray-300">Borrowed Date</th>
                <th className="py-3 px-4 border-r border-gray-300">Return Date</th>
                <th className="py-3 px-4 border-r border-gray-300">Status</th>
                <th className="py-3 px-4">Borrower</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId} className="border-b border-gray-300 text-center hover:bg-gray-50">
                  <td className="py-3 px-4 border-r border-gray-300">{book.bookId}</td>
                  <td className="py-3 px-4 border-r border-gray-300">{book.title}</td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    <img src={book.imageUrl} alt={book.title} className="w-16 h-20 object-cover rounded-md border border-gray-300" />
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">{book.startDate}</td>
                  <td className="py-3 px-4 border-r border-gray-300">{book.endDate}</td>
                  <td className="py-3 px-4 border-r border-gray-300 font-semibold text-sm">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg text-white ${book.status === "Returned" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-blue-600"}`}
                      disabled={book.status === "Returned"}
                      onClick={() => handleReturnBook(book)}
                      data-tooltip-id="tooltip-status"
                      data-tooltip-content={book.status === "Borrowing" ? "Click để xác nhận trả sách" : "Sách đã được trả"}
                    >
                      {book.status === "Returned" ? "Đã trả" : "Xác nhận trả"}
                    </button>
                    <Tooltip id="tooltip-status" />
                  </td>
                  <td className="py-3 px-4">{book.borrowName}</td>
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