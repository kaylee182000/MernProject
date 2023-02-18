import React, { useState, useEffect } from "react";
import { Note } from "../../models/notes";

export default function CardNote( data: Note ) {
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
