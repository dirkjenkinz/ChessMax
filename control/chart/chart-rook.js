const buildRook = (move, i) => {
    let player = move.chart[i][0][0].substring(0, 1)
    let opponent;
    if (player === 'W') {
        opponent = 'B';
    } else {
        opponent = 'W';
    }

    let startRow = move.chart[i][0][1];
    let startColumn = move.chart[i][0][2];
    // forward (up column - column static - row incremented);
    let stop = false;
    for (let row = startRow + 1; row < 8; row++) {
        if (move.map[row][startColumn] !== 'XX' && !stop) {
            if (move.map[row][startColumn].substring(0, 1) === opponent) {
                move.chart[i].push([row, startColumn, move.map[row][startColumn]]);
            };
            stop = true;
        }
        if (move.map[row][startColumn] === 'XX' && !stop) {
            move.chart[i].push([row, startColumn, move.map[row][startColumn]]);
        };
    };
    // forward (down column - column static - row decremented);
    stop = false;
    for (let row = startRow - 1; row > -1; row--) {
        if (move.map[row][startColumn] !== 'XX' && !stop) {
            if (move.map[row][startColumn].substring(0, 1) === opponent) {
                move.chart[i].push([row, startColumn, move.map[row][startColumn]]);
            };
            stop = true;
        }
        if (move.map[row][startColumn] === 'XX' && !stop) {
            move.chart[i].push([row, startColumn, move.map[row][startColumn]]);
        };
    };
    // forward (across row - row static - column incremented);
    stop = false;
    for (let column = startColumn + 1; column < 8; column++) {
        if (move.map[startRow][column] !== 'XX' && !stop) {
            if (move.map[startRow][column].substring(0, 1) === opponent) {
                move.chart[i].push([startRow, column, move.map[startRow][column]]);
            };
            stop = true;
        }
        if (move.map[startRow][column] === 'XX' && !stop) {
            move.chart[i].push([startRow, column, move.map[startRow][column]]);
        };
    };
    // forward (across row - row static - column decremented);
    stop = false;
    for (let column = startColumn - 1; column > -1; column--) {
        if (move.map[startRow][column] !== 'XX' && !stop) {
            if (move.map[startRow][column].substring(0, 1) === opponent) {
                move.chart[i].push([startRow, column, move.map[startRow][column]]);
            };
            stop = true;
        }
        if (move.map[startRow][column] === 'XX' && !stop) {
            move.chart[i].push([startRow, column, move.map[startRow][column]]);
        };
    };
};
