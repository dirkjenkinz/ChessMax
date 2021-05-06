const buildKing = (move, i) => {
    let opponent = 'W';
    if (move.player == 'WHITE') opponent = 'B'; 
    let row = move.chart[i][0][1];
    let column = move.chart[i][0][2];
    let m = [
        [row - 1, column - 1],
        [row, column - 1],
        [row + 1, column - 1],
        [row + 1, column],
        [row + 1, column + 1],
        [row + 0, column + 1],
        [row - 1, column + 1],
        [row - 1, column]
    ]

    let n = [];

    for (let a = 0; a < m.length; a++) {
        let row = m[a][0];
        let column = m[a][1];
        if (row > -1 && column > -1 && row < 8 && column < 8) {
            if (move.map[row][column] == 'XX') {
                move.chart[i].push([row, column, move.map[row][column]]);
            };
            if (move.map[row][column].substring(0,1) == opponent) {
                move.chart[i].push([row, column, move.map[row][column]]);
            };
        };
    };

    // check for castling ability
    if (move.chart[i][0][0] === 'WK' && move.fen.castlingAbility.indexOf('Q') > -1){
        if (move.map[0][1] === 'XX' && move.map[0][2] === 'XX' && move.map[0][3] === 'XX'){
            move.chart[i].push([0, 1,'Xc']);
        };
    };
    if (move.chart[i][0][0] === 'WK' && move.fen.castlingAbility.indexOf('K') > -1){
        if (move.map[0][5] === 'XX' && move.map[0][6] === 'XX'){
            move.chart[i].push([0, 6,'Xc']);
        };
    };
    if (move.chart[i][0][0] === 'BK' && move.fen.castlingAbility.indexOf('q') > -1){
        if (move.map[7][1] === 'XX' && move.map[7][2] === 'XX' && move.map[7][3] === 'XX'){
            move.chart[i].push([7, 1,'Xc']);
        };
    };
    if (move.chart[i][0][0] === 'BK' && move.fen.castlingAbility.indexOf('k') > -1){
        if (move.map[7][5] === 'XX' && move.map[7][6] === 'XX'){
            move.chart[i].push([7, 6,'Xc']);
        };
    };
};
