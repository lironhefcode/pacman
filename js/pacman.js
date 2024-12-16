'use strict'

const PACMAN = '😜'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 5, j: 5 },
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    
    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return
    
    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if(gPacman.isSuper){
            
            eatenGhost(nextLocation.i,nextLocation.j)

        }else{
            gameOver()
            return
        }
     
    }
    if(nextCell===SUPERFOOD){
        
       if(!gPacman.isSuper) superOn()
       else return
    }
    
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD)
        {
            updateScore(1)
            if(gGame.score === 56) victorious()
        } 
    if (nextCell === CHERRY){
        
        updateScore(10)
            if(gGame.score === 56) victorious()
    }


    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    
    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)
    
    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    
    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
    
        default:
            return null;
    }
    return nextLocation
}

function superOn(){
    gPacman.isSuper = true
    for(var i=0;i<gGhosts.length;i++){
        var ghost = gGhosts[i]
        ghost.color = 'gold'
  
    }
    console.log('on')
    setTimeout(superOff,5000)

}


function superOff(){
    gPacman.isSuper = false
    console.log('off')
    for(var i=gGhosts.length;i<3;i++ ){
        createGhost(gBoard)
    }
    for(var i=0;i<gGhosts.length;i++){
        var ghost = gGhosts[i]
        ghost.color = '#'+rndColor()
        renderCell(ghost.location, getGhostHTML(ghost,ghost.color))

    }

}


