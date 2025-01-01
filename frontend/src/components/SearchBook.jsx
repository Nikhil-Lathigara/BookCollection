import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SearchBook() {
  const { id } = useParams(); // Expecting id from the URL
  const apiUrl = "http://localhost:5000";

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
      setError("Book Not Found");
      setFormData(null);
    }
  }

  return (
    <>
      {formData ? (
        <div className="table table-striped-columns text-center">
          <table cellPadding={4} border={4} align="center" className="mt-4">
            <thead>
              <tr>
                <th>Book Id</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Stock</th>
                <th>Publish Date</th>
                <th>Price</th>
                <th>Book Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formData.bookId}</td>
                <td>{formData.bookName}</td>
                <td>{formData.author}</td>
                <td>{formData.stock}</td>
                <td>{new Date(formData.pubDate).toLocaleDateString()}</td>
                <td>{formData.price}</td>
                <td>{formData.bookType}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </>
  );
}
export default SearchBook;
