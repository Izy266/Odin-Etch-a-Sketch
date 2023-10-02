let boardSize = document.querySelector(".slider");
let colorful = false;
let erase = false;
let shade = false;

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
            square.setAttribute("shadeVal", "0");
            square.style.background = "rgb(255, 255, 255)";
            square.className = "square";
            row.appendChild(square);
        }
        document.body.appendChild(board);
    }
}

function clearModes() {
    colorful = false;
    erase = false;
    shade = false;
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

        square.addEventListener("mouseover", () => {
            if (color) {
                if (colorful) {
                    square.style.background = `rgb(
                    ${Math.floor(Math.random() * 255)} 
                    ${Math.floor(Math.random() * 255)} 
                    ${Math.floor(Math.random() * 255)}
                    )`;
                } else if (erase) {
                    square.style.background = board.style.background;
                } else if (shade) {
                    shadeVal = square.getAttribute("shadeVal");
                    if (shadeVal < 10) {
                        square.setAttribute("shadeVal", ++shadeVal);
                        let rgb = square.style.background;
                        let rgbList = rgb.substring(4, rgb.length - 1)
                            .replace(/ /g, '')
                            .split(',');
                        console.log(rgbList);
                        for (let i = 0; i < rgbList.length; i++) {
                            rgbList[i] = Math.floor(rgbList[i] - rgbList[i]/(11 - shadeVal));
                            
                        }
                        square.style.background = `rgb(${rgbList[0]}, ${rgbList[1]}, ${rgbList[2]})`;
                        console.log(rgbList);
                        console.log(shadeVal); 
                    }
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

