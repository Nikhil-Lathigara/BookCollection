import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function SearchBook() {
  const { id } = useParams(); // Expecting id from the URL
  const apiUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;
  const navigate = useNavigate();

  const [formData, setFormData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    try {
      const info = await axios.get(`${apiUrl}/api/getbookbyid/${id}`, formData);
      setFormData(info.data);
      setError(""); // Clear error if data is found
    } catch (err) {
      setError("Book Not Found",err);
      setFormData(null);
    }
  }

  async function deleteBookHandler(book) {
    await axios.delete(`${apiUrl}/api/deletebook/${book._id}`);
    navigate("/");
  }
  function updateHandler(book) {
    navigate(`/editbook/${book._id}`);
  }

  return (
    <>
      {formData ? (
        <div className="container my-3">
          <div className="row">
          <div key={formData.bookId} className="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">
              {formData.bookId} {formData.bookName}
            </h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Author : {formData.author}
            </h6>
            <p className="card-text">
              Date Published : {formData.pubDate}
              <br />
              Price : {formData.price}
              <br />
              Stock : {formData.stock}
            </p>
            <button
                      className="mx-2 btn btn-warning"
                      onClick={() => updateHandler(formData)}
                    >
                      Edit
                    </button>
                    <button
                      className="mx-2 btn btn-danger"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete")) {
                          deleteBookHandler(formData);
                        }
                      }}
                    >
                      Delete
                    </button>
          </div>
        </div>
      </div>
          </div>
        </div>
      ) : (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </>
  );
}
export default SearchBook;
