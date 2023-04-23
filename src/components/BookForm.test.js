import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BookForm from "./BookForm";

describe("BookForm component", () => {
  const mockHandleSubmit = jest.fn();
  const defaultProps = {
    handleOnSubmit: mockHandleSubmit,
  };

  it("renders without crashing", () => {
    render(<BookForm {...defaultProps} />);
  });

  it("calls handleOnSubmit when the form is submitted with valid values", () => {
    const { getByLabelText, getByTestId } = render(
      <BookForm {...defaultProps} />
    );
    fireEvent.change(getByLabelText("Book Name"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(getByLabelText("Book Author"), {
      target: { value: "Test Author" },
    });
    fireEvent.change(getByLabelText("Quantity"), { target: { value: "10" } });
    fireEvent.change(getByLabelText("Book Price"), {
      target: { value: "9.99" },
    });
    fireEvent.click(getByTestId("submit-button"));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("displays an error message when the form is submitted with invalid values", () => {
    const { getByLabelText, getByText } = render(
      <BookForm {...defaultProps} />
    );
    fireEvent.change(getByLabelText("Book Name"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(getByLabelText("Book Author"), { target: { value: "" } });
    fireEvent.change(getByLabelText("Quantity"), { target: { value: "0" } });
    fireEvent.change(getByLabelText("Book Price"), {
      target: { value: "invalid" },
    });
    fireEvent.click(getByText("Submit"));
    expect(mockHandleSubmit).not.toHaveBeenCalled();
    expect(getByText("Please fill out all the fields.")).toBeInTheDocument();
  });

  it("pre-populates the form fields if a book prop is provided", () => {
    const book = {
      bookname: "Test Book",
      author: "Test Author",
      quantity: "10",
      price: "9.99",
      date: new Date(),
    };
    const { getByLabelText } = render(
      <BookForm {...defaultProps} book={book} />
    );
    expect(getByLabelText("Book Name")).toHaveValue("Test Book");
    expect(getByLabelText("Book Author")).toHaveValue("Test Author");
    expect(getByLabelText("Quantity")).toHaveValue(10);
    expect(getByLabelText("Book Price")).toHaveValue("9.99");
  });
});
