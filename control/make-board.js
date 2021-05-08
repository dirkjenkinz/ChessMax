const a = ['r','n','b','q','k','p','R','N','B','Q','K','P','1','2','3','4','5','6','7','8'];
const b = ['BR','BN', 'BB', 'BQ', 'BK', 'BP', 'WR', 'WN', 'WB', 'WQ', 'WK', 'WP', 1,2,3,4,5,6,7,8];

const board1 = `<table class='table table-bordered'>
<thead>
    <tr>
        <th>+</th>
        <th>a</th>
        <th>b</th>
        <th>c</th>
        <th>d</th>
        <th>e</th>
        <th>f</th>
        <th>g</th>
        <th>h</th>
    </tr>
</thead>
<tbody>`

const buildBoard = (map) => {
    let board = `${board1}`;
    let cl = 'white';
    for (let row = 7; row > -1; row--) {
        board += `<tr><th>${row + 1}</th>`
        for (let column = 0; column < 8; column++) {
            board += `<td id='sq${row}${column}' class='${cl}'><img src='../images/${map[row][column]}.png' width='50'></td>`;
            if (cl === 'black') {
                cl = 'white'
            } else {
                cl = 'black';
            }
        }
        if (cl === 'black') {
            cl = 'white'
        } else {
            cl = 'black';
        }
        board += `<tr>`
    }
    board += `</tbody></table>`;
    $('#board').html(board);
}

const buildBoardFromFen = move => {
    let rows = move.fen.piecePlacement.split('/');
    let board = [];

    for (let i = 7; i > -1; i--){
        let line = [];
        for (j = 0; j < rows[i].length; j++){
            let c = rows[i][j];
            let pointer = a.indexOf(c);
            if (b[pointer] > 0 && b[pointer] < 9){
                for (let k = 0; k < b[pointer]; k++){
                    line.push('XX');
                }
            } else {
            line.push(b[pointer]);
            }
        };
        board.push(line);
    };
    buildBoard(board);
};