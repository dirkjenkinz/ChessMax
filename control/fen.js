const men1 = ['WR', 'WN', 'WB', 'WQ', 'WK', 'WP', 'BR', 'BN', 'BB', 'BQ', 'BK', 'BP', 'XX'];
const men2 = 'RNBQKPrnbqkp-';

const updateFen = (move) => {
    let lines = [];
    for (let row = 0; row < 8; row++) {
        let line = []
        for (let column = 0; column < 8; column++) {
            let piece = $(`#sq${row}${column}`).html().substring(20, 22);
            let man = men2.substring(men1.indexOf(piece), men1.indexOf(piece) + 1);
            line.push(man);
        }
        lines.push(line.toString().replace(/,/g, ''));
    }
    for (let i = 0; i < lines.length; i++) {
        lines[i] = countDashes(lines[i]);
    };
    move.fen.piecePlacement = '';
    for (let i = 7; i > -1; i--) {
        move.fen.piecePlacement += lines[i] + '/';
    };
    move.fen.piecePlacement = move.fen.piecePlacement.substring(0, move.fen.piecePlacement.length - 1);
    $('#piece-placement').text(move.fen.piecePlacement);
    if (move.player === 'WHITE') {
        move.fen.activeColour = 'b';
    } else {
        move.fen.activeColour = 'w';
    }
    $('#active-colour').text(move.fen.activeColour);
    $('#en-passant').text(move.fen.enPassantTargetSquare);
}

const countDashes = (line) => {
    let dashCount = 0;
    let newLine = '';
    for (let i = 0; i < line.length; i++) {
        if (line.substring(i, i + 1) === '-') {
            dashCount++;
        } else {
            if (dashCount === 0) {
                newLine += line.substring(i, i + 1);
            } else {
                newLine += dashCount + line.substring(i, i + 1);
                dashCount = 0;
            }
        }
    }
    if (dashCount > 0) newLine += dashCount;
    return newLine;
}