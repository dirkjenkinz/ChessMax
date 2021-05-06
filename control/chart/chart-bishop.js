const buildBishop = (move, i) => {
    let player = move.chart[i][0][0].substring(0, 1)
    let r = move.chart[i][0][1];
    let c = move.chart[i][0][2];

    let m0 = [[r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3], [r + 4, c + 4], [r + 5, c + 5], [r + 6, c + 6], [r + 7, c + 7]];
    let m1 = [[r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3], [r - 4, c + 4], [r - 5, c + 5], [r - 6, c + 6], [r - 7, c + 7]];
    let m2 = [[r - 1, c - 1], [r - 2, c - 2], [r - 3, c - 3], [r - 4, c - 4], [r - 5, c - 5], [r - 6, c - 6], [r - 7, c - 7]];
    let m3 = [[r + 1, c - 1], [r + 2, c - 2], [r + 3, c - 3], [r + 4, c - 4], [r + 5, c - 5], [r + 6, c - 6], [r + 7, c - 7]];

    m0 = strip(m0, move.map, player);
    m1 = strip(m1, move.map, player);
    m2 = strip(m2, move.map, player);
    m3 = strip(m3, move.map, player);

    for (let a = 0; a < m0.length; a++) {
        move.chart[i].push(m0[a]);
    };
    for (let a = 0; a < m1.length; a++) {
        move.chart[i].push(m1[a]);
    };
    for (let a = 0; a < m2.length; a++) {
        move.chart[i].push(m2[a]);
    };
    for (let a = 0; a < m3.length; a++) {
        move.chart[i].push(m3[a]);
    };
};

const strip = (m, map, player) => {
    let stop = false;
    let n = [];
    for (let i = 0; i < m.length; i++) {
        if (!stop) {
            let row = m[i][0];
            let column = m[i][1]
            if (row > -1 && column > -1 && row < 8 && column < 8) {
                if (map[row][column].substring(0, 1) !== player) {
                    n.push([row, column, map[row][column]]);
                }
                if (map[row][column] !== 'XX') {
                    stop = true;
                }
            };
        }
    };
    return n;
};