import React, { useContext } from 'react';
import BookForm from './BookForm';
import BooksContext from '../context/BooksContext';

const AddBook = ({ history }) => {
  const { books, setBooks } = useContext(BooksContext);

  const handleOnSubmit = (book) => {
    setBooks([book, ...books]);
    history.push('/');
  };

  return (
    <React.Fragment>
      <BookForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddBook;
