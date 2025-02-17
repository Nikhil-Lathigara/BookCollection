import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar() {
    const [txt, setTxt] = useState("");

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
  
    if (txt.trim()) {
      // Fetch book ID based on input (name or other parameter)
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/searchbook?query=${txt}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Book not found");
          }
          return response.json();
        })
        .then((data) => {
          navigate(`/searchbook/${data._id}`); // Navigate using the retrieved ID
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please enter a valid search query.");
    }
  }
  return (
    <div>
        <header>
          <nav className="p-2  navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand active" to="/">
              Kitaab
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mt-2 me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/addbook" className="nav-link">
                    Add Book
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={txt}
                  onChange={(e) => setTxt(e.target.value)} // Use onChange here
                />
                <button className="btn btn-outline-success" type="submit"
                onClick={submitHandler}>
                  Search
                </button>
              </form>
            </div>
          </nav>
        </header>
    </div>
  )
}

export default Navbar