const buildQueen = (move, i) => {
    if (move.player === 'BLACK'){
        move.player = 'WHITE'
    } else {
        move.player = 'BLACK'
    }
    buildBishop(move, i);
    buildRook(move, i);
    if (move.player === 'BLACK'){
        move.player = 'WHITE'
    } else {
        move.player = 'BLACK'
    }
};