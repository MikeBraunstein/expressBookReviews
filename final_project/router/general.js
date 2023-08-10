const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let key_len = Object.keys(books).length;
    //let new_key = 1; - was not needed as we want to maintain
    let new_dict = {};

    for (i=1;i<=key_len;i++){
        if (books[i].author === author){
            new_dict[i] = books[i];
            new_key++;
        }
    }

    res.send(new_dict);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let key_len = Object.keys(books).length;
    
    for (i=1;i<=key_len;i++){
        if(books[i].title === title) {
            res.send(JSON.stringify(books[i],null,4));
        }
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let review = books[isbn].reviews;

    res.send(JSON.stringify(review,null,4));
});

module.exports.general = public_users;
