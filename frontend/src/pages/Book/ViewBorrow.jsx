  import React, { useState } from 'react'
import { MdAdd, MdClose, MdPowerInput } from 'react-icons/md'
import DateSelector from '../../components/Input/DateSelector';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const ViewBorrow = ({ onClose, bookInfo, userInfo }) => {

  const [title, setTitle] = useState(bookInfo?.title || "");
  const [borrowName, setBorrowName] = useState(userInfo?.fullName || "");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookCover, setBookCover] = useState(bookInfo?.imageUrl || null);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");
  const [MSSV, setMSSV] = useState(userInfo?.MSSV || "");
  const [borrowNumber, setBorrowNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleBorrow = async () => {
    
    const bookId = bookInfo._id;
      try{
        const response = await axiosInstance.post(`/borrow/${bookId}`, {
          title,
          startDate: startDate ? moment(startDate).valueOf() : moment().valueOf(),
          endDate: endDate ? moment(endDate).valueOf() : moment().valueOf(),
          phoneNumber,
          borrowNumber,
          borrowName,
          imageUrl: bookCover || "",
          bookId : bookId || "",
          userId : userInfo._id,
        })
        if(response.data && response.data.borrow){
          toast.success("Borrow Book successfully", {
            autoClose: 1000,
          });
          onClose();
        }
  
      }catch(error){
        if(error.response && 
          error.response.data && 
          error.response.data.message
        ){
          setError(error.response.data.message);
        }else{
          setError("An unexpected error occurred.Please try again!")
        }
      }
    }

  return (
    <div className="relative">
      <button onClick={onClose} className="absolute right-0 top-0 p-1 hover:bg-gray-200 rounded-full">
        <MdClose className="text-xl text-gray-500 hover:text-pornhub-200" />
      </button>
      <div className="flex-1 flex flex-col gap-2 pt-4">
        <label className="input-label">TITLE</label>
        <textarea
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Your book title"
          value={title}
        />
        <div className="relative">
            <img
              src={bookInfo.imageUrl}
              alt={bookInfo.title}
              className="w-35  h-30 sm:w-3/4 rounded-lg shadow-md object-cover"
        />

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">YOUR NAME</label>
          <input
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="Your Name"
           rows={1}
           value={borrowName}
           onChange={({ target }) => setBorrowName(target.value)}
           />
        </div>

          </div>  
        <div className="my-3">
          <DateSelector date={startDate} setDate={setStartDate}/>
        </div>

        <div className="my-3">
          <DateSelector date={endDate} setDate={setEndDate}/>
        </div>
        
        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">PHONE NUMBER</label>
          <input
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="Your Phone Number"
           rows={1}
           value={phoneNumber}
           onChange={({ target }) => setPhoneNumber(target.value)}
           />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">MSSV</label>
          <input
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="MSSV"
           rows={1}
           value={MSSV}
           onChange={({ target }) => setMSSV(target.value)}
           />
        </div> 

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label"> QUANTITY </label>
          <input
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="QUANTITY"
           rows={1}
           value={borrowNumber}
           onChange={({ target }) => setBorrowNumber(target.value)}
           />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button className="btn-small1 flex items-center gap-1 px-4 py-2 rounded-lg shadow-md bg-black text-white hover:bg-pornhub-200 transition" onClick={handleBorrow}>
          <MdAdd className="text-lg" /> BORROW BOOK
        </button>
      </div>
    </div>
  )
}

export default ViewBorrow