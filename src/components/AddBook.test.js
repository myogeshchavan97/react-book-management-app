import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BooksContext from "../context/BooksContext";
import AddBook from "./AddBook";

describe("AddBook component", () => {
  it("should add a book to the context and redirect to the homepage on form submission", () => {
    const book = {
      id: "1",
      bookname: "Book One",
      author: "Author One",
      price: 10,
      quantity: 5,
      date: new Date(),
    };
    const setBooks = jest.fn();
    const history = { push: jest.fn() };

    const { getByLabelText, getByText } = render(
      <BooksContext.Provider value={{ books: [], setBooks }}>
        <AddBook history={history} />
      </BooksContext.Provider>
    );

    fireEvent.change(getByLabelText(/book name/i), {
      target: { value: book.bookname },
    });
    fireEvent.change(getByLabelText(/author/i), {
      target: { value: book.author },
    });
    fireEvent.change(getByLabelText(/price/i), {
      target: { value: book.price },
    });
    fireEvent.change(getByLabelText(/quantity/i), {
      target: { value: book.quantity },
    });

    fireEvent.click(getByText("Submit"));

    expect(setBooks).toHaveBeenCalledTimes(1);

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith("/");
  });
});
