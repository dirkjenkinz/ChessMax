const makeChart = (move) => {
    buildChart(move);
    chartMoves(move);
    removeInvalidMoves(move);
};

const buildChart = (move) => {
    move.chart = [];
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let piece = move.map[row][column];
            move.chart.push([[piece, row, column]]);
            let p = piece.substring(1);
            let px = move.pieces1.indexOf(p);
            let py = move.pieces2[px];
            let r = parseInt(row) + 1;
            move.notation_chart.push([move.player + ' ' + py, move.alpha[column], r]);
        };
    };
};

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


const convert1 = (move, m) => {
    n = [];
    for (let i = 0; i < m.length; i++) {
        let row = m[i][0];
        let column = move.alpha[m[i][1]];
        let piece = m[i][2];
        let p = '';
        if (piece !== 'XX') {
            if (piece.substring(0, 1) === 'W') {
                p = 'WHITE'
            } else {
                p = 'BLACK'
            };
            let x = move.pieces1.indexOf(piece.substring(1));
            p = p + ' ' + move.pieces2[x];
        }
        n.push([column, row, p]);
    };
    return n;
};

const convert2 = (move, m) => {
    n = [];
    let row = m[0];
    let column = move.alpha[m[1]];
    let piece = m[2];
    let p = '';
    if (piece !== 'XX') {
        if (piece.substring(0, 1) === 'W') {
            p = 'WHITE'
        } else {
            p = 'BLACK'
        };
        let x = move.pieces1.indexOf(piece.substring(1));
        p = p + ' ' + move.pieces2[x];
    }
    n.push([column, row, p]);
    return n;
};

const removeInvalidMoves = (move) => {
    let c = [];
    for (let i = 0; i < move.chart.length; i++) {
        let item = move.chart[i];
        if (item[0][0].substring(0, 1) && item.length > 1) {
            c.push(item);
        };
    };

    let cTemp1 = [];

    for (let i = 0; i < c.length; i++) {
        let item = c[i];
        let from = item[0];
        let ok = false;
        if (from[0][0] !== '@'){
            cTemp1.push(item);
        }
    };

    c = cTemp1;
     
    for (let i = 0; i < c.length; i++) {
        let item = c[i];
        let from = item[0];
        let ok = false;
        for (let j = 1; j < item.length; j++) {
            let to = item[j];
            if (to[0] !== '@') {
                if (check(move, from, to)) {
                    c[i][j] = ['@'];
                } else {
                    ok = true;
                };
            };
        };
        if (!ok) {
            c[i][0] = ['@'];
        };
    };


    let cTemp = [];
    for (let i = 0; i < c.length; i++) {
        let ok = false;
        for (let j = 1; j < c[i].length; j++) {
            if (c[i][j][0] !== '@') {
                ok = true;
            };
        };
        if (ok) {
            cTemp.push(c[i]);
        }
    };
    move.chart = cTemp;
};

const removeInvalidMoves2 = (move) => {
    let c = [];
    for (let i = 0; i < move.chart.length; i++) {
        let item = move.chart[i];
        if (item[0][0].substring(0, 1) && item.length > 1) {
            c.push(item);
        };
    };

    let cTemp1 = [];

    for (let i = 0; i < c.length; i++) {
        let item = c[i];
        let from = item[0];
        let ok = false;
        if (from[0][0] !== '@'){
            cTemp1.push(item);
        }
    };

    c = cTemp1;
     
    for (let i = 0; i < c.length; i++) {
        let item = c[i];
        let from = item[0];
        let ok = false;
        for (let j = 1; j < item.length; j++) {
            let to = item[j];
            if (to[0] !== '@') {
                if (check(move, from, to)) {
                    c[i][j] = ['@'];
                } else {
                    ok = true;
                };
            };
        };
        if (!ok) {
            c[i][0] = ['@'];
        };
    };

    let cTemp = [];
    for (let i = 0; i < c.length; i++) {
        let ok = false;
        let tempArray = c[i][0];
        tempArray.push[c[i][0]];
        for (let j = 1; j < c[i].length; j++) {
            if (c[i][j][0] !== '@') {
                tempArray.push(c[i][j])
            };
        };
        cTemp.push(tempArray);
    };
    move.chart = cTemp;
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
