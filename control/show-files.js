const showFiles = move => {
    let file_table = '<table class="table table-sm mb-0 table-bordered" id="tab-file">';
    file_table += `<thead><tr><th colspan='3' class='black'>SAVED GAMES</th></tr>`;
    file_table += `<tr><th colspan='3' class='white'>`;
    file_table += `</th></tr></thead><tbody>`;

    for (let i = 0; i < move.storage.length; i++) {
        file_table += `<tr>
        <td>${move.storage[i][0]}</td>
        <td>
        <button type='button' class='btn btn-danger btn-block btn-log font-weight-bold btn-xs hit' id='hit${i}'>Load game</button>
        </td>
        <td>
        <button type='button' class='btn btn-danger btn-block btn-log font-weight-bold btn-xs del' id='del${i}'>Delete game</button>
        </td>
        </tr>`
    }

    file_table += `</tbody></table>`;
    $('#game-log').html(file_table);

    $(document).on('click', '.hit', e => {
        const num = e.target.id.substring(3);
        $('#gname').val(move.storage[num][0])
        move.fen = move.storage[num][1];
        $('#piece-placement').text(move.fen.piecePlacement);
        $('#active-colour').text(move.fen.activeColour);
        $('#en-passant').text(move.fen.enPassantTargetSquare);
        $('#castling-ability').text(move.fen.castlingAbility);
        buildBoardFromFen(move);
        if (move.fen.activeColour === 'w'){
            move.player = 'WHITE';
            $('#to-play').text('WHITE to play.');
        } else {
            move.player = 'BLACK'
            $('#to-play').text('BLACK to play.');
        };
        buildMap(move);
        let m1 = parseInt(move.to.id.substring(1));
        let m2 = parseInt(move.to.id.substring(0, 1)) + 1;
        move.notation_to = move.alpha[m1] + m2;
        move.log = [];
        showLog(move);
        $('#btn_moves').text('Possible Moves');
        $('#btn_save').attr("disabled", false);
    });

    $(document).on('click', '.del', e => {
        e.stopImmediatePropagation();
        e.preventDefault();
        let num = e.target.id.substring(3);
        window.localStorage.removeItem('_c_'+move.storage[num][0]);
        move.storage.splice(num, 1);
        showFiles(move);
    });
};
