import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {  ShoppingCart, User } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function AddBook() {
  const navigate = useNavigate();
  const apiUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;

  const [formData, setFormData] = useState({
    bookId: "",
    bookName: "",
    author: "",
    stock: "",
    pubDate: "",
    price: "",
    bookType: "",
  });

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    await axios.post(`${apiUrl}/api/addbook`, formData);
    navigate("/");
  }

  return (
    <>
      <header className="bg-[#212529] shadow-sm border-b border-[#343A40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex">
              <DotLottieReact
              className="w-10 h-10 " 
      src="https://lottie.host/186677d8-dbb6-4f2a-9e0b-1cc979c10afc/DfFEhHceHA.lottie"
      loop
      autoplay
    />
                <Link to="/" className="text-2xl font-bold text-[#F8F9FA] no-underline">
                  Kitaab
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#E9ECEF]" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#495057] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#E9ECEF]" />
                </div>
                <span className="text-sm font-medium text-[#E9ECEF]">User</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="lg:flex flex-col-2 ">
        <DotLottieReact
          className="w-46 mx-auto"
          src="https://lottie.host/38ec4168-2c45-4a5f-89e2-47017ff420ba/jINhwLlRFV.lottie"
          loop
          autoplay
        />

        <div className="container w-50 mt-3 mx-auto ">
          <h4>Book Details</h4>
          <form className="container" onSubmit={submitHandler}>
            <div className="form-group">
              <label>Book Id</label>
              <input
                name="bookId" //which is given in the DB
                onChange={inputHandler}
                type="number"
                className="form-control"
                placeholder="Enter Book Id"
              />
            </div>
            <div className="form-group">
              <label>Book Name</label>
              <input
                name="bookName" //which is given in the DB
                onChange={inputHandler}
                type="text"
                className="form-control"
                placeholder="Enter Book Name"
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                name="author" //which is given in the DB
                onChange={inputHandler}
                type="text"
                className="form-control"
                placeholder="Enter Author Name"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                name="price" //which is given in the DB
                onChange={inputHandler}
                type="number"
                className="form-control"
                placeholder="Enter Book Price"
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                name="stock" //which is given in the DB
                onChange={inputHandler}
                type="number"
                className="form-control"
                placeholder="Enter Book Stock"
              />
            </div>
            <div className="form-group">
              <label>Publish Date</label>
              <input
                name="pubDate" //which is given in the DB
                onChange={inputHandler}
                type="date"
                className="form-control"
                placeholder="Enter Book Publish Date"
              />
            </div>
            <div className="form-group">
              <label>Book Type</label>
              <input
                name="bookType" //which is given in the DB
                onChange={inputHandler}
                type="text"
                className="form-control"
                placeholder="Enter Book Type"
              />
            </div>
            <button
              type="submit"
              className=" mt-4 bg-[#212529] hover:bg-[#4b4b4b] text-[#E9ECEF] hover:text-[#ffffff] py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;
