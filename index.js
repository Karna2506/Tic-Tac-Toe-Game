let cells = document.querySelectorAll(".cell");
let turnIndicator = document.querySelector(".container .turn_indicator");
let preContainer = document.querySelector(".container .pre-container");
let resultBox = document.querySelector(".container .result_box");
let winnerMsg = document.querySelector(".container .result_box .winner_msg");

let changeturn = false;
let xCount = 0;
let oCount = 0;
let gameState = {
    isMoving: false,
    selectedCell: null,
    xPieces: 0,
    oPieces: 0
};

function resetGame() {
    // Reset all game variables
    changeturn = false;
    xCount = 0;
    oCount = 0;
    gameState = {
        isMoving: false,
        selectedCell: null,
        xPieces: 0,
        oPieces: 0
    };
    
    // Reset the board
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.id = "";
        cell.style.backgroundColor = "";
        cell.style.pointerEvents = "auto";
    });
    
    // Reset turn indicator
    turnIndicator.style.marginLeft = "0px";
    
    // Reset display
    preContainer.style.display = "flex";
    resultBox.style.display = "none";
}

cells.forEach((cell) => {
    cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
    if (gameState.isMoving && gameState.selectedCell) {
        if (cell.id === "") {
            cell.innerHTML = gameState.selectedCell.innerHTML;
            cell.id = gameState.selectedCell.id;
            gameState.selectedCell.innerHTML = "";
            gameState.selectedCell.id = "";
            gameState.selectedCell.style.backgroundColor = "";
            
            gameState.isMoving = false;
            gameState.selectedCell = null;
            
            changeturn = !changeturn;
            turnIndicator.style.marginLeft = changeturn ? "150px" : "0px";
            
            winning();
            Draw();
        }
    } else {
        if (cell.id === "") {
            if ((!changeturn && xCount < 3) || (changeturn && oCount < 3)) {
                if (!changeturn) {
                    cell.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
                    cell.id = "X";
                    xCount++;
                } else {
                    cell.innerHTML = `<i class="fa-solid fa-o"></i>`;
                    cell.id = "O";
                    oCount++;
                }
                
                changeturn = !changeturn;
                turnIndicator.style.marginLeft = changeturn ? "150px" : "0px";
                
                winning();
                Draw();
            }
        } else if ((cell.id === "X" && !changeturn) || (cell.id === "O" && changeturn)) {
            if (gameState.selectedCell) {
                gameState.selectedCell.style.backgroundColor = "";
            }
            
            if (xCount >= 3 && oCount >= 3) {
                gameState.isMoving = true;
                gameState.selectedCell = cell;
                cell.style.backgroundColor = "#e0e0e0";
            }
        }
    }
}

let wincombo = [
    [0, 3, 6],
    [6, 7, 8],
    [3, 4, 5],
    [0, 1, 2],
    [2, 5, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 4, 8]
];

let winning = () => {
    for (let a = 0; a <= 7; a++) {
        let b = wincombo[a];
        if (cells[b[0]].id == "" || cells[b[1]].id == "" || cells[b[2]].id == "") {
            continue;
        } else if (cells[b[0]].id == "X" && cells[b[1]].id == "X" && cells[b[2]].id == "X") {
            resultBox.style.display = "block";
            preContainer.style.display = "none";
            winnerMsg.innerHTML = "Player X Won The Game!..";
        } else if (cells[b[0]].id == "O" && cells[b[1]].id == "O" && cells[b[2]].id == "O") {
            resultBox.style.display = "block";
            preContainer.style.display = "none";
            winnerMsg.innerHTML = "Player O Won The Game!..";
        }
    }
};

let Draw = () => {
    if (xCount >= 3 && oCount >= 3) {
        let canMove = false;
        cells.forEach(cell => {
            if (cell.id === "") {
                canMove = true;
            }
        });
        
        if (!canMove) {
            resultBox.style.display = "block";
            preContainer.style.display = "none";
            winnerMsg.innerHTML = "Match Draw!..";
        }
    }
    
};
 
// Helper function to check if two cells are adjacent
function isAdjacentCell(cell1, cell2) {
    // Get indices of both cells in the grid
    let index1 = Array.from(cells).indexOf(cell1);
    let index2 = Array.from(cells).indexOf(cell2);
    
    // Convert to row and column coordinates
    let row1 = Math.floor(index1 / 3);
    let col1 = index1 % 3;
    let row2 = Math.floor(index2 / 3);
    let col2 = index2 % 3;
    
    // Check if cells are adjacent horizontally, vertically, or diagonally
    let rowDiff = Math.abs(row1 - row2);
    let colDiff = Math.abs(col1 - col2);
    
    // Return true if cells are adjacent (including diagonally)
    return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
}

function handleCellClick(cell) {
    if (gameState.isMoving && gameState.selectedCell) {
        // Check if the target cell is adjacent (one row or column only)
        if (cell.id === "" && isAdjacentCell(gameState.selectedCell, cell)) {
            cell.innerHTML = gameState.selectedCell.innerHTML;
            cell.id = gameState.selectedCell.id;
            gameState.selectedCell.innerHTML = "";
            gameState.selectedCell.id = "";
            gameState.selectedCell.style.backgroundColor = "";
            
            gameState.isMoving = false;
            gameState.selectedCell = null;
            
            changeturn = !changeturn;
            turnIndicator.style.marginLeft = changeturn ? "150px" : "0px";
            
            winning();
            Draw();
        }
    } else {
        if (cell.id === "") {
            if ((!changeturn && xCount < 3) || (changeturn && oCount < 3)) {
                if (!changeturn) {
                    cell.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
                    cell.id = "X";
                    xCount++;
                } else {
                    cell.innerHTML = `<i class="fa-solid fa-o"></i>`;
                    cell.id = "O";
                    oCount++;
                }
                
                changeturn = !changeturn;
                turnIndicator.style.marginLeft = changeturn ? "150px" : "0px";
                
                winning();
                Draw();
            }
        } else if ((cell.id === "X" && !changeturn) || (cell.id === "O" && changeturn)) {
            if (gameState.selectedCell) {
                gameState.selectedCell.style.backgroundColor = "";
            }
            
            if (xCount >= 3 && oCount >= 3) {
                gameState.isMoving = true;
                gameState.selectedCell = cell;
                cell.style.backgroundColor = "#e0e0e0";
            }
        }
    }
}

// Helper function to check if cells are adjacent in a single row or column
function isAdjacentCell(cell1, cell2) {
    // Get indices of both cells in the grid
    let index1 = Array.from(cells).indexOf(cell1);
    let index2 = Array.from(cells).indexOf(cell2);
    
    // Convert to row and column coordinates
    let row1 = Math.floor(index1 / 3);
    let col1 = index1 % 3;
    let row2 = Math.floor(index2 / 3);
    let col2 = index2 % 3;
    
    // Check if cells are adjacent in a single row or column (no diagonal)
    // Either same row and adjacent column, or same column and adjacent row
    return (
        (row1 === row2 && Math.abs(col1 - col2) === 1) || // Same row, adjacent column
        (col1 === col2 && Math.abs(row1 - row2) === 1)    // Same column, adjacent row
    );
}
  