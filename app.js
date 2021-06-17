const game = new Game();

function checkEmtpyPositionInGameBoard (position) {
    if (game.board[position] === "") {
        return true;
    }
    return false;
}

function handleGameEnd(type) {
    let gameEndText = "";
    if (type === "winner") {
        gameEndText = 'Winner: ' + game.turn;
        game.updateScore();
    } else {
        gameEndText = "It's a draw";
        game.updateDraw();
    }
    const winnerElement = document.querySelector(".winner");
    winnerElement.innerHTML = gameEndText;
    winnerElement.classList.add("show");
    document.querySelector(".reset-btn").classList.add("show");
    document.querySelector(".turn").classList.add("hide");
}

function handleResetGame() {
    game.resetGame();
    document.querySelector(".winner").classList.remove("show");
    document.querySelector(".reset-btn").classList.remove("show");
    document.querySelector(".turn").classList.remove("hide");
}

function handlePositionClicked (event) {
    const clickedPositionElement = event.currentTarget;
    const position = clickedPositionElement.getAttribute('data-position');

    if (document.querySelector(".winner").classList.contains("show")) {
        return;
    }
    if (checkEmtpyPositionInGameBoard(position)) {
        game.updateBoard(position);
        game.drawPlayInBoard(clickedPositionElement);
        if (game.checkWinner()) {
            handleGameEnd('winner');
        } else if (game.checkDraw()) {
            handleGameEnd('draw');
        } else {
            game.updateTurn();
        }
    }
}

Array.from(document.querySelectorAll(".position")).forEach(element => {
    element.addEventListener('click', (event) => handlePositionClicked(event));
})

document.querySelector(".reset-btn").addEventListener('click', () => handleResetGame());