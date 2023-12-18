import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setErrorMessage("");
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    const { title, content } = note;
    if (!title || !content) {
      setErrorMessage("Title and content are required");
      event.preventDefault();
      return;
    }
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    setErrorMessage("");
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>➕</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default CreateArea;
