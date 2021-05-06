const updateLog = (move) => {
    let piece = move.pieces2[move.pieces1.indexOf(move.piece)];
    move.from.notation = move.alpha[move.from.column] + (move.from.row +1);
    move.to.notation = move.alpha[move.to.column] + (move.to.row +1);
    log.push([[piece], [move.from.notation], [move.to.notation], [move.captured]]);
};

const showLog = (move) =>{
let log_table = '<table class="table table-sm mb-0" id="tab-log">';
log_table += `<thead><tr><th class='black' colspan='2'>MOVE LOG</th></tr>`;
    log_table += `<tr><th class='head-colour'>WHITE</th><th class='head-colour'>BLACK</th></tr></thead>`;
    for (let i = 0; i < log.length; i += 2) {
        let plus1 = log[i + 1] || '';
        log_table += `<tr><td class='white'>${log[i]}</td><td class='black'>${plus1}</td></tr>`
    };
    log_table += `</table>`;
    $('#game-log').html(log_table);
    $("#game-log").animate({ scrollTop: $("#game-log")[0].scrollHeight}, 1000);
};
