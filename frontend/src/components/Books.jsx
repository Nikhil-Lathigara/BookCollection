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
      <div className="table table-striped-columns text-center">
        <table cellPadding={4} border={4} align="center" className="my-4 w-100">
          <tr>
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Stock</th>
            <th>Publish Date</th>
            <th>Price</th>
            <th>Book Type</th>
            <th colSpan={2}>Action</th>
          </tr>
          {data.map((e) => {
            return (
              <tr key={e.bookId}>
                <td>{e.bookId}</td>
                <td>{e.bookName}</td>
                <td>{e.author}</td>
                <td>{e.stock}</td>
                <td>{e.pubDate}</td>
                <td>{e.price}</td>
                <td>{e.bookType}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => updateHandler(e)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete")) {
                        deleteBookHandler(e);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  );
}

export default Books;
