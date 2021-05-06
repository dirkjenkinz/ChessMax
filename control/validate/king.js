const validateKing = (move) => {
    makeChart(move);
    for (let i = 0; i < move.chart.length; i++) {
        if (move.chart[i][0][1] === move.from.row && move.chart[i][0][2] === move.from.column) {
            let item = move.chart[i];
            for (let j = 1; j < item.length; j++) {
                if (item[j][0] === move.to.row && item[j][1] === move.to.column) {
                    if (move.player === 'WHITE') {                                          //if King moves, it may no longer castle
                        if (move.from.row === 0 && move.from.column === 4 && move.to.row === 0 && move.to.column === 6){                // castle king's side
                            $('#sq07').html("<img src='../images/XX.png' width='50'>");
                            $('#sq05').html("<img src='../images/WR.png' width='50'>");
                        } else if (move.from.row === 0 && move.from.column === 4 && move.to.row === 0 && move.to.column === 1){
                            $('#sq00').html("<img src='../images/XX.png' width='50'>");
                            $('#sq02').html("<img src='../images/WR.png' width='50'>");
                        };
                        move.fen.castlingAbility = move.fen.castlingAbility.replace('Q', '');
                        move.fen.castlingAbility = move.fen.castlingAbility.replace('K', '');
                    } else {
                        if (move.from.row === 7 && move.from.column === 4 && move.to.row === 7 && move.to.column === 6){       // castle king's side
                            $('#sq77').html("<img src='../images/XX.png' width='50'>");
                            $('#sq75').html("<img src='../images/BR.png' width='50'>");
                        } else if (move.from.row === 7 && move.from.column === 4 && move.to.row === 7 && move.to.column === 1){
                            $('#sq70').html("<img src='../images/XX.png' width='50'>");
                            $('#sq72').html("<img src='../images/BR.png' width='50'>");
                        };
                        move.fen.castlingAbility = move.fen.castlingAbility.replace('q', '');
                        move.fen.castlingAbility = move.fen.castlingAbility.replace('k', '');
                    };
                    if (move.fen.castlingAbility === '') move.fen.castlingAbility = '-';
                    $('#castling-ability').text(move.fen.castlingAbility);
                    move.fen.enPassantTargetSquare = '-';
                    return true;
                };
            };
        };
    };
    return false;
};

const checkCastlingAbility = (move) => {
    if (move.player === 'WHITE' && move.from.id === '04' && move.to.id === '01' && move.fen.castlingAbility.indexOf('Q') !== -1) {
        if (move.map[0][3] === 'XX' &&
            move.map[0][2] === 'XX' &&
            move.map[0][1] === 'XX' &&
            move.map[0][0] === 'WR'
        ) {
            move.fen.enPassantTargetSquare = '-';
            $('#sq02').html($('#sq00').html());
            $('#sq00').html('');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('Q', '');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('K', '');
            if (move.fen.castlingAbility === '') move.fen.castlingAbility = '-';
            $('#castling-ability').text(move.fen.castlingAbility);
            return true;
        };
    };
    if (move.player === 'WHITE' && move.from.id === '04' && move.to.id === '06' && move.fen.castlingAbility.indexOf('K') !== -1) {
        if (move.map[0][5] === 'XX' &&
            move.map[0][6] === 'XX' &&
            move.map[0][7] === 'WR'
        ) {
            move.fen.enPassantTargetSquare = '-';
            $('#sq05').html($('#sq07').html());
            $('#sq07').html('');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('Q', '');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('K', '');
            move.fen.castlingAbility.replace('q', '');
            if (move.fen.castlingAbility === '') move.fen.castlingAbility = '-';
            $('#castling-ability').text(move.fen.castlingAbility);
            return true;
        };
    };
    if (move.player === 'BLACK' && move.from.id === '74' && move.to.id === '71' && move.fen.castlingAbility.indexOf('q') !== -1) {
        if (move.map[7][3] === 'XX' &&
            move.map[7][2] === 'XX' &&
            move.map[7][1] === 'XX' &&
            move.map[7][0] === 'BR'
        ) {
            move.fen.enPassantTargetSquare = '-';
            $('#sq72').html($('#sq70').html());
            $('#sq70').html('');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('q', '');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('k', '');
            if (move.fen.castlingAbility === '') move.fen.castlingAbility = '-';
            $('#castling-ability').text(move.fen.castlingAbility);
            return true;
        };
    };
    if (move.player === 'BLACK' && move.from.id === '74' && move.to.id === '76' && move.fen.castlingAbility.indexOf('k') !== -1) {
        if (move.map[7][5] === 'XX' &&
            move.map[7][6] === 'XX' &&
            move.map[7][7] === 'BR'
        ) {
            move.fen.enPassantTargetSquare = '-';
            $('#sq75').html($('#sq77').html());
            $('#sq77').html('');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('q', '');
            move.fen.castlingAbility = move.fen.castlingAbility.replace('k', '');
            if (move.fen.castlingAbility === '') move.fen.castlingAbility = '-';
            $('#castling-ability').text(move.fen.castlingAbility);
            return true;
        };
    };
    return false;
}
