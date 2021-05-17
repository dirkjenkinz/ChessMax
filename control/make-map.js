
const buildMap = (move) => {
    move.map = [];
    for (let i = 0; i < 8; i++) {
        let line = [];
        for (let j = 0; j < 8; j++) {
           if ($(`#sq${i}${j}`).html().substring(20, 29) == 'undefined'){
            $(`#sq${i}${j}`).html("<img src='../images/XX.png' width='50'>");
           }
            line.push($(`#sq${i}${j}`).html().substring(20, 22));
        }
        move.map.push(line);
    }
}