// Variables

let board = document.querySelector('#board')
let fireKey = document.querySelector('.firekey')
let score = document.querySelector('.score span')
let reload = document.querySelector('.reload')
let lastRecordedTime = 0
let gameOver = false

// positions and directions
let snakeHeadPosition = [
    {x : 13, 
    y : 15}
]

let snakeDirection = {
    x: 0,
    y: 0
}


let foodPosition = {
    x : 5,
    y : 8
}

// Animation-frame
const gameloop = (currentTime) => {
    requestAnimationFrame(gameloop)
    if((currentTime - lastRecordedTime)/1000 < 1/9 /* this 9 is the speed */){
        return;
    }
    lastRecordedTime = currentTime;
    gamePlay();
}

// Collision conditions
const collision = () => {
    // When the snake hits itself
    for(i = 1; i < snakeHeadPosition.length; i++){
        if(snakeHeadPosition[i].x === snakeHeadPosition[0].x && snakeHeadPosition[i].y === snakeHeadPosition[0].y){
            return gameOver = true;
        }
    }
    // When the snake hits the border
    if(snakeHeadPosition[0].x >= 20 || snakeHeadPosition[0].x <= 0 || snakeHeadPosition[0].y >= 20 || snakeHeadPosition[0].y <= 0){
        return gameOver = true;
    }
}


const gamePlay = () => {
    // After the collision
    if(collision()){
        snakeDirection = {x: 0, y: 0};
        alert("Game is Over");
        snakeHeadPosition = [{x: 13, y:15}]
        score.innerText = 0;
        fireKey.innerText = "Press any arrow key to start"
    }

    // When the snake eats food it's length increments and the position of food changes
    if(snakeHeadPosition[0].y === foodPosition.y && snakeHeadPosition[0].x === foodPosition.x ){
        snakeHeadPosition.unshift({x: snakeHeadPosition[0].x , y: snakeHeadPosition[0].y});
        foodPosition = {x : Math.ceil(Math.random() * 19), y: Math.ceil(Math.random() * 19)}
        score.innerText++
    }

    // Moving the snake automatically
    for (let i = snakeHeadPosition.length - 2; i >= 0 ; i--){
        snakeHeadPosition[i+1] = {...snakeHeadPosition[i]};
    }

    snakeHeadPosition[0].x += snakeDirection.x;
    snakeHeadPosition[0].y += snakeDirection.y;

    // Creating the snake, giving it a position and appending on board
    board.innerHTML = ""
    snakeHeadPosition.forEach((e, index) => {
        snake = document.createElement('div')
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        // the index 0 is for the snake head and rest of the array is for the body
        if (index === 0 ){
            snake.classList.add('snake-head')
        }else {
            snake.classList.add('snake-body')
        }
        board.appendChild(snake)
    })
    // creating food, giving it a position and appending it on board
    food = document.createElement('div')
    food.style.gridRowStart = foodPosition.y;
    food.style.gridColumnStart = foodPosition.x;
    food.classList.add('food')
    board.appendChild(food)

}

reload.addEventListener('click', () =>{
    location.reload();
})


// Setting up my arrow keys to move the snake
window.addEventListener('keydown', event => {
    fireKey.innerText = ""
    switch (event.code) {
        case "ArrowUp":
            snakeDirection.x = 0;
            snakeDirection.y = -1;
            break;
        case "ArrowRight":
            snakeDirection.x = 1;
            snakeDirection.y = 0;
            break;
        case "ArrowDown":
            snakeDirection.x = 0;
            snakeDirection.y = 1;
            break;
        case "ArrowLeft":
            snakeDirection.x = -1;
            snakeDirection.y = 0;
            break;
        default:
            break;
    }
})

requestAnimationFrame(gameloop)