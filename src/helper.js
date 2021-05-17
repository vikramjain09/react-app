export const findEmptyCells = (row, cell, state) => {
  const emptyCells = [];
  emptyCells.push(
    state[row][cell + 1] === "0" && state[row][cell + 2] === "X"
      ? { [`${row}+${cell + 2}`]: { row, cell: cell + 2 } }
      : {}
  );
  emptyCells.push(
    state[row][cell - 1] === "0" && state[row][cell - 2] === "X"
      ? { [`${row}+${cell - 2}`]: { row, cell: cell - 2 } }
      : {}
  );
  if (state[row + 1] && state[row + 2]) {
    emptyCells.push(
      state[row + 1][cell] === "0" && state[row + 2][cell] === "X"
        ? { [`${row + 2}+${cell}`]: { row: row + 2, cell } }
        : {}
    );
  }
  if (state[row - 1] && state[row - 2]) {
    emptyCells.push(
      state[row - 1][cell] === "0" && state[row - 2][cell] === "X"
        ? { [`${row - 2}+${cell}`]: { row: row - 2, cell } }
        : {}
    );
  }
  return emptyCells;
};

export const resetMarbels = ({ state, dragTracker, targetRow, targetCell }) => {
  const { row, cell } = dragTracker;
  const marbels = [...state];
  const middleRow =
    targetRow === row ? row : targetRow > row ? row + 1 : row - 1;
  const middleCell =
    targetCell === cell ? cell : targetCell > cell ? cell + 1 : cell - 1;
  marbels[middleRow][middleCell] = "X";
  marbels[row][cell] = "X";
  marbels[targetRow][targetCell] = "0";
  return marbels;
};

export const highlightAllowedZone = (row, cell, dragTracker) => {
  const { emptyCells } = dragTracker;
  return !!(emptyCells && emptyCells.some((a) => a[`${row}+${cell}`]));
};
