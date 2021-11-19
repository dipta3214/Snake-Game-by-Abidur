// Variables
let inputDir = {x : 0, y : 0}

let board = document.querySelector('#board')
let fireKey = document.querySelector('.firekey')
let highScore = document.querySelector('.highscore span')
let score = document.querySelector('.score span')
let lastRecordedTime = 0


let snakeHeadPosition = [
    {x : 13, 
    y : 15}
]

let foodPosition = {
    x : 5,
    y : 8
}

const gameloop = (currentTime) => {
    requestAnimationFrame(gameloop)
    if((currentTime - lastRecordedTime)/1000 < 1/9){
        return;
    }
    lastRecordedTime = currentTime;
    gamePlay();
}



const gamePlay = () => {
   

    // Displaying snake
    board.innerHTML = ""
    snakeHeadPosition.forEach((e, index) => {
        snake = document.createElement('div')
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        if (index === 0 ){
            snake.classList.add('snake-head')
        }else {
            snake.classList.add('snake-body')
        }
        board.appendChild(snake)
    })
    // Displaying food
    food = document.createElement('div')
    food.style.gridRowStart = foodPosition.y;
    food.style.gridColumnStart = foodPosition.x;
    food.classList.add('food')
    board.appendChild(food)

}



window.requestAnimationFrame(gameloop)

window.addEventListener('keydown', e => {
    fireKey.innerText = ""
    inputDir = {x: 0, y: 1}
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})