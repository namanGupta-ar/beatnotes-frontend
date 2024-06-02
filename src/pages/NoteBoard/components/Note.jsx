import { Stack } from "@mui/material";
import React, { forwardRef, useEffect } from "react";

const Note = forwardRef(({ note, className, ...props}, ref) => {
  const {id, text, position} = note;
  
  return (
      <Stack
        ref={ref}
        style={{
          position: "absolute",
          left: `${position?.x}px`,
          top: `${position?.y}px`
        }}
        className={`border-2 border-black select-none p-2 w-[200px] cursor-move bg-yellow-100 ${className}`}
        {...props}
      >
        📌 {text}
      </Stack>
  );
});

export default Note;
