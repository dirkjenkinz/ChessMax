const startMap = [
    ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
    ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
    ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
    ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
    ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
    ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR']
];

const startFen = {
    'piecePlacement': 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
    'activeColour': 'w',
    'castlingAbility': 'KQkq',
    'enPassantTargetSquare': '-',
    'halfMoveClock': '0',
    'fullmoveCounter': '1'
};

const saveGame = () => {
    let name = '_c_' + $('#gname').val();
    localStorage.setItem(name, JSON.stringify(move.fen));
    $('#btn_save').attr("disabled", true);
};

const displaySavedGames = () => {
    move.storage = [];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.substring(0, 3) === '_c_') {
            move.storage.push([localStorage.key(i).substring(3), JSON.parse(localStorage.getItem(localStorage.key(i)))]);
        }
    };
    showFiles(move);
};

const squareClick = e => {
    clearHighlights();
    if (move.phase === 'from') {
        phaseFrom(move, e);
    } else {
        $('#btn_moves').text('Possible Moves');
        phaseTo(move, e);
    }
};

const start = () => {
    $('#pick').hide();
    $('#btn_cancel').attr("disabled", true);
    $('#btn_save').attr("disabled", true);
    $('#piece-placement').text(move.fen.piecePlacement);
    $('#active-colour').text(move.fen.activeColour);
    $('#castling-ability').text(move.fen.castlingAbility);
    $('#en-passant').text(move.fen.enPassantTargetSquare);
    $('#halfmove-clock').text(move.fen.halfMoveClock);
    $('#fullmove-counter').text(move.fen.fullmoveCounter);
    $('#to-play').text(`${move.player} to play.`);
    buildBoard(move.map);
};

const cancelMove = () => {
    $(`#sq${move.from.row}${move.from.column}`).children().removeClass('selected');
    move.phase = 'from';
    $('#piece').text('');
    $('#from-box').text('');
    $('#to-box').text('');
    $('#btn_cancel').attr("disabled", true);
};

const promotePiece = id => {
    let piece = move.player.substring(0, 1);
    if (piece === 'W') {
        piece = 'B';
    } else {
        piece = 'W';
    };
    let sq = 'sq' + move.to.row + move.to.column;
    switch (id) {
        case 'btn-rook':
            piece += 'R';
            break;
        case 'btn-queen':
            piece += 'Q';
            break;
        case 'btn-knight':
            piece += 'N';
            break;
        case 'btn-bishop':
            piece += 'B';
            break;
    }
    $(`#${sq}`).html(`<img src='../images/${piece}.png' width='50'>`);
    $(`#sq${move.from.row}${move.from.column}`).html(`<img src='../images/XX.png' width='50'>`);
    move.map[move.to.row][move.to.column] = piece;
    $('#pick').hide();
};

let move = {
    'pieces1': 'RNBQKP',
    'pieces2': ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Pawn'],
    'alpha': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    'player': 'WHITE',
    'from': {
        'id': '',
        'column': '',
        'row': '',
        'notation': '',
    },
    to: {
        'id': '',
        'column': '',
        'row': '',
        'value': '',
        'notation': ''
    },
    mode: 'duplex',
    promoting: false,
    piece: '',
    phase: 'from',
    bt: 0,
    wt: 0,
    captured: '',
    bcheck: false,
    wcheck: false,
    bmate: false,
    wmate: false,
    squareValue: '',
    enPassant: [],
    fen: startFen,
    map: startMap,
    chart: [],
    storage: [],
    log: [],
    autoplay: autoplay,
    start: start,
    squareClick: squareClick,
    promotePiece: promotePiece,
    cancelMove: cancelMove,
    saveGame: saveGame,
    displaySavedGames: displaySavedGames
};

export { move };