class Game {
    turn = "x";
    scoreX = 0;
    scoreO = 0;
    draws = 0;
    board = ["", "", "", "", "", "", "", "", ""];
    checkThreeInRow = function (firstPosition, secondPosition, thirdPosition) {
        if (this.board[firstPosition] === this.board[secondPosition] && 
            this.board[secondPosition] === this.board[thirdPosition] &&
            this.board[firstPosition] !== "") {
            return true;
        } else {
            return false;
        }
    };
    checkWinner = function () {
        return (this.checkThreeInRow(0,1,2) || this.checkThreeInRow(3,4,5) || this.checkThreeInRow(6,7,8) ||
        this.checkThreeInRow(0,3,6) || this.checkThreeInRow(1,4,7) || this.checkThreeInRow(2,5,8) ||
        this.checkThreeInRow(0,4,8) || this.checkThreeInRow(2,4,6));
    };
    checkDraw = function () {
        return this.board.find(position => position === "") === undefined ? true : false;
    };
    updateScore = function () {
        if (this.turn === "x") {
            this.scoreX++;
        } else {
            this.scoreO++;
        }
        document.querySelector(".score-x").innerHTML = this.scoreX;
        document.querySelector(".score-o").innerHTML = this.scoreO;
    };
    updateDraw = function () {
        this.draws++;
        document.querySelector(".score-draw").innerHTML = this.draws;
    };
    drawPlayInBoard = function (positionElement) {
        let clonedElement = "";
        if (this.turn === "x") {
            clonedElement = document.querySelector(".icon-prototypes .cross").cloneNode(true);
        } else {
            clonedElement = document.querySelector(".icon-prototypes .circle").cloneNode(true);
        }
        positionElement.appendChild(clonedElement);
    }
    updateBoard = function (position) {
        this.board[position] = this.turn;
    };
    updateTurn = function () {
        const turnElement = document.querySelector(".turn");

        if (this.turn === "x") {
            turnElement.innerHTML = "O turn";
            this.turn = "o";
        } else {
            turnElement.innerHTML = "X turn";
            this.turn = "x";
        }
    };
    resetTurn = function () {
        let turnText = "";
        if (this.turn === "x") {
            turnText = "X starts playing."
            this.turn = "x";
        } else {
            turnText = "O starts playing."
            this.turn = "o";
        }
        document.querySelector(".turn").innerHTML = turnText;
    };
    resetBoard = function () {
        this.board = ["", "", "", "", "", "", "", "", ""];
        Array.from(document.querySelectorAll(".position")).forEach(element => {
            element.innerHTML = "";
        });
    };
    resetGame = function () {
        this.resetTurn();
        this.resetBoard();
    };
}