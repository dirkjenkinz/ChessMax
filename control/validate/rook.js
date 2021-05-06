const validateRook = (move) => {
    makeChart(move);
    for (let i = 0; i < move.chart.length; i++) {
        if (move.chart[i][0][1] === move.from.row && move.chart[i][0][2] === move.from.column) {
            let item = move.chart[i];
            for (let j = 1; j < item.length; j++) {
                if (item[j][0] === move.to.row && item[j][1] === move.to.column) {
                    move.fen.enPassantTargetSquare = '-';
                    checkRookCastlingAbility(move);
                    return true;
                };
            };
        };
    };
    return false;
};

const checkRookCastlingAbility = (move) => {
    switch (move.from.id) {
        case '70':
            move.fen.castlingAbility = move.fen.castlingAbility.replace('q', '');
            break;
        case '77':
            move.fen.castlingAbility = move.fen.castlingAbility.replace('k', '');
            break;
        case '00':
            move.fen.castlingAbility = move.fen.castlingAbility.replace('Q', '');
            break;
        case '07':
            move.fen.castlingAbility = move.fen.castlingAbility.replace('K', '');
            break;
    };
    if (move.fen.castlingAbility === '') move.fen.castlingAbility = '-';
    $('#castling-ability').text(move.fen.castlingAbility);
};