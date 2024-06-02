import React, { useState } from "react";
import Notes from "./components/Notes";

const TodoBoard = () => {
  const initNotes = [
    {
      id: 11,
      text: "React is a JavaScript library for building user interfaces",
    },
    {
      id: 12,
      text: "ReactJS, also known as React, is a popular JavaScript library for building user interfaces",
    },
  ];
  const [notes, setNotes] = useState(initNotes);
  const handleSetNotes = (arg) => {
    setNotes(arg);
  };
  return (
    <div>
      TodoBoard
      <Notes notes={notes} handleSetNotes={handleSetNotes} />
    </div>
  );
};

export default TodoBoard;
