const mongoose = require("mongoose");


const product_schema = new mongoose.Schema({
    bookId: { type: Number, required: true },
    bookName: { type: String, default: "ABC" },
    author: { type: String, default: "John" },
    stock: { type: Number },
    pubDate: { type: Date },
    price: { type: Number, default: 0 },
    bookType: { type: String, default: "" },
  });
  
module.exports = mongoose.model("books", product_schema);

