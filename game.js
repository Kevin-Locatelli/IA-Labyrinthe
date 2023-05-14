document.createSvg = function(tagName) {
    let svgNS = "http://www.w3.org/2000/svg";
    return this.createElementNS(svgNS, tagName);
};

const numberPerSide = 20;
const size = 9;
const pixelsPerSide = 900;
let tab = new Array(numberPerSide);

let depart = 0;
let departX = 0;
let departY = 0;

let arrive = 0;
let arriveX = 0;
let arriveY = 0;



let grid = function(numberPerSide, size, pixelsPerSide, colors) {
    let svg = document.createSvg("svg");
    svg.setAttribute("width", pixelsPerSide);
    svg.setAttribute("height", pixelsPerSide);
    svg.setAttribute("viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));

    for(let i = 0; i < numberPerSide; i++) {
        tab[i] = new Array(numberPerSide);

        for(let j = 0; j < numberPerSide; j++) {
            tab[i][j] = 0;
            let color1 = colors[(i+j) % colors.length];
            let g = document.createSvg("g");
            g.setAttribute("transform", ["translate(", i*size, ",", j*size, ")"].join(""));
            let numberX = j;
            let numberY = i;
            let box = document.createSvg("rect");
            box.setAttribute("width", size);
            box.setAttribute("height", size);
            box.setAttribute("fill", color1);
            box.setAttribute("id",  (numberY > 9 ? numberY.toString() : numberY + '-') + (numberX > 9 ? numberX.toString() : numberX + '-'));
            g.appendChild(box);
            svg.appendChild(g);
        }

    }

    svg.addEventListener(
        "click",
        function(e){
            let Tcase = e.target.id ? document.getElementById(e.target.id) : null;
            let numberY = Tcase.id.slice(0, 1);
            if(Tcase.id.slice(1, 2) != '-')
                numberY = Tcase.id.slice(0, 2);

            let numberX = Tcase.id.slice(2, 3);
            if (Tcase.id.slice(3, 4) != '-')
                numberX = Tcase.id.slice(2, 4);

            if(depart == 0 && arrive == 0) {
                if (Tcase && Tcase.getAttribute("fill") != "blue") {
                    Tcase.setAttribute("fill", "blue");
                    tab[numberY][numberX] = 1;
                } else {
                    if (Tcase) {
                        Tcase.setAttribute("fill", "white");

                        tab[numberY][numberX] = 0;
                    }
                }
            }
            else if(depart == 1) {
                Tcase.setAttribute("fill", "green");
                console.log(Tcase.id)
                console.log(numberY, numberX);
                tab[numberY][numberX] = 0;
                departX = numberX;
                departY = numberY;

                depart = 0;
            }
            else {
                Tcase.setAttribute("fill", "red");
                tab[numberY][numberX] = 0;
                arriveX = numberX;
                arriveY = numberY;

                arrive = 0;
            }
        },
        false);
    return svg;
};

let container = document.getElementById("container");
container.appendChild(grid(numberPerSide, size, pixelsPerSide, ["white"]));

document.getElementById("depart").addEventListener("click", function() {
    depart = 1;

});

document.getElementById("arriver").addEventListener("click", function() {
    arrive = 1;

});
document.getElementById("start").addEventListener("click", function() {

    const grid = new PF.Grid(tab);
    const finder = new PF.AStarFinder();
    console.log(departY, departX, arriveY, arriveX);
    const path = finder.findPath(departX, departY, arriveX, arriveY, grid);
    console.log(path);
    for(let i = 1; i < path.length-1; i++) {
        let id;
        if(path[i][1] < 10)
            id = path[i][1] + '-';
        else
            id = path[i][1].toString();
        if(path[i][0] < 10)
            id += path[i][0] + '-';
        else
            id += path[i][0].toString();

        document.getElementById(id).setAttribute("fill", "yellow");
    }
});

document.getElementById("reset").addEventListener("click", function() {
    window.location.reload();
});
