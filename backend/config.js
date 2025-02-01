const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://nikhilsoni1209:ht9LUB8UAhximYYz@cluster0.n1r3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("MongoDB connected successfully!");
})
.catch((err) => {
    console.error("MongoDB connection error:", err.message);
});
