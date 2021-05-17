import React from "react";
import { highlightAllowedZone } from "../helper";
import "../brain-vita.css";

const BrainVita = ({
  state,
  dragTracker,
  onDrop,
  onDragOver,
  onDragstart,
  onDragEnd,
  marbelCount,
}) => (
  <div className="container">
    <span className="marbelCount">{marbelCount}</span>
    {state.map((row, rowIndex) => {
      return (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => {
            const highlightTarget = highlightAllowedZone(
              rowIndex,
              cellIndex,
              dragTracker
            );
            const key = `"${rowIndex}+${cellIndex}"`;
            return (
              cell && (
                <div
                  key={key}
                  className={highlightTarget ? "cell targetCell" : "cell"}
                  allowedzone={highlightTarget.toString()}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                >
                  <span
                    row={rowIndex}
                    cell={cellIndex}
                    draggable={cell === "0" ? true : false}
                    onDragStart={onDragstart}
                    onDragEnd={onDragEnd}
                  >
                    {cell}
                  </span>
                </div>
              )
            );
          })}
        </div>
      );
    })}
  </div>
);
export default BrainVita;
