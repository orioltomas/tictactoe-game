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
    const endGameContainerElement = document.querySelector(".end-game-container");
    endGameContainerElement.querySelector('.winner').innerHTML = gameEndText;
    endGameContainerElement.classList.add("show");
    document.querySelector(".reset-btn").classList.add("show");
    document.querySelector(".turn").innerHTML = "END GAME";
}

function handleResetGame() {
    game.resetGame();
    document.querySelector(".end-game-container").classList.remove("show");
    document.querySelector(".reset-btn").classList.remove("show");
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