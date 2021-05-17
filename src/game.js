import React, { useCallback, useState } from "react";
import submit from "./api";
import BrainVita from "./component/brain-vita";
import useGameState from "./use-game-state";
import "./brain-vita.css";

const Game = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const {
    state,
    dragTracker,
    marbelCount,
    onDragstart,
    onDragEnd,
    onDrop,
    onDragOver,
  } = useGameState();

  const onChange = useCallback(
    ({ target: { value } }) => {
      if (message) {
        setMessage("");
      }
      setName(value);
    },
    [message]
  );
  const onClick = useCallback(async () => {
    if (name.trim() === "") {
      setMessage("Name cannot be left blank");
      return;
    }
    const respone = await submit({ marbelCount, name });
    setMessage(respone);
  }, [name, marbelCount]);

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Enter name"
        className="name"
        onChange={onChange}
      />

      <BrainVita
        state={state}
        dragTracker={dragTracker}
        marbelCount={marbelCount}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragstart={onDragstart}
        onDragEnd={onDragEnd}
      />
      <button type="button" className="button" onClick={onClick}>
        Api Call
      </button>
      {message && <span className="message">{message}</span>}
    </div>
  );
};

export default Game;
