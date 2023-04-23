import React, { useContext } from "react";
import _ from "lodash";
import Book from "./Book";
import BooksContext from "../context/BooksContext";

const BooksList = () => {
  const { books, setBooks } = useContext(BooksContext);

  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <React.Fragment>
      <div data-testid="books-page" className="book-list">
        {!_.isEmpty(books) ? (
          books.map((book) => (
            <Book
              data-testid="book-page"
              key={book.id}
              {...book}
              handleRemoveBook={handleRemoveBook}
            />
          ))
        ) : (
          <p className="message">No books available. Please add some books.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default BooksList;
