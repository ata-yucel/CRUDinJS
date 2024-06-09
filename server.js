const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/BookModel");
const BookSchema = require("./models/BookModel");

const app = express();

mongoose.connect("mongodb+srv://atayucel:nilgunata184@atacluster.wqqdyed.mongodb.net/yourDatabaseName?retryWrites=true&w=majority")
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.use(express.json());

app.use(cors({
  origin: "*"
}));
app.use("/book",Book)

// Get all books
app.get("/books", async (req, res) => {
  try {
    const allBooks = await Book.find({});
    res.status(200).send({ status: true, message: "All Books", data: allBooks });
  } catch (error) {
    console.log("Book get error", error);
    res.status(404).send({ status: false, message: error.message });
  }
});

// Add a new book
app.post("/addBook", async (req, res) => {
  try {
    let newBook = req.body;
    let savedData = await Book.create(newBook);
    res.send({
      status: true,
      data: savedData,
      message: "Book Created"
    });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
    console.log(error.message);
  }
});

// Get a book by ID
app.get("/books/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).send({ status: 200, message: 'Book Get', data: book });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});

// Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ status: false, message: 'Book did not Deleted!' });
    }
    res.status(200).send({ status: true, message: 'Book Deleted!' });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});

// Update a book by ID
app.put("/books/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ status: true, message: 'Book Updated!', data: updatedBook });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});




app.listen(9000,()=>{
  console.log('Merhaba Ben Çalıştım')
})

