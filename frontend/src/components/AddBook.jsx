import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();
  const apiUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;

  const [formData, setFormData] = useState({
    bookId: "",
    bookName: "",
    author:"",
    stock: "",
    pubDate:"",
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
      <div className="container w-50 mt-3 mx-auto">
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
          <button type="submit" className="my-3 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBook;
