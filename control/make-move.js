

const makeMove = (move) => {
    let id = 'sq' + move.from.id;
    let to_id = 'sq' + move.to.id;
    let piece = move.player.substring(0, 1) + move.piece;
    $(`#${id}`).html("<img src='../images/XX.png' width='50'>");
    $(`#${to_id}`).html(`<img src='../images/${piece}.png' width='50'>`);
    move.captured = '';
    if (move.to.value.substring(0, 1) === 'W') {
        move.captured = '->' + move.to.value;
        $(`#wt${move.wt}`).html(`<img src='../images/${move.to.value}.png' width='50'>`);
        move.wt++;
    } else if (move.to.value.substring(0, 1) === 'B') {
        move.captured = '->' + move.to.value;
        $(`#bt${move.bt}`).html(`<img src='../images/${move.to.value}.png' width='50'>`);
        move.bt++;
    };
    buildMap(move);
    let m1 = parseInt(move.to.id.substring(1));
    let m2 = parseInt(move.to.id.substring(0, 1)) + 1;

    updateLog(move);
    showLog(move);
    updateFen(move);

    if (move.player === 'WHITE') {
        move.player = 'BLACK'
    } else {
        move.player = 'WHITE'
    };
    move.phase = 'from';
    $('#to-play').text(move.player + ' to play.');

    checkForCheckmate(move);

    if (move.status.stalemate) {
        $('#to-play').text('STALEMATE');
        $('#overlay-text').text('STALEMATE');
        $('#overlay').show();
    } else if (move.status.bmate){
        $('#to-play').text('CHECK MATE - WHITE WINS');
        $('#overlay-text').text('CHECK MATE - WHITE WINS');
        $('#overlay').show();
    } else if (move.status.wmate){
        $('#to-play').text('CHECK MATE - BLACK WINS');
        $('#overlay-text').text('CHECK MATE - BLACK WINS');
        $('#overlay').show();
    } else if (move.status.wcheck || move.status.bcheck) $('#to-play').text(move.player + ' to play. CHECK!');

    $('#gname').keyup();

    checkForAutoPlay(move);
};
