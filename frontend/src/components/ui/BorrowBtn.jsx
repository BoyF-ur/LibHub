import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const BorrowBtn = ({ bookInfo, isLoggedIn, handleViewBook }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBorrowClick = () => {
    if (isLoggedIn) {
      handleViewBook();
    } else {
      setModalIsOpen(true);
    }
  };

  const redirectToLogin = () => {
    //Direct to login page and saving current URL 
    window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    setModalIsOpen(false);
  };

  return (
    <div className="">
      {bookInfo.remainingBook > 0 ? (
        <>
          {/* Borrow Button */}
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-pornhub-200 font-semibold transition"
            onClick={handleBorrowClick}
          >
            Borrow!
          </button>

          {/* Modal Notify */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto mt-20 outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            closeTimeoutMS={200}
          >
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Oops! You need to log in first 🔥
            </h2>
            <p className="mb-4 text-gray-600">
              Log in first, and I’ll let you do borrow action 🗣️.
            </p>
            <div className="flex gap-3">
              <button
                className="bg-black text-white font-bold px-4 py-2 rounded-lg hover:bg-pornhub-200 transition duration-300"
                onClick={redirectToLogin}
              >
                Log in
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                onClick={() => setModalIsOpen(false)}
              >
                Not now
              </button>
            </div>
          </Modal>
        </>
      ) : (
        <span className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
          Out of book
        </span>
      )}
    </div>
  );
};

export default BorrowBtn;