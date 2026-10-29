import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client/react";

const Recommend = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const { loading: userLoading, data: userData } = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (loading || userLoading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;
  const favoriteGenre = userData.me.favoriteGenre;
  const booksToShow = books.filter((book) => book.genres.includes(favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

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
    </div>
  );
};

export default Recommend;
