import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";
import { useMutation } from "@apollo/client/react";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const publishedInt = parseInt(published);
    await createBook({ variables: { title, author, published: publishedInt, genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            title
            <input required value={title} onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            author
            <input required value={author} onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            published
            <input required type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
          </label>
        </div>
        <div>
          <label>
            genre
            <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          </label>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
