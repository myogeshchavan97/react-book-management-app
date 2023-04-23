import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Book from "./Book";

describe("Book component", () => {
  const book = {
    id: "1",
    bookname: "Test Book",
    author: "Test Author",
    price: 10,
    quantity: 5,
    date: "2022-01-01",
  };
  const handleRemoveBook = jest.fn();

  it("renders book details correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Book {...book} handleRemoveBook={handleRemoveBook} />
      </BrowserRouter>
    );

    expect(getByText("Test Book")).toBeInTheDocument();
    expect(getByText("Author: Test Author")).toBeInTheDocument();
    expect(getByText("Quantity: 5")).toBeInTheDocument();
    expect(getByText("Price: 10")).toBeInTheDocument();
    expect(getByText("Date: Sat Jan 01 2022")).toBeInTheDocument();
  });

  it("calls handleRemoveBook when delete button is clicked", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Book {...book} handleRemoveBook={handleRemoveBook} />
      </BrowserRouter>
    );

    fireEvent.click(getByTestId("remove-button-1"));

    expect(handleRemoveBook).toHaveBeenCalledWith("1");
  });

  it("redirects to edit page when edit button is clicked", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Book {...book} handleRemoveBook={handleRemoveBook} />
      </BrowserRouter>
    );

    fireEvent.click(getByTestId("edit-button-1"));

    expect(window.location.pathname).toEqual("/edit/1");
  });
});
