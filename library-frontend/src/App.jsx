import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import UpdateAuthor from "./components/UpdateAuthor";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { useApolloClient } from "@apollo/client/react";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("library-user-token"));
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const isLoggedIn = token ? true : false;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {isLoggedIn ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={onLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      {isLoggedIn && (
        <>
          <NewBook show={page === "add"} setError={notify} />

          <UpdateAuthor show={page === "authors"} setError={notify} />

          <Recommend show={page === "recommend"} />
        </>
      )}

      <LoginForm show={page === "login"} setToken={setToken} setError={notify} onLogin={() => setPage("books")} />
    </div>
  );
};

export default App;
