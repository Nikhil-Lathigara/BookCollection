const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")// used to connect nodejs and DB with react
const books = require("./model/books.js"); // Path to model file

const app = express();
require("./config");

app.use(express.json());
app.use(cors());

// app.use(express.urlencoded({extended:true}))

// Add Books to books collection
app.post("/api/addbook", async (req, res) => {
  try {
    const data = new books(req.body);
    await data.save();
    res.status(200).json({ message: "data inserted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//show all books details
app.get("/api/getallbooks", async (req, res) => {
  try {
    const data = await books.find(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update book details by id
app.put("/api/updatebookinfo/:id", async (req, res) => {
  try {
    const data = await books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error Details:", err); // Log the full error
    res
      .status(500)
      .json({
        message: "Server error",
        error: err.message || "No error message",
      });
  }
});
//delete book by book id

app.delete("/api/deletebook/:id", async (req, res) => {
  try {
    const data = await books.findByIdAndDelete(req.params.id, { new: true });
    console.log(data);

    if (!data) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});
//Get book by book id

app.get("/api/getbookbyid/:id", async (req, res) => {
  try {
    const data = await books.findById(req.params.id);
    console.log(data);

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// Update search book API
app.get("/api/searchbook", async (req, res) => {
  try {
      const { query } = req.query; // Get query from input
      const book = await books.findOne({ bookId: query }); // Search by bookId

      if (!book) {
          return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book); // Return book details
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("server started");
});
