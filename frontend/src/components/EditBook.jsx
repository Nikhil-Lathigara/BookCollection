import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditBooks() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const info = await axios.get(`${apiUrl}/api/getbookbyid/${id}`, formData);
    setFormData(info.data);
  }
  function inputHandler(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData,[name]: value,}));
  }
  function submitHandler() {
    if (!formData.bookName || !formData.author || !formData.price) {
      alert("Please fill in all required fields.");
      return;
    }
    axios.put(`${apiUrl}/api/updatebookinfo/${id}`, formData);
    navigate("/");
  }

  return (
    <>
      <div className="container w-50 mt-3 mx-auto">
        <h4>Update Book Details</h4>
        <form className="container" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Book Id</label>
            <input
              name="bookId" //which is given in the DB
              value={formData.bookId}
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
              value={formData.bookName}
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
              value={formData.author}
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
              value={formData.price}
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
              value={formData.stock}
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
              value={formData.pubDate}
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
              value={formData.bookType}
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

export default EditBooks;
