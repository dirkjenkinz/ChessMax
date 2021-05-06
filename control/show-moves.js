const mTable = '<table class="table table-sm mb-0 table-bordered" id="tab-move">';
const mHead0 = `<thead><tr><th colspan='3' class='black'>POSSIBLE MOVES</th></tr>`;
const mHead1 = `<tr><th colspan='3' class='white'>`;
const mHead2 = `</th></tr></thead><tbody>`;
const mFrom1 = `<tr><td class='black' width='18%'><button type='button' class='btn btn-danger btn-block btn-log font-weight-bold btn-xs'>`;
const mFrom2 = `</button></td>`;
const mTo1 = `<tr><td width='12%'><button type='button' class='btn btn-info btn-block btn-log btn-xs'>`;
const mTo2 = `</button></td>`;
const mTo3 = `<td width='12%'><button type='button' class='btn btn-info btn-block btn-log btn-xs'>`;

const showMoves = (move) => {
    $('#btn-moves').text('Show log');
    makeChart(move);
    let move_table = mTable;
    move_table += mHead0;
    move_table += `${mHead1}${move.player}${mHead2}`
    for (let i = 0; i < move.chart.length; i++) {
        if (move.chart[i][0][0][0].substring(0, 1) === move.player.substring(0, 1)) {
            if (move.chart[i].length > 1) {
                let data = move.chart[i];
                let index = move.pieces1.indexOf(data[0][0].substring(1, 2));
                let piece = move.pieces2[index];
                let position = move.alpha[data[0][2]] + (data[0][1] + 1);
                move_table += `${mFrom1}${piece} ${position}${mFrom2}`
                for (let j = 1; j < data.length; j++) {
                    let d = data[j];
                    position = move.alpha[d[1]] + (d[0] + 1);
                    piece = '';
                    if (d.length > 1) {
                        if (d[2] !== 'XX') piece = '>' + d[2].substring(1);
                        if (j % 6 === 0) {
                            move_table += `${mTo1}${position} ${piece}${mTo2}`
                        } else {
                            move_table += `${mTo3}${position} ${piece}${mTo2}`
                        };
                        if (j % 6 === 5) {
                            move_table += '</tr>'
                        };
                    }
                }
                move_table += `</tr>`
            };
        };
    };
    move_table += `</tbody></table>`;
    $('#game-log').html(move_table);
};