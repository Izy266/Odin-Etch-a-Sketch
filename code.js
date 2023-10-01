let boardSize = document.querySelector(".slider");
let colorful = false;
let erase = false;

drawBoard(boardSize.value);
drawSquares();

function drawBoard(size) {
    board = document.createElement("div");
    board.setAttribute("id", "board");
    for (let i = 0; i < size; i++) {
        row = document.createElement("div");
        row.className = "row";
        board.appendChild(row);
        for (let j = 0; j < size; j++) {
            square = document.createElement("div");
            square.className = "square";
            row.appendChild(square);
        }
        document.body.appendChild(board);
    }
}

function clearModes() {
    colorful = false;
    erase = false;
}

function drawSquares() {
    squares = document.querySelectorAll(".square");
    let color = false;

    squares.forEach((square) => {
        document.onmousedown = function () {
            color = true;
        }
        document.onmouseup = function () {
            color = false;
        }

        square.addEventListener("mousemove", () => {
            if (color) {
                if (colorful) {
                    square.style.background = `rgb(
                    ${Math.floor(Math.random() * 255)} 
                    ${Math.floor(Math.random() * 255)} 
                    ${Math.floor(Math.random() * 255)}
                    )`;
                } else if (erase) {
                    square.style.background = board.style.background;
                } else {
                    square.style.background = document.querySelector("#chooseColor").value;
                }
            }

        });
    });
}

function clearBoard() {
    board.remove();
    drawBoard(boardSize.value);
    drawSquares();
}

boardSize.addEventListener("input", () => {
    clearBoard();
});

