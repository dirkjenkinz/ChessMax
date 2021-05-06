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