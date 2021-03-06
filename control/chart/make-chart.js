const makeChart = (move) => {
    buildChart(move);
    chartMoves(move);
    removeInvalidMoves(move);
};


// steps through the board - builds array showing what piece is on what square
const buildChart = (move) => {
    move.chart = [];
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let piece = move.map[row][column];
            move.chart.push([[piece, row, column]]);
        };
    };
};


// expands the chart array to show possible moves for each piece on the board
const chartMoves = (move) => {
    for (let i = 0; i < move.chart.length; i++) {
        switch (move.chart[i][0][0]) {
            case 'WB': buildBishop(move, i);
                break;
            case 'BB': buildBishop(move, i);
                break;
            case 'WN': buildKnight(move, i);
                break;
            case 'BN': buildKnight(move, i);
                break;
            case 'WR': buildRook(move, i);
                break;
            case 'BR': buildRook(move, i);
                break;
            case 'WP': buildWhitePawn(move, i);
                break;
            case 'BP': buildBlackPawn(move, i);
                break;
            case 'WQ': buildQueen(move, i);
                break;
            case 'BQ': buildQueen(move, i);
                break;
            case 'WK': buildKing(move, i);
                break;
            case 'BK': buildKing(move, i);
                break;
        };
    };
};

const removeInvalidMoves = (move) => {
    let c = [];
    for (let i = 0; i < move.chart.length; i++) {                     // remove non-moves
        let item = move.chart[i];
        if (item[0][0].substring(0, 1) && item.length > 1) {
            c.push(item);
        };
    };

    let temp1 = [];

    for (let i = 0; i < c.length; i++) {                // step through chart
        let item = c[i];
        let from = item[0];
        let ok = false;
        let current = [c[i][0]];
        for (let j = 1; j < item.length; j++) {         // step through 'to' components
            let to = item[j];
            if (!check(move, from, to)) {               // if move does not result in check
                current.push(to)                        // preserve move
            };
        };
        temp1.push(current);
    };

    c = [];

    for (let i = 0; i < temp1.length; i++){             // remove all supercomponents with no 'to' components left
        if (temp1[i].length > 1) {
            c.push(temp1[i]);
        }
    }
    move.chart = c;
};

const check = (move, from, to) => {
    let showLog = false;
    if (from[0] === "BP" && from[1] === 6 && from[2] === 5) {
        if (to[0] === 4 && to[1] === 5) {
            showLog = true;
        }
    }
    let m = JSON.parse(JSON.stringify(move));
    m.wcheck = false;
    m.bcheck = false;
    m.piece = from[0];
    m.from.row = from[1];
    m.from.column = from[2];
    m.to.row = to[0];
    m.to.column = to[1];
    m.map[m.to.row][m.to.column] = m.piece;
    m.map[m.from.row][m.from.column] = 'XX';
    buildChart(m);
    let bollocks = m.chart;
    chartMoves(m);
    if (m.chart.length > 0) {
        for (let i = 0; i < m.chart.length; i++) {
            for (let j = 1; j < m.chart[i].length; j++) {
                if (m.chart[i][j][2] === 'WK') {
                    m.wcheck = true;
                };
                if (m.chart[i][j][2] === 'BK') {
                    m.bcheck = true;
                };
            };
        };
        if (m.wcheck && m.player === 'WHITE') return true;
        if (m.bcheck && m.player === 'BLACK') return true;
    }
    return false;
};
