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


function createPlayer(token, name = "Player") {
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

    // Remove Later
    const getGameState = () => gameState;

    const printGameState = () => {
        let printString = "";
        for(let i = 0; i < 3; i++) {
            printString = `${printString} [`
            for(let j = 0; j < 3; j++) {
                printString = `${printString} ${gameState[i][j].getPlayer()},`;
            }
            printString = `${printString}] \n`
        }
        console.log(printString)
    }
    // Returns winner if found, 0 if not
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
        return -1;
    }
    
    return { getGameState, printGameState ,checkForWinner };
}