module.exports = function solveSudoku(matrix) {
  
  function solve(matrix, row, col) {
    let cell = findNotSpecifiedLocation(matrix, row, col);
    row = cell[0];
    col = cell[1];

    if (row == -1) {
      return true;
    }

    for (let number = 1; number <= 9; number++) {
      if (checkConflicts(matrix, row, col, number)) {
        matrix[row][col] = number;
        
        if (solve(matrix, row, col)) {
          return true;
        }

        matrix[row][col] = 0;
      }
    }

    return false;
  }

  function findNotSpecifiedLocation(matrix, row, col) {
    let success = false;
    let res = [-1, -1];

    while (!success) {
      if (row == 9) {
        success = true;
      } else {
        if (matrix[row][col] == 0) {
          res[0] = row;
          res[1] = col;
          success = true;
        } else {
          if (col < 8) {
            col++;
          } else {
            row++;
            col = 0;
          }
        }
      }
    }

    return res;
  }

  function checkConflicts(matrix, row, col, number) {
    return (
      isRowOk(matrix, row, number) &&
      isColOk(matrix, col, number) &&
      isBoxOk(matrix, row, col, number)
    );
  }

  function isRowOk(matrix, row, number) {
    for (let col = 0; col < 9; col++)
      if (matrix[row][col] == number) return false;
    return true;
  }

  function isColOk(matrix, col, number) {
    for (let row = 0; row < 9; row++)
      if (matrix[row][col] == number) return false;
    return true;
  }

  function isBoxOk(matrix, row, col, number) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        if (matrix[row + r][col + c] == number) return false;

    return true;
  }

  solve(matrix, 0, 0);

  return matrix;
}
