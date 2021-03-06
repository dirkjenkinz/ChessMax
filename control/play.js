import { move } from '../model/setup.js';

$(
    move.start(),
    $('#btn_restart').on('click', () => {
        window.location.href = '/';
    }),
    $('.black').on('click', e => move.squareClick(e)),
    $('.white').on('click', e => move.squareClick(e)),
    $('#btn_cancel').on('click', () => move.cancelMove()),
    $('#btn_autoplay').on('click', () => move.autoplay(move)),
    $('#btn_moves').on('click', () => {
        if ($('#btn_moves').text().substring(0, 8) === 'Possible') {
            $('#btn_moves').text('Log');
            showMoves(move);
        } else {
            $('#btn_moves').text('Possible Moves');
            showLog(move);
        };
    }),
    $('.promote').on('click', e => {
        move.promotePiece(e.target.id);
    }),
    $('#btn-queen').on('click', e => {
        move.promoting = false;
        checkForAutoPlay(move);
    } ),
    $('#btn-rook').on('click', e => {
        move.promoting = false;
        checkForAutoPlay(move);
    } ),
    $('#btn-bishop').on('click', e => {
        move.promoting = false;
        checkForAutoPlay(move);
    } ),
    $('#btn-knight').on('click', e => {
        move.promoting = false;
        checkForAutoPlay(move);
    } ),
    $('.btn-mode').on('click', e => {
        switch (e.target.id) {
            case 'm-duplex':
               move.mode = 'duplex';
               $('#mode-indicator').text('MODE: DUPLEX');
                break;
            case 'm-white':
                move.mode='white';
                $('#mode-indicator').text('MODE: YOU vs. BLACK');
                break;
            case 'm-black':
                move.mode='black';
                $('#mode-indicator').text('MODE: YOU vs. WHITE');
                break;
        }
    })
);
