// Variables

let board = document.querySelector('#board')
let fireKey = document.querySelector('.firekey')
let score = document.querySelector('.score span')
let highscore = document.querySelector('.highscore span')
let reload = document.querySelector('.reload')
let lastRecordedTime = 0
let gameOver = false

if(!localStorage.getItem('highscore')){
    localStorage.setItem('highscore', 0)
}else {
    highscore.innerText = localStorage.getItem('highscore')
}



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


// Collision function
const collision = () => {
    // When the snake hits itself
    for(i = 1; i < snakeHeadPosition.length; i++){
        if(snakeHeadPosition[i].x === snakeHeadPosition[0].x && snakeHeadPosition[i].y === snakeHeadPosition[0].y){
            return gameOver = true;
        }
    }
    // When the snake hits the border
    if(snakeHeadPosition[0].x >= 21 || snakeHeadPosition[0].x <= 0 || snakeHeadPosition[0].y >= 21 || snakeHeadPosition[0].y <= 0){
        return gameOver = true;
    }
}


const gamePlay = () => {

    // Creating the snake, giving it a position and appending on board
    board.innerHTML = ""
    snakeHeadPosition.forEach((elements, index) => {
        let snake = document.createElement('div')
        // the index 0 is for the snake head and rest of the array is for the body
        if (index === 0 ){
            snake.classList.add('snake-head')
        }else {
            snake.classList.add('snake-body')
        }
        snake.style.gridRow = elements.y;
        snake.style.gridColumn = elements.x;
        board.appendChild(snake)
    })
    // creating food, giving it a position and appending it on board
    let food = document.createElement('div')
    food.style.backgroundColor = 'orange'
    food.style.gridRow = foodPosition.y;
    food.style.gridColumn = foodPosition.x;
    board.appendChild(food)


    // After the collision
    if(collision()){
        snakeDirection = {x: 0, y: 0};
        localStorage.getItem('highscore')
        if(parseInt(score.innerText) > localStorage.getItem('highscore')){
            parseInt(localStorage.setItem('highscore' , score.innerText.toString()))
            highscore.innerText = parseInt(localStorage.getItem('highscore'))
        }
        alert("Game is Over");
        snakeHeadPosition = [{x: 13, y:15}]
        score.innerText = 0;
        fireKey.innerText = "Press any arrow key to start"
    }

    // When the snake eats food it's length increments and the position of food changes
    if(snakeHeadPosition[0].y === foodPosition.y && snakeHeadPosition[0].x === foodPosition.x ){
        snakeHeadPosition.unshift({x: snakeHeadPosition[0].x , y: snakeHeadPosition[0].y});
        foodPosition = {x : Math.ceil(Math.random() * 18), y: Math.ceil(Math.random() * 18)}
        score.innerText++
    }

    // Moving the snake automatically and giving it directions
    for (let i = snakeHeadPosition.length - 2; i >= 0 ; i--){
        snakeHeadPosition[i+1] = {...snakeHeadPosition[i]};
    }

    snakeHeadPosition[0].x += snakeDirection.x;
    snakeHeadPosition[0].y += snakeDirection.y;


}

// Animation-frame
const gameloop = (currentTime) => {
    requestAnimationFrame(gameloop)
    if((currentTime - lastRecordedTime)/1000 < 1/8 /* this 1/9 is the speed */){
        return;
    }
    lastRecordedTime = currentTime;
    gamePlay();
}

// Reload button event listener
reload.addEventListener('click', () =>{
    location.reload();
})


const arrowKeys = (e) => {
    switch (e) {
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
}

// Setting up my arrow keys to move the snake
window.addEventListener('keydown', (event) => {
    fireKey.innerText = ""
        arrowKeys(event.code)
})

requestAnimationFrame(gameloop)
