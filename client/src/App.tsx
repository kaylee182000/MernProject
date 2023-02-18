import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Note } from "./models/notes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardNote from "./components/CardNote";

function App() {
  const [note, setNote] = useState<Note[]>([]);
  const fetchNote = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    return res.data;
  };
  const { isLoading, error, data, isFetching } = useQuery(["notes"], fetchNote);

  useEffect(() => {
    setNote(data);
  }, [isFetching]);

  return (
    <div>
      <header>
        <div className="row">
          {isLoading && <h1>Waiting</h1>}
          {!isLoading &&
            note?.length > 0 &&
            note?.map((item, index) => {
              return <CardNote data={item} key={index} />;
            })}
        </div>
      </header>
    </div>
  );
}

export default App;
