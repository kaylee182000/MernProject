import React, { useState, useEffect } from "react";
import { Note } from "../../models/notes";

interface Data {
  data: Note;
}

export default function CardNote({data}: Data) {
  return (
    <div className="content col-6">
      <div className="header">
        <h3>{data.title}</h3>
      </div>
      <div className="body">
        <p>{data.text}</p>
      </div>
    </div>
  );
}
