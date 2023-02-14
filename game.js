// Récupérer les éléments de l'interface utilisateur
const createGridBtn = document.getElementById("createGridBtn");
const findPathBtn = document.getElementById("findPathBtn");
const gridSizeInput = document.getElementById("gridSize");
const startXInput = document.getElementById("startX");
const startYInput = document.getElementById("startY");
const endXInput = document.getElementById("endX");
const endYInput = document.getElementById("endY");
const pathfindingResultsDiv = document.getElementById("pathfindingResults");

let grid = null;

// Fonction pour créer une grille vide
function createEmptyGrid(size) {
    const emptyGrid = [];
    for (let i = 0; i < size; i++) {
        emptyGrid.push([]);
        for (let j = 0; j < size; j++) {
            emptyGrid[i].push(0);
        }
    }
    return emptyGrid;
}

// Fonction pour dessiner la grille sur la page
function drawGrid() {
    let gridHtml = "";
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                gridHtml += `<div class="grid-cell empty"></div>`;
            } else if (grid[i][j] === 1) {
                gridHtml += `<div class="grid-cell obstacle"></div>`;
            } else if (grid[i][j] === 2) {
                gridHtml += `<div class="grid-cell start"></div>`;
            } else if (grid[i][j] === 3) {
                gridHtml += `<div class="grid-cell end"></div>`;
            }
        }
    }
    document.getElementById("grid").innerHTML = gridHtml;
}

// Fonction pour initialiser la grille
function createGrid() {
    const size = parseInt(gridSizeInput.value);
    grid = createEmptyGrid(size);
    grid[parseInt(startXInput.value) - 1][parseInt(startYInput.value) - 1] = 2;
    grid[parseInt(endXInput.value) - 1][parseInt(endYInput.value) - 1] = 3;
    drawGrid();
}

// Fonction pour ajouter ou retirer un obstacle dans la grille
function toggleObstacle(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    if (grid[row][col] === 0) {
        grid[row][col] = 1;
        cell.classList.add("obstacle");
    } else {
        grid[row][col] = 0;
        cell.classList.remove("obstacle");
    }
}

// Fonction pour trouver le chemin le plus court entre le point de départ et le point d'arrivée
function findPath() {
    const finder = new PF.AStarFinder();
    const start = [parseInt(startXInput.value) - 1, parseInt(startYInput.value) - 1];
    const end = [parseInt(endXInput.value) - 1, parseInt(endYInput.value) - 1];
    const path = finder.findPath(start[0], start[1], end[0], end[1], new PF.Grid(grid));
    pathfindingResultsDiv.innerHTML = path.length === 0 ? "No path found" : `Path found with ${path.length} steps`;
// Dessiner le chemin sur la grille
    const gridCells = document.querySelectorAll(".grid-cell");
    for (const cell of gridCells) {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if (path.some(step => step[0] == row && step[1] == col)) {
            cell.classList.add("path");
        } else {
            cell.classList.remove("path");
        }
    }
}

// Ajouter les gestionnaires d'événements pour les boutons
createGridBtn.addEventListener("click", createGrid);
findPathBtn.addEventListener("click", findPath);

// Générer la grille initiale
createGrid();
