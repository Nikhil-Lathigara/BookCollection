import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Books() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:5000";
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const info = await axios.get(`${apiUrl}/api/getallbooks`);
    setData(info.data);
  }

  async function deleteBookHandler(e) {
    await axios.delete(`${apiUrl}/api/deletebook/${e._id}`);
    navigate("/");
  }
  function updateHandler(e) {
    navigate(`/editbook/${e._id}`);
  }

  return (
    <>
      <div className="container my-3">
        <div className="row">
          {data.map((e) => {
            return (
              <div key={e.bookId} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h5 className="card-title">
                      {e.bookId} {e.bookName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      Author : {e.author}
                    </h6>
                    <p className="card-text">
                      Date Published : {e.pubDate}
                      <br />
                      Price : {e.price}
                      <br />
                      Stock : {e.stock}
                    </p>
                    <button
                      className="mx-2 btn btn-warning"
                      onClick={() => updateHandler(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="mx-2 btn btn-danger"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete")) {
                          deleteBookHandler(e);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Books;
