import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
const url = "http://localhost:5000/";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios
      .get(url + "notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, [notes]);
  function addNote(note) {
    setNotes((prevValue) => [...prevValue, note]);
    axios.post(url + "add", note).catch((err) => {
      console.log(err);
    });
  }

  function deleteNote(id) {
    const updatedList = notes.filter((note, index) => index !== id);
    setNotes(updatedList);
    axios.post(url + "delete", { idNote: id }).catch((err) => console.log(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
