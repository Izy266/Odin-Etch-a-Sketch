let boardSize = document.querySelector(".slider");
let sliderText = document.querySelector(".sliderContainer text");
sliderText.textContent = boardSize.value;

let colorful = false;
let erase = false;
let shade = false;
let tint = false;

function clearModes() {
    colorful = false;
    erase = false;
    shade = false;
    tint = false;
}

function clearBoard() {
    board.remove();
    drawBoard(boardSize.value);
    drawSquares();
}

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
            square.setAttribute("tintVal", "0");
            square.style.background = "rgb(255, 255, 255)";
            square.className = "square";
            row.appendChild(square);
        }
        document.body.appendChild(board);
    }
}

function drawBehaviour(square) {
    if (colorful) {
        square.style.background = `rgb(
        ${Math.floor(Math.random() * 255)} 
        ${Math.floor(Math.random() * 255)} 
        ${Math.floor(Math.random() * 255)}
        )`;
    } else if (erase) {
        square.style.background = board.style.background;
        square.setAttribute("shadeVal", "0");
        square.setAttribute("tintVal", "0");
    } else if (shade) {
        if (square.getAttribute("tintVal") > 0) {
            square.setAttribute("tintVal", square.getAttribute("tintVal")-1);
        }
        shadeVal = square.getAttribute("shadeVal");
        if (shadeVal < 10) {
            square.setAttribute("shadeVal", ++shadeVal);
            let rgb = square.style.background;
            let rgbList = rgb.substring(4, rgb.length - 1)
                .replace(/ /g, '')
                .split(',');
            for (let i = 0; i < rgbList.length; i++) {
                rgbList[i] = Math.floor(rgbList[i] - rgbList[i] / (11 - shadeVal));
            }
            square.style.background = `rgb(${rgbList[0]}, ${rgbList[1]}, ${rgbList[2]})`;
        }
    } else if (tint) {
        if (square.getAttribute("shadeVal") > 0) {
            square.setAttribute("shadeVal", square.getAttribute("shadeVal")-1);
        }
        tintVal = square.getAttribute("tintVal");
        if (tintVal < 10) {
            square.setAttribute("tintVal", ++tintVal);
            let rgb = square.style.background;
            let rgbList = rgb.substring(4, rgb.length - 1)
                .replace(/ /g, '')
                .split(',');
            for (let i = 0; i < rgbList.length; i++) {
                rgbList[i] = +rgbList[i] + Math.floor((255 - +rgbList[i]) / (11 - tintVal));
            }
            square.style.background = `rgb(${rgbList[0]}, ${rgbList[1]}, ${rgbList[2]})`;
        }
    } else {
        square.setAttribute("shadeVal", "0");
        square.setAttribute("tintVal", "0");
        square.style.background = document.querySelector("#chooseColor").value;
    }
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
            if (color) { drawBehaviour(square); }
        });

        square.addEventListener("mousedown", () => {
            drawBehaviour(square);
        });
    });
}


boardSize.addEventListener("change", () => {
    clearBoard();
});

boardSize.addEventListener("input", () => {
    sliderText.textContent = boardSize.value;
});

drawBoard(boardSize.value);
drawSquares();