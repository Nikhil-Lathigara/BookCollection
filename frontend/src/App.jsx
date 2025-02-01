import { Route, Routes} from "react-router-dom";
import EditBook from "./components/EditBook";
import AddBook from "./components/AddBook";
import Books from "./components/Books";
import SearchBook from "./components/SearchBook";
import Navbar from "./components/Navbar";


export default function App() {
  
  
  

  return (
    <>
      <div className="m-0 p-0 container-fluid">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Books></Books>}></Route>
          <Route path="/addbook" element={<AddBook></AddBook>}></Route>
          <Route path="/editbook/:id" element={<EditBook></EditBook>}></Route>
          <Route
            path="/searchbook/:id"
            element={<SearchBook></SearchBook>}
          ></Route>
        </Routes>
      </div>
    </>
  );
}
