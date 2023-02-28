const express = require('express');
const path = require('path');
const PF = require('pathfinding');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {



    let matrix = [
        [0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0],
    ];
    let grid = new PF.Grid(matrix);
    grid.setWalkableAt(0, 1, false);
    let finder = new PF.AStarFinder();

    const result = finder.findPath(1, 2, 4, 2, grid);

    res.send(result);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
