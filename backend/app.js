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
//Get book by Book type
app.get("/api/getbookbybooktype/:bookType", async (req, res) => {
  try {
    const data = await books.findOne({ bookType: req.params.bookType });
    console.log(data);

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});
//Get book by author name
app.get("/api/getbookbyauthor/:author", async (req, res) => {
  try {
    const data = await books.find({ author: req.params.author });
    console.log(data);

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});
//sort books by pubDate in as or desc order
app.get("/api/sortbooks/:order", async (req, res) => {
  try {
    // Determine sort order
    const sortOrder = req.params.order === "desc" ? -1 : 1;

    const data = await books.find().sort({ pubDate: sortOrder });
    console.log(data);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//count number of books by specific author

app.get("/api/countbooksbyauthor/:author", async (req, res) => {
  try {
    const data = await books
      .find()
      .countDocuments({ author: req.params.author });
    console.log(data);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//show all books by book type
app.get("/api/getbookbybooktype/:bookType", async (req, res) => {
  try {
    const data = await books.find({ bookType: req.params.bookType });
    console.log(data);

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

//count number of books in collection
app.get("/api/countbooks", async (req, res) => {
  try {
    const data = await books.find().countDocuments(req.params.id);
    console.log(data);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//show max price book details
app.get("/api/maxpricebook", async (req, res) => {
  try {
    const data = await books.find().sort({ price: -1 }).limit(1);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//show min price book details
app.get("/api/minpricebook", async (req, res) => {
  try {
    const data = await books.find().sort({ price: 1 }).limit(1);

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//show all book within stock range
app.get("/api/bookdetails/stockrange/:minstock/:maxstock", async (req, res) => {
  try {
    const { minstock, maxstock } = req.params;
    const data = await books.find({
      stock: { $gte: parseInt(minstock), $lt: parseInt(maxstock) },
    });

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//show max stock book details
app.get("/api/bookdetails/maxstock", async (req, res) => {
    try {
      const data = await books.find().sort({ stock: -1 }).limit(1);
  
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
  
      res.status(200).json(data);
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  //count number of books by each author
app.get("/api/countbooks/byauthor/:author", async (req, res) => {
    try {
      const data = await books.find().countDocuments({author:req.params.author});
      console.log(data);
  
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
  
      res.status(200).json(data);
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });


  //print highest price book by each author
app.get("/api/highestprice/byauthor", async (req, res) => {
    try {
        const data = await books.group({})
        res.status(200).json(data);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  });

// get all authors name
app.get("/api/getallauthorsname", async (req, res) => {
    try {
      const data = await books.distinct("author");
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// get all books name
app.get("/api/getallbooksname", async (req, res) => {
    try {
      const data = await books.distinct("bookName");
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// get all booktype name
app.get("/api/booktype", async (req, res) => {
    try {
      const data = await books.distinct("bookType");
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// Search book by name, author, or other fields
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
