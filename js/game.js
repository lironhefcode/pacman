'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ''
const SUPERFOOD = '&#9752'
const CHERRY = '&#127826;'
var sound = document.querySelector('audio')


const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gCherryTimer

function init() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    
    gGame.isOn = true
    sound.play()
    gCherryTimer = setInterval(spawnCherry,15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if((i===1&&j===1)||(i===1&&j===8)||(i===8&&j===1)||(i===8&&j===8)){
                board[i][j] = SUPERFOOD
            }
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff

    const elScore= document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    // TODO
    var elBoard = document.querySelector('.board-container')
    var elGameEnd = document.querySelector('.game-over')
    elGameEnd.style.display = 'block'
    elBoard.style.display = 'none'
    gGame.isOn = false
}
function victorious(){
    var elvictorious = document.querySelector('.victorious')
    var elBoard = document.querySelector('.board-container')
    elvictorious.style.display = 'block'
    elBoard.style.display = 'none'
}



function restart(){
    var elvictorious = document.querySelector('.victorious')
    var elBoard = document.querySelector('.board-container')
    var elGameEnd = document.querySelector('.game-over')
    elvictorious.style.display = 'none'
    elGameEnd.style.display = 'none'
    elBoard.style.display = 'block'
    gGame.score =0
    gGhosts = []
    updateScore(0)
    init()
}
function spawnCherry(){
    var emptyCell = findEmpty()
   gBoard[emptyCell.i][emptyCell.j] = CHERRY
    var location = {i:emptyCell.i,j:emptyCell.j}
    renderCell(location,CHERRY)
}

function findEmpty(){
    var cell = FOOD
    while(cell !== EMPTY){
     var i =   getRandomIntInclusive(1,8)
     var j = getRandomIntInclusive(1,8)
     cell = gBoard[i][j]
    }
    return {cell,i,j}


}