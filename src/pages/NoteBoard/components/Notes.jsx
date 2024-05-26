import { Stack } from "@mui/material";
import React from "react";
import Note from "./Note";

const Notes = ({ notes = [], handleSetNodes = () => {} }) => {
  return (
    <>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </>
  );
};

export default Notes;
