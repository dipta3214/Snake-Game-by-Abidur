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



// event handlers