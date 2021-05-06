let log = [];

const checkFrom = (move, id) => {
    move.squareValue = move.map[id.substring(2, 3)][id.substring(3)];
    if (move.squareValue.substring(0, 1) !== move.player.substring(0, 1)) return false;
    move.from.id = id.substring(2);
    move.from.column = parseInt(move.from.id.substring(1));
    move.from.row = parseInt(move.from.id.substring(0, 1));
    move.piece = move.squareValue.substring(1);
    $(`#${id}`).children().addClass('selected');
    return true;
};

const phaseFrom = (move, e) => {
    let id = e.currentTarget.id;
    let legitimate = checkFrom(move, id);
    if (legitimate) {
        $('#btn_cancel').show();
        move.phase = 'to';
    }
};

const checkTo = (move, id) => {
    move.to.id = id.substring(2);
    move.to.column = parseInt(move.to.id.substring(1));
    move.to.row = parseInt(move.to.id.substring(0, 1));
    move.to.value = $(`#sq${move.to.id}`).html().substring(20, 22);
    if (move.piece === 'P') return validatePawn(move);
    if (move.piece === 'R') return validateRook(move);
    if (move.piece === 'B') return validateBishop(move);
    if (move.piece === 'N') return validateKnight(move);
    if (move.piece === 'K') return validateKing(move);
    if (move.piece === 'Q') return validateQueen(move);
};

const phaseTo = (move, e) => {
    let id = e.currentTarget.id;
    let legitimate = checkTo(move, id);
    checkForCheck(move);
    if (move.player === 'WHITE' && move.wcheck) {
        legitimate = false;
    };
    
    if (move.player === 'BLACK' && move.bcheck) {
        legitimate = false;
    }; 

    if (legitimate) {
        $('#btn_cancel').hide();
        makeMove(move);
    };
};
