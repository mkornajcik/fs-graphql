import { useState } from "react";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useQuery } from "@apollo/client/react";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("");
  const { loading, data } = useQuery(ALL_BOOKS, { variables: genreFilter ? { genre: genreFilter } : {} });
  const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  if (loading || genresLoading) {
    return <div>loading...</div>;
  }

  const booksToShow = data.allBooks;
  const genresArray = genresData.allGenres;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresArray.map((value) => (
        <button key={value} onClick={() => setGenreFilter(value)}>
          {value}
        </button>
      ))}

      <p>in genre {genreFilter}</p>
      <div style={{ marginTop: 15 }}>
        <button onClick={() => setGenreFilter("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
