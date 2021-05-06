const oneSquareForward = (move) => {
    if (move.from.column === move.to.column) {
        if (move.player === 'WHITE' && move.from.row + 1 === move.to.row ||
            move.player === 'BLACK' && move.from.row - 1 === move.to.row) {
            move.fen.enPassantTargetSquare = '-';
            move.enPassant = [];
            checkPromotion(move);
        }
    };
};

const twoSquaresForward = (move) => {
    move.from.notation = move.alpha[move.from.column] + (move.from.row +1);
    move.to.notation = move.alpha[move.to.column] + (move.to.row +1);
     if (move.from.column === move.to.column) {                                  //moving forward
        if (move.player === 'WHITE' &&                                          //white player
            move.from.row === 1 &&                                              // pawn not yet moved
            move.to.row === 3) {                                //two squares - white player
            move.fen.enPassantTargetSquare = move.from.notation.substring(0, 1) + 3;
            move.enPassant = [move.to.row, move.to.column];
        } else if (                                                               //black player
            move.from.row === 6 &&                                                  // pawn not yet moved
            move.to.row === 4) 
        {                                                    //two squares - black player
            //check for white pawn to either side of black pawn
            move.fen.enPassantTargetSquare = move.from.notation.substring(0, 1) + 6;
            move.enPassant = [move.to.row, move.to.column];
        }
    };
};

const takePiece = (move) => {
    if (move.from.column - 1 === move.to.column || move.from.column + 1 === move.to.column) {
        if (move.player === 'WHITE' && move.from.row + 1 === move.to.row) {     //one square - white player
            if (move.to.value.substring(0, 1) === 'B') {                         //square is occupied by black piece
                move.fen.enPassantTargetSquare = '-';
                move.enPassant = [];
                checkPromotion(move);
                return;
            }
            if (move.to.row - 1 === move.enPassant[0] && move.to.column === move.enPassant[1]) {   // en passant
                $(`#sq${move.enPassant[0]}${move.enPassant[1]}`).html(`<img src='../images/XX.png' width='50'>`);
                move.fen.enPassantTargetSquare = '-';
                move.enPassant = [];
                move.captured = '->' + move.to.value;
                $(`#bt${move.bt}`).html(`<img src='../images/BP.png' width='50'>`);
                move.bt++;
            }
        } else if (move.from.row - 1 === move.to.row) {                         //one square - black player
            if (move.to.value.substring(0, 1) === 'W') {                         //square is occupied by white piece
                move.fen.enPassantTargetSquare = '-';
                move.enPassant = [];
                checkPromotion(move);
                return;
            }
            if (move.to.row + 1 === move.enPassant[0] && move.to.column === move.enPassant[1]) {   // en passant
                $(`#sq${move.enPassant[0]}${move.enPassant[1]}`).html(`<img src='../images/XX.png' width='50'>`);
                move.fen.enPassantTargetSquare = '-';
                move.enPassant = [];
                move.captured = '->' + move.to.value;
                $(`#wt${move.wt}`).html(`<img src='../images/WP.png' width='50'>`);
                move.wt++;
                return;
            }
        };
    };
    return;
};

const checkPromotion = move => {
    if (move.player === 'WHITE' && move.to.row === 7) {
        selectPiece(move);
    };
    if (move.player === 'BLACK' && move.to.row === 0) {
        selectPiece(move);
    };
};

const selectPiece = (move) => {
    move.promoting = true;
    $('#pick').modal({
        backdrop: 'static',
        keyboard: false
    }); 
};

const validatePawn = (move) => {
    makeChart(move);
    for (let i = 0; i < move.chart.length; i++) {
        if (move.chart[i][0][1] === move.from.row && move.chart[i][0][2] === move.from.column) {
            let item = move.chart[i];
            for (let j = 1; j < item.length; j++) {
                if (item[j][0] === move.to.row && item[j][1] === move.to.column) {
                    oneSquareForward(move);
                    twoSquaresForward(move);
                    takePiece(move);
                    return true;
                };
            };
        };
    };
    return false;
};