import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Note } from "./models/notes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [note, setNote] = useState<Note[]>([]);
  const fetchNote = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    return res.data;
  };
  const { isLoading, error, data, isFetching } = useQuery(["notes"], fetchNote);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {isLoading && <h1>Waiting</h1>}
          {!isLoading &&
            data.map((item: any, index: number) => {
              return <li key={index}>{item.title}</li>;
            })}
        </ul>
      </header>
    </div>
  );
}

export default App;
