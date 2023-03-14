document.createSvg = function(tagName) {
    let svgNS = "http://www.w3.org/2000/svg";
    return this.createElementNS(svgNS, tagName);
};

let numberPerSide = 20;
let size = 10;
let pixelsPerSide = 400;



let grid = function(numberPerSide, size, pixelsPerSide, colors) {
    let svg = document.createSvg("svg");
    svg.setAttribute("width", pixelsPerSide);
    svg.setAttribute("height", pixelsPerSide);
    svg.setAttribute("viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));

    for(let i = 0; i < numberPerSide; i++) {
        for(let j = 0; j < numberPerSide; j++) {
            let color1 = colors[(i+j) % colors.length];
            let color2 = colors[(i+j+1) % colors.length];
            let g = document.createSvg("g");
            g.setAttribute("transform", ["translate(", i*size, ",", j*size, ")"].join(""));
            let number = numberPerSide * i + j;
            let box = document.createSvg("rect");
            box.setAttribute("width", size);
            box.setAttribute("height", size);
            box.setAttribute("fill", color1);
            box.setAttribute("id", "b" + number);
            g.appendChild(box);
            svg.appendChild(g);
        }
    }
    svg.addEventListener(
        "click",
        function(e){
            let id = e.target.id ? document.getElementById(e.target.id) : null
            if(id)
                id.setAttribute("fill", "blue");
        },
        false);
    return svg;
};

let container = document.getElementById("container");
container.appendChild(grid(5, 10, 200, ["red", "white"]));



/*

// Créer une carte 2D avec des obstacles


let map = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
// Créer un objet "grid" à partir de la carte
const grid = new PF.Grid(map);

// Trouver le chemin le plus court entre deux points
const finder = new PF.AStarFinder();
const path = finder.findPath(0, 0, 3, 3, grid);

// Afficher le chemin sur un canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cellSize = 900 / map.length;

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        ctx.beginPath();
        ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.fillStyle = map[i][j] === 1 ? 'black' : 'white';
        ctx.fill();
        ctx.strokeStyle = 'gray';
        ctx.stroke();
    }
}

for (let i = 0; i < path.length; i++) {
    const x = path[i][0] * cellSize + cellSize / 2;
    const y = path[i][1] * cellSize + cellSize / 2;

    if (i === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
}
// Ajouter un événement onclick à chaque case
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        createElementOnDom('canvas',`cell-${i}-${j}`);
        const cell = document.getElementById('cell-${i}-${j}');
        console.log(cell);
        if (cell !== null) {
            cell.addEventListener('click', function () {
                // Cette fonction sera appelée lorsque l'utilisateur clique sur la case
                console.log(`Cell clicked: ${i}, ${j}`);
            });
        }
    }
}

ctx.strokeStyle = 'green';
ctx.stroke();


function createElementOnDom (type,id) {
    let element=document.createElement(type);
    element.id=id;
    return element;
}
*/
