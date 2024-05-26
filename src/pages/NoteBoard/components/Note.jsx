import { Stack } from '@mui/material'
import React from 'react'

const Note = ({note}) => {
  return (
    <>
        <div className="p-2" id={note.id}>{note.text}</div>
    </>
  )
}

export default Note