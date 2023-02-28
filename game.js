/*window.onload = () => {
    const grid = document.getElementById("grid-container");
    const createGridBtn = document.getElementById("create-grid-btn");
    const findPathBtn = document.getElementById("find-path-btn");
    let gridCells = [];

    function createGrid() {
        const width = 10;
        const height = 10;
        const gridHtml = [];

        for (let i = 0; i < height; i++) {
            const rowHtml = [];
            for (let j = 0; j < width; j++) {
                rowHtml.push(`<div class="cell" data-row="${i}" data-col="${j}"></div>`);
            }
            gridHtml.push(`<div class="row">${rowHtml.join("")}</div>`);
        }

        grid.innerHTML = gridHtml.join("");
        gridCells = document.querySelectorAll(".cell");
    }

    function findPath() {
        // Créer une grille 2D représentant l'état de chaque cellule de la grille
        const matrix = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                if (gridCells[i * 10 + j].classList.contains("obstacle")) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            matrix.push(row);
        }

        // Trouver le chemin le plus court
        const finder = new PF.AStarFinder();
        const start = [0, 0];
        const end = [9, 9];
        const path = finder.findPath(start[0], start[1], end[0], end[1], matrix);

        // Dessiner le chemin sur la grille
        for (const cell of gridCells) {
            const row = parseInt(cell.getAttribute("data-row"));
            const col = parseInt(cell.getAttribute("data-col"));
            cell.classList.remove("path");
            if (path.some((p) => p[0] === row && p[1] === col)) {
                cell.classList.add("path");
            }
        }
    }

    // Ajouter des écouteurs d'événements pour les boutons
    createGridBtn.addEventListener("click", createGrid);
    findPathBtn.addEventListener("click", findPath);

    // Créer la grille initiale
    createGrid();
};

const apiUrl = 'http://localhost:3000';

fetch(apiUrl)
    .then(response => response.text())
    .then(data => {
        document.getElementById('#app').innerHTML = data;
    })
    .catch(error => {
        console.error(error);
    });*/

