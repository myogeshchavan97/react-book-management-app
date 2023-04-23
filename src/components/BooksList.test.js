import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BooksList from "./BooksList";
import BooksContext from "../context/BooksContext";

describe("BooksList component", () => {
  const books = [
    {
      id: "1",
      bookname: "Test Book 1",
      author: "Test Author 1",
      quantity: "1",
      price: "10.00",
      date: new Date(),
    },
    {
      id: "2",
      bookname: "Test Book 2",
      author: "Test Author 2",
      quantity: "2",
      price: "20.00",
      date: new Date(),
    },
  ];

  it("renders the list of books", () => {
    render(
      <BooksContext.Provider value={{ books, setBooks: jest.fn() }}>
        <BooksList />
      </BooksContext.Provider>
    );

    const book1 = screen.getByText("Test Book 1");
    const book2 = screen.getByText("Test Book 2");

    expect(book1).toBeInTheDocument();
    expect(book2).toBeInTheDocument();
  });

  it("removes a book from the list when the remove button is clicked", () => {
    const setBooksMock = jest.fn();
    render(
      <BooksContext.Provider value={{ books, setBooks: setBooksMock }}>
        <BooksList />
      </BooksContext.Provider>
    );

    const removeButton = screen.getByTestId("remove-button-1");
    fireEvent.click(removeButton);

    expect(setBooksMock).toHaveBeenCalledTimes(1);
    expect(setBooksMock).toHaveBeenCalledWith(
      books.filter((book) => book.id !== "1")
    );
  });

  it("displays a message when there are no books available", () => {
    const emptyBooks = [];
    render(
      <BooksContext.Provider value={{ books: emptyBooks, setBooks: jest.fn() }}>
        <BooksList />
      </BooksContext.Provider>
    );

    const message = screen.getByText(
      "No books available. Please add some books."
    );
    expect(message).toBeInTheDocument();
  });
});
