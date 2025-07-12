const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];  

  if (book) {
    return res.json(book);  
  } else {
    return res.status(404).json({ message: "Book not found" });  // 
  }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const results = books.filter(book => book.author.toLowerCase() === author.toLowerCase());

  if (results.length > 0) {
    return res.json(results);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const results = books.filter(book => book.title.toLowerCase() === title.toLowerCase());

  if (results.length > 0) {
    return res.json(results);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];  // Look up the book using the ISBN as a key
  
  if (book) {
    return res.json(book.reviews);  // Return reviews if the book exists
  } else {
    return res.status(404).json({ message: "Book not found" });  // Return an error message if it doesn't exist
  }
});

module.exports.general = public_users;