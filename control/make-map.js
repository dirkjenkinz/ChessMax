
const buildMap = (move) => {
    move.map = [];
    for (let i = 0; i < 8; i++) {
        let line = [];
        for (let j = 0; j < 8; j++) {
            line.push($(`#sq${i}${j}`).html().substring(20, 22));
        }
        move.map.push(line);
    }
}