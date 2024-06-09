const {Schema, model} = require("mongoose")

const BookSchema = new Schema({
  bookName : {
    type: String,
    required : [true, 'Book name is Required!'],
    unique : true
  },
  bookPage : {
    type: String,
    required : [true, 'Password is Required'],
    max : [15, 'Author name can not be over 15 characters!'],
    min : [2, 'Password can not be under 2 characters!'],
  },
  authorName : {
    type: String,
    required : [true, 'Author is Required!'],
    max : [30, 'Author name can not be over 30 characters!'],
    unique : true,
  }
})

const Book = model('Book', BookSchema)
module.exports = Book

