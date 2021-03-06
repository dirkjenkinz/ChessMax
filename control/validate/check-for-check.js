const checkForCheck = (move) => {
    move.wcheck = false;
    move.bcheck = false;
    let tempMove = JSON.parse(JSON.stringify(move));
    tempMove.map[tempMove.to.row][tempMove.to.column] = tempMove.map[tempMove.from.row][tempMove.from.column];
    tempMove.map[tempMove.from.row][tempMove.from.column] = 'XX';
    tempMove.chart = [];
    makeChart(tempMove);
    for (let i = 0; i < tempMove.chart.length; i++) {
        for (let j = 1; j < tempMove.chart[i].length; j++) {
            if (tempMove.chart[i][j][2] === 'WK') {
                move.wcheck = true;
            }
            if (tempMove.chart[i][j][2] === 'BK') {
                move.bcheck = true;
            }
        };
    };
};

const checkForCheckMate = (move) => {
    makeChart(move);
    let colour;
    if (move.player === 'WHITE') {
        colour = 'W';
    } else {
        colour = 'B';
    };
    let c = [];

    for (let i = 0; i < move.chart.length; i++) {                    // colour filter
        let item = move.chart[i];
        if (item[0][0].substring(0, 1) === colour) {
            if (item.length > 1) {
                c.push(item);
            }
        };
    };

    for (let i = 0; i < c.length; i++) {
        let item = c[i];
        let from = item[0];
        let ok = false;
        for (let j = 1; j < item.length; j++) {
            let to = item[j];
            if (!check(move, from, to)) {
                ok = true;
            };
        };
        if (!ok) {
            c[i][0] = ['4'];
        };
    };

    let cTemp = [];
    for (let i = 0; i < c.length; i++) {
        if (c[i][0].length > 1) {
            cTemp.push(c[i]);
        }
    };

    if (cTemp.length === 0 && move.player === 'WHITE' && move.wcheck) {
        move.wmate = true;
    };
    if (cTemp.length === 0 && move.player === 'BLACK' && move.bcheck) {
        move.bmate = true;
    };
};