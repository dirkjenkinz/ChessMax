const buildWhitePawn = (move, i) => {
    let row = move.chart[i][0][1];
    let column = move.chart[i][0][2];
    if (row !== 7 && row !== 0) {
        if (move.map[row + 1][column] === 'XX') {                            //square in front of pawn is empty
            move.chart[i].push([row + 1, column, 'XX']);
            move.notation_chart[i].push(convert2(move, [row + 1, column, 'XX']));
            if (row === 1 && move.map[row + 2][column] === 'XX') {
                move.chart[i].push([row + 2, column, 'XX']);               //square 2 ahead of pawn is empty
                move.notation_chart[i].push(convert2(move, [row + 2, column, 'XX']));
            };
        }

        if (column !== 7) {
            if (move.map[row + 1][column + 1].substring(0, 1) === 'B') {            //black piece diagonally ahead
                move.chart[i].push([row + 1, column + 1, move.map[row + 1][column + 1]]);
                move.notation_chart[i].push(convert2(move, [row + 1, column + 1, move.map[row + 1][column + 1]]));
            };
        };
        if (column !== 0) {
            if (move.map[row + 1][column - 1].substring(0, 1) === 'B') {            //black piece diagonally ahead
                move.chart[i].push([row + 1, column - 1, move.map[row + 1][column - 1]]);
                move.notation_chart[i].push(convert2(move, [row + 1, column - 1, move.map[row + 1][column - 1]]));
            };
        };
    };
    // check for en passant target
    if (column !== 7) {
        if (row === move.enPassant[0] && column + 1 === move.enPassant[1]) {
            move.chart[i].push([row + 1, column + 1, 'Be']);
            move.notation_chart[i].push(convert2(move, [row + 1, column + 1, 'Be']));
        };
    };
    if (column !== 0) {
        if (row === move.enPassant[0] && column - 1 === move.enPassant[1]) {
            move.chart[i].push([row + 1, column - 1, 'Be']);
            move.notation_chart[i].push(convert2(move, [row + 1, column - 1, 'Be']));
        };
    };
};

const buildBlackPawn = (move, i) => {
    let row = move.chart[i][0][1];
    let column = move.chart[i][0][2];
    if (row !== 0) {
        if (move.map[row - 1][column] === 'XX') {                  //square in front of pawn is empty
            move.chart[i].push([row - 1, column, 'XX']);
            move.notation_chart[i].push(convert2(move, [row - 1, column, 'XX']));
            if (row === 6 && move.map[row - 2][column] === 'XX') {
                move.chart[i].push([row - 2, column, 'XX']);               //square 2 ahead of pawn is empty
                move.notation_chart[i].push(convert2(move, [row - 2, column, 'XX']));
            };
        }
        if (column !== 7) {
            if (move.map[row - 1][column + 1].substring(0, 1) === 'W') {            //white piece diagonally ahead
                move.chart[i].push([row - 1, column + 1, move.map[row - 1][column + 1]]);
                move.notation_chart[i].push(convert2(move, [row - 1, column + 1, move.map[row - 1][column + 1]]));
            };
        };
        if (column !== 0) {
            if (move.map[row - 1][column - 1].substring(0, 1) === 'W') {            //white piece diagonally ahead
                move.chart[i].push([row - 1, column - 1, move.map[row - 1][column - 1]]);
                move.notation_chart[i].push(convert2(move, [row - 1, column - 1, move.map[row + 1][column - 1]]));
            };
        }
        if (column !== 7) {
            if (row === move.enPassant[0] && column + 1 === move.enPassant[1]) {
                move.chart[i].push([row - 1, column + 1, 'We']);
                move.notation_chart[i].push(convert2(move, [row - 1, column + 1, 'We']));
            };
        };
        if (column !== 0) {
            if (row === move.enPassant[0] && column - 1 === move.enPassant[1]) {
                move.chart[i].push([row - 1, column - 1, 'We']);
                move.notation_chart[i].push(convert2(move, [row - 1, column - 1, 'We']));
            };
        };
    };
};
