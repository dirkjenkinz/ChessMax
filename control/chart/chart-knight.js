const buildKnight = (move, i) => {
    let player = move.chart[i][0][0].substring(0, 1)
    let row = move.chart[i][0][1];
    let column = move.chart[i][0][2];
    let m = [
        [row + 2, column - 1],
        [row + 2, column + 1],
        [row + 1, column - 2],
        [row + 1, column + 2],
        [row - 1, column - 2],
        [row - 1, column + 2],
        [row - 2, column - 1],
        [row - 2, column + 1]
    ];
    for (let a = 0; a < 8; a++) {
        let r = m[a][0];
        let c = m[a][1];
        if (r > -1 && c > -1 && r < 8 && c < 8) {
            if (move.map[r][c].substring(0, 1) != player) {
                move.chart[i].push([r, c, move.map[r][c]]);
            };
        };
    };
};
