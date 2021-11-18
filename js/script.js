// variables

let board = document.querySelector('.board')

let score = document.querySelector('.score span')

let snakeHeadPosition = [
    {
        x : 15,
        y : 18
    }
]

let foodPosition = {
    x : 8,
    y : 6
}



// creating the snake and food
let snake = document.createElement('div')  // We will add two classes for it one for the head and the other for the body


let food = document.createElement('div')
food.setAttribute('class', 'food')

// functions

// game logics
const gamePlay = () => {

    // Displaying the snake and food on board
    snakeHeadPosition.forEach((elements , index) => {
        snake.style.gridRowStart = elements.y
        snake.style.gridColumnStart = elements.x;
        // We need to make the head one color and the body another color
        if(index === 0) {
            snake.classList.add('snake-head');
        }else{
            snake.classList.add('snake-body')
        }
        board.appendChild(snake)
    })

    food.style.gridRowStart = foodPosition.y
    food.style.gridColumnStart = foodPosition.x
    board.appendChild(food)
}

gamePlay()


// event handlers