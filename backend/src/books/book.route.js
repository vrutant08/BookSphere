const express = require('express');
const router = express.Router();
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');

// post = when submit something frontend to db
// get = when get something from db 
// put/patch = when update something in db
// delete = when delete something in db

router.post("/", postABook); // Changed to match the frontend request

//get all books 
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

//update a book
router.put("/edit/:id", UpdateBook);

router.delete("/:id", deleteABook);

module.exports = router;