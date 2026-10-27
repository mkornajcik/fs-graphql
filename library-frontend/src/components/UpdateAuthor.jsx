import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useMutation, useQuery } from "@apollo/client/react";

const AuthorSelect = ({ value, onChange }) => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  if (loading) {
    return (
      <select disabled>
        <option>loading authors...</option>
      </select>
    );
  }

  return (
    <select required value={value} onChange={({ target }) => onChange(target.value)}>
      <option value="" disabled>
        select an author
      </option>
      {data.allAuthors.map((author) => (
        <option key={author.id} value={author.name}>
          {author.name}
        </option>
      ))}
    </select>
  );
};

const UpdateAuthor = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const setBornTo = parseInt(born);
    await editAuthor({ variables: { name, setBornTo } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <AuthorSelect value={name} onChange={setName} />
          </label>
        </div>
        <div>
          <label>
            born
            <input required value={born} onChange={({ target }) => setBorn(target.value)} />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
