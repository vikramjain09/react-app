import { useState, useCallback, useMemo } from "react";
import { findEmptyCells, resetMarbels } from "./helper";

const defaultGameState = [
  ["", "", "0", "0", "0", "", ""],
  ["", "", "0", "0", "0", "", ""],
  ["0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "X", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0"],
  ["", "", "0", "0", "0", "", ""],
  ["", "", "0", "0", "0", "", ""],
];

const useGameState = () => {
  const [state, setState] = useState(defaultGameState);
  const [dragTracker, setDragTracker] = useState({});
  const [marbelCount, setMarbelCount] = useState(32);

  const onDragstart = useCallback(
    ({ target }) => {
      const row = Number(target.getAttribute("row"));
      const cell = Number(target.getAttribute("cell"));
      const emptyCells = findEmptyCells(row, cell, state);
      setDragTracker({ row, cell, emptyCells });
    },
    [state]
  );

  const onDrop = useCallback(
    ({ currentTarget }) => {
      if (currentTarget.getAttribute("allowedzone") === "true") {
        const targetRow = Number(currentTarget.firstChild.getAttribute("row"));
        const targetCell = Number(
          currentTarget.firstChild.getAttribute("cell")
        );
        const marbels = resetMarbels({
          state,
          dragTracker,
          targetRow,
          targetCell,
        });
        setState([...marbels]);
        setDragTracker({});
        setMarbelCount(marbelCount - 1);
      }
    },
    [marbelCount, state, dragTracker]
  );

  const onDragEnd = useCallback(() => {
    setDragTracker({});
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return useMemo(
    () => ({
      state,
      dragTracker,
      marbelCount,
      onDragstart,
      onDragEnd,
      onDrop,
      onDragOver,
    }),
    [
      state,
      dragTracker,
      marbelCount,
      onDragstart,
      onDragEnd,
      onDrop,
      onDragOver,
    ]
  );
};

export default useGameState;
