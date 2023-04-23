import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./router/AppRouter";
import BooksContext from "./context/BooksContext";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [books, setBooks] = useLocalStorage("books", []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <BooksContext.Provider value={{ books, setBooks }}>
            <AppRouter />
          </BooksContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
