import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Edit,
  Trash2,
  BookOpen,
  User,
  Calendar,
  DollarSign,
  Package,
} from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Books() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("For You");
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`https://kitaab-backend-2.onrender.com/api/getallbooks`, header);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [ token]);

  const deleteBookHandler = useCallback(
    async (book) => {
      if (
        window.confirm(`Are you sure you want to delete "${book.bookName}"?`)
      ) {
        try {
          await axios.delete(`https://kitaab-backend-2.onrender.com/api/deletebook/${book._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData((prev) => prev.filter((b) => b._id !== book._id));
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      }
    },
    [ token]
  );

  const updateHandler = useCallback(
    (book) => {
      navigate(`/editbook/${book._id}`);
    },
    [navigate]
  );

  const toggleFavorite = useCallback((bookId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(bookId)
        ? newFavorites.delete(bookId)
        : newFavorites.add(bookId);
      return newFavorites;
    });
  }, []);

  const filteredData = useMemo(
    () =>
      data.filter(
        (book) =>
          book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [data, searchTerm]
  );

  const renderStars = useCallback((rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-[#212529] shadow-sm border-b border-[#343A40]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-0">
      {/* Logo + Nav Links */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <DotLottieReact
            className="w-10 h-10"
            src="https://lottie.host/186677d8-dbb6-4f2a-9e0b-1cc979c10afc/DfFEhHceHA.lottie"
            loop
            autoplay
          />
          <div className="flex space-x-10">
          <Link
            to="/"
            className="text-xl font-bold text-[#F8F9FA] no-underline"
          >
            Kitaab
          </Link>
        <Link
          to="/addbook"
          className="text-[#E9ECEF] hover:text-[#ADB5BD] font-medium no-underline"
        >
          Add Book
        </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ADB5BD] w-5 h-5" />
        <input
          type="text"
          placeholder="Title, Subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 pl-10 pr-4 py-2 border border-[#ADB5BD] rounded-lg focus:ring-2 focus:ring-[#495057] focus:border-transparent bg-[#E9ECEF] text-[#212529]"
        />
      </div>

      {/* Cart + User */}
      <div className="flex items-center justify-between sm:justify-end space-x-4">
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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-8">
            {["For You"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-lg font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "text-[#212529] border-[#212529]"
                    : "text-[#495057] border-transparent hover:text-[#343A40]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg bg-[#E9ECEF] hover:bg-[#ADB5BD]">
              <div className="grid grid-cols-2 gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-[#495057] rounded-sm"
                  ></div>
                ))}
              </div>
            </button>
            <button className="p-2 rounded-lg hover:bg-[#E9ECEF]">
              <div className="space-y-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-4 h-0.5 bg-[#495057] rounded"></div>
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Book Cover */}
              <div className="relative h-48 bg-gradient-to-br from-[#495057] to-[#212529] flex items-center justify-center">
                {book.bestseller && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Best Seller
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(book._id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.has(book._id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>
                <div className="text-white text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-60" />
                  <div className="text-sm font-medium px-4 leading-tight">
                    {book.bookName}
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-[#212529] line-clamp-2 mb-1">
                    {book.bookName}
                  </h3>
                  <p className="text-sm text-[#495057] mb-2">
                    {book.category || "General"}
                  </p>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1 mr-2">
                    {renderStars(book.rating || 0)}
                  </div>
                  <span className="text-sm text-[#495057]">
                    {book.rating || "N/A"}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-[#495057]">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-[#343A40]" />
                    <span>{book.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-[#343A40]" />
                    <span>
                      {book.pubDate
                        ? new Date(book.pubDate).toLocaleDateString("en-IN")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-[#343A40]" />
                      <span className="font-semibold text-[#212529]">
                        ₹{book.price}
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Package className="w-3 h-3 mr-1 text-[#343A40]" />
                      <span>{book.stock} left</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => updateHandler(book)}
                    className="flex-1 flex items-center justify-center space-x-1 bg-[#E9ECEF] hover:bg-[#212529] text-[#212529] hover:text-[#E9ECEF] py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteBookHandler(book)}
                    className="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-[#ADB5BD] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#212529] mb-2">
              No books found
            </h3>
            <p className="text-[#495057]">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
