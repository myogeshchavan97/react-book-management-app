import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("AppRouter", () => {
  it("router test", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const booksLink = screen.getByTestId("books-link");
    const bookLink = screen.getByTestId("book-link");

    userEvent.click(bookLink);
    expect(screen.getByTestId("book-page")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/add");

    userEvent.click(booksLink);
    expect(screen.getByTestId("books-page")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });

  it("should redirecit to /", async () => {
    render(
      <MemoryRouter initialEntries={["/notExistedPage"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("books-page")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });
});
