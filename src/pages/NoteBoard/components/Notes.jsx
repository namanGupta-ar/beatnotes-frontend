import { Stack } from "@mui/material";
import React, { createRef, useEffect, useRef } from "react";
import Note from "./Note";

const Notes = ({ notes = [], handleSetNotes }) => {
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((no) => no.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    handleSetNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const notesRefs = useRef([]);

  const parentRef = useRef(null);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };


  const handleDragStart = (note, e) => {
    const { id } = note;
    const noteref = notesRefs.current[id].current;
    const rect = noteref.getBoundingClientRect();
    const parentDiv = parentRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const startPos = note.position;
    noteref.style.zIndex = '1000';
    const handleMouseMove = (e) => {
      const eventX = e.clientX - parentDiv.left;
      const eventY = e.clientY - parentDiv.top;
      const newX = eventX - offsetX;
      const newY = eventY - offsetY;
      noteref.style.left = `${newX}px`;
      noteref.style.top = `${newY}px`;
    }
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      noteref.style.zIndex = '0';
      const finalRect = noteref.getBoundingClientRect();
      const newPosition = {
        x: finalRect.left - parentDiv.left,
        y: finalRect.top - parentDiv.top
      }

      if(checkForOverlap(id)) {
        noteref.style.left = `${startPos.x}px`;
        noteref.style.top = `${startPos.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const checkForOverlap = (id) => {
    const currentNoteRef = notesRefs.current[id].current;
    const {top: cTop, right: cRight, left: cLeft, bottom: cBottom} = currentNoteRef.getBoundingClientRect();
    console.log("current ",cTop, cRight, cLeft, cBottom);
    return notes.some(({id: noteId}) => {
      if(noteId === id) return false;

      const noteRef = notesRefs.current[noteId].current;
      const {top, left, right, bottom} = noteRef.getBoundingClientRect();
      console.log("note ",top, left, right, bottom)
      const overLap = !(
        cTop > bottom ||
        cLeft > right || 
        cBottom < top ||
        cRight < left
      )
      console.log("overlapping ",overLap)
      return overLap;
    });
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map(note => note.id === id ? {...note, position: newPosition} : note);
    handleSetNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  return (
    <>
      <Stack className="relative border-2 border-red-500" ref={parentRef}>  
        {notes.map((note) => (
          <Note
            ref={
              notesRefs.current[note.id] ? notesRefs.current[note.id] :
              (notesRefs.current[note.id] = createRef())
            }
            key={note.id}
            note={note}
            onMouseDown={(e) => handleDragStart(note, e)}
          />
        ))}
      </Stack>
    </>
  );
};

export default Notes;
