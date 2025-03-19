const para = document.createElement("p");
para.textContent = "Hello, world!"
document.querySelector("body").appendChild(para);

function cell() {
    let value = 0;
    
    const getValue = () => value;

    const setPlayer = (player) => {
        value = player.getToken()
    };

    return { getValue, setPlayer };
}


function player(token, name = "Player") {
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