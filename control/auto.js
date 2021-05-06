const checkForAutoPlay = (move) => {
    if (move.mode === 'white' && move.player === 'BLACK') {
        if (!move.promoting) {
            setTimeout(() => { autoplay(move); }, 1000);
        }
    };

    if (move.mode === 'black' && move.player === 'WHITE') {
        if (!move.promoting) {
            setTimeout(() => { autoplay(move); }, 1000);
        }
    };
};


const autoplay = move => {
    makeChart(move);
    let p = move.player.substring(0, 1);
    let c = [];
    for (let i = 0; i < move.chart.length; i++) {
        let item = move.chart[i];
        if (item.length > 1 && item[0][0].substring(0, 1) === p) {
            c.push(move.chart[i]);
        }
    };

    move.chart = c;
    removeInvalidMoves2(move);
    c = move.chart;

    let randomNumber = Math.floor(Math.random() * c.length);
    let square = c[randomNumber];
    let sq = 'sq' + square[0][1] + square[0][2];
    let e = $(`#${sq}`);
    e.click();
    sq = 'sq' + square[1][0] + square[1][1];
    e = $(`#${sq}`);
    e.click();
};
