const para = document.createElement("p");
para.textContent = "Hello, world!"
document.querySelector("body").appendChild(para);

function createCell() {
    let value = 0;
    
    const getPlayer = () => value;

    const setPlayer = (player) => {
        value = player.getToken()
    };

    return { getPlayer, setPlayer };
}


function createPlayer(token, name) {
    let userToken;
    const userName = name;

    if (token === "X") {
        userToken = 1;
    } else if (token === "O") {
        userToken = 2
    } else {
        console.log("Please enter a valid token. This would be either X or O.")
        return null;
    }

    const getToken = () => userToken;
    const getName = () => userName;

    return { getToken, getName };
}

function createGameBoard() {
    const gameState = [];

    for(let i = 0; i < 3; i++) {
        gameState[i] = [];
        for(let j = 0; j < 3; j++) {
            gameState[i].push(createCell());
        }
    }

    // const printGameState = () => {
    //     let printString = "";
    //     for(let i = 0; i < 3; i++) {
    //         printString = `${printString} [`
    //         for(let j = 0; j < 3; j++) {
    //             printString = `${printString} ${gameState[i][j].getPlayer()},`;
    //         }
    //         printString = `${printString}] \n`
    //     }
    //     console.log(printString)
    // }

    const makeMove = function (cellX, cellY, player) {
        if ( cellX > 2 || cellY > 2 || gameState[cellX][cellY].getPlayer() !== 0) {
            return -1;
        }
        gameState[cellX][cellY].setPlayer(player);
    }

    // Returns winner if found, -1 if not
    const checkForWinner = function() {
       for(let i = 0; i < 3; i++) {
            if (gameState[i][0].getPlayer() === gameState[i][1].getPlayer() && gameState[i][1].getPlayer() === gameState[i][2].getPlayer() && gameState[i][0] !== 0) {
                return gameState[i][0].getPlayer();
            } 
            if (gameState[0][i].getPlayer() === gameState[1][i].getPlayer() && gameState[1][i].getPlayer() === gameState[2][i].getPlayer() && gameState[0][i] !== 0) {
                return gameState[0][i].getPlayer();
            }
        }
        if (gameState[0][0].getPlayer() === gameState[1][1].getPlayer() && gameState[1][1].getPlayer() === gameState[2][2].getPlayer() && gameState[0][0] !== 0) {
            return gameState[0][0].getPlayer();
        }
        if (gameState[0][2].getPlayer() === gameState[1][1].getPlayer() && gameState[1][1].getPlayer() === gameState[2][0].getPlayer() && gameState[0][0] !== 0) {
            return gameState[0][0].getPlayer();
        }
        return 0;
    }

    const getGameState = () => gameState;
    
    return { makeMove, checkForWinner, getGameState };
}


// Should I use IIFE?
const gameHandler = (function(playerOne = "Player1", playerTwo = "Player2") {
    playerOne = createPlayer("X", playerOne);
    playerTwo = createPlayer("O", playerTwo);
    let activePlayer = playerOne;
    let gameBoard = createGameBoard();

    const resetGame = function() {
        gameBoard = createGameBoard();
        activePlayer = playerOne;
    }

    const playRound = function(x, y) {
        if (gameBoard.makeMove(x, y, activePlayer) !== -1) { 
            console.log(`${activePlayer.getName()} moves to [${x}][${y}].`);
            if (gameBoard.checkForWinner() > 0) {
                console.log(`${activePlayer.getName()} wins the game! Game reset.`)
                resetGame();
            } else {
                activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
                console.log(`${activePlayer.getName()}'s move.`);
            }
        } else {      
            console.log(`Invalid move! Still ${activePlayer.getName()}'s move.`)
        }
    }

    const getActivePlayer = () => activePlayer;

    const getGameState = () => gameBoard.getGameState();

    return { resetGame, playRound, getActivePlayer, getGameState };
})();

// ALSO IIFE?
const screenController = (function() {
    const boardDiv = document.querySelector("#board");

    const updateScreen = function() {
        boardDiv.textContent = "";

        const gameState = gameHandler.getGameState();

        let rowVal = 0, colVal = 0;
        gameState.forEach((row) => {
            row.forEach((cell) => {
                let button = document.createElement("button");
                button.textContent = cell.getPlayer();
                button.dataset.coordinates = `${rowVal},${colVal}`;
                button.classList.add("cell");
                boardDiv.appendChild(button);
                colVal++;
            });
            colVal = 0;
            rowVal++;
        });
    }

    function clickHandler(event) {
        if (event.target.classList.contains("cell")) {
            const coordinates = event.target.dataset.coordinates.split(",");
            const row = coordinates[0];
            const column = coordinates[1];
            gameHandler.playRound(row, column);
            updateScreen();
        }
    }

    boardDiv.addEventListener("click", clickHandler);

    updateScreen();
})();