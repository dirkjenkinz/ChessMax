const validateQueen = (move) => {
    makeChart(move);
    for (let i = 0; i < move.chart.length; i++) {
        if (move.chart[i][0][1] === move.from.row && move.chart[i][0][2] === move.from.column) {
            let item = move.chart[i];
            for (let j = 1; j < item.length; j++) {
                if (item[j][0] === move.to.row && item[j][1] === move.to.column) {
                    move.fen.enPassantTargetSquare = '-';
                    return true;
                };
            };
        };
    };
    return false;
};