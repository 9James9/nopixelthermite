const winMenu = document.querySelector('[data-win-menu]')
const endMenu = document.querySelector('[data-end-menu]')
const log = console.log
const startBtn = document.querySelector('[data-start-button]')
const gridContainer = document.querySelector('[data-grid-container]')
const decreaseGridSizeButton = document.querySelector('[data-decrease-grid-size]')
const decreaseDifficultyButton = document.querySelector('[data-decrease-grid-difficulty]')
const increaseDifficultyButton = document.querySelector('[data-increase-grid-difficulty]')
const increaseGridSizeButton = document.querySelector('[data-increase-grid-size]')
const difficultyDisplay = document.querySelector('[data-difficulty]')
const updateTimeBtn = document.querySelector('[data-update-time]')
const timeDisplay = document.querySelector('[data-time]')
const howToPlay = document.querySelector('[data-how-to-play]')
const instructions = document.querySelector('.how_to_play')
howToPlay.addEventListener('click', () => {
    if (instructions.style.display === 'none' || instructions.style.display == "") {
        instructions.style.display = 'block'
        howToPlay.textContent = "Hide instructions"
    } else {
        instructions.style.display = 'none'
        howToPlay.textContent = "How to play"
    }  
})
document.querySelector('[data-end-play-again]').addEventListener('click', () => {
    endMenu.style.display = 'none'

})
document.querySelector('[data-win-play-again]').addEventListener('click', () => {
    winMenu.style.display = 'none'

})
increaseGridSizeButton.addEventListener('click', () => {
    changeGridSize(50)
    gridContainer.textContent = ""
    makeBlocks(6)
})
decreaseGridSizeButton.addEventListener('click', () => {
    changeGridSize(-50)
    gridContainer.textContent = ""
    makeBlocks(6)
})
decreaseDifficultyButton.addEventListener('click', () => {
    changeDifficulty(-1)
    displayDifficulty()
})
increaseDifficultyButton.addEventListener('click', () => {
    changeDifficulty(1)
    displayDifficulty()
})
startBtn.addEventListener('click', playRound)
endMenu.style.display = 'none'
updateTimeBtn.addEventListener('click', e => {
    e.preventDefault()
    changeTime()
    displayTime()
    document.querySelector('[data-time-input]').value = ""
})
let gridSize = 6
let maxWidth = 300
let allBoxes = []
let unchangedAllBoxes = []
let selectedBoxes = []
let difficulty = 5
let time = 1000
function displayTime(){
    timeDisplay.textContent = `Time: ${time}ms`
}
function changeTime() {
    return time = document.querySelector('[data-time-input]').value
}
function displayDifficulty(){
    return difficultyDisplay.textContent = `Difficulty: ${difficulty}`
}
function changeGridSize(increment) {
    return maxWidth += increment
}
function changeDifficulty(increment) {
    return difficulty += increment
}
function playRound() {
    unchangedAllBoxes = []
    selectedBoxes = []
    gridContainer.textContent = ""
    makeBlocks(gridSize)
    selectBoxes(difficulty,time)
    classes()
    displayTime()
}

function makeBlocks(size) {
    displayDifficulty()
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.className = "row";

        for (let j = 0; j < size; j++) {
            let box = document.createElement('div');
            box.className = `box-${i}${j}`
            box.classList.add('box')
            allBoxes.push(`box-${i}${j}`)
            unchangedAllBoxes.push(`box-${i}${j}`)
            row.appendChild(box);
        }
        document.getElementById('grid-container').appendChild(row);

        var boxes = document.getElementsByClassName("box");
        for (let k = 0; k < boxes.length; k++) {
            boxes[k].style.width = maxWidth / size + "px";
            boxes[k].style.height = maxWidth / size + "px";
        }
    }
    return allBoxes
}

function random(num) {
    return Math.floor(Math.random() * num)
}

function selectBoxes(difficulty,time) {

    for (let i = 0; i < difficulty; i++) {
        selectedBoxes.push(allBoxes[random(allBoxes.length)])
        document.querySelector(`.${selectedBoxes[i]}`).classList.add('red')
        sleep(time).then(() => {
            document.querySelector(`.${selectedBoxes[i]}`).classList.remove('red')
            document.querySelector(`.${selectedBoxes[i]}`).classList.add('selected')
            allBoxes.splice(i, 1)
        })


    }
    return selectedBoxes
}

//remove duplicates in selectedBoxes
// uniqueArray = [...new Set(selectedBoxes)]

function classes() {
    let score = 3
    log(unchangedAllBoxes)
    for (let i = 0; i < unchangedAllBoxes.length; i++) {
        let thebox = document.querySelector(`.${unchangedAllBoxes[i]}`)
        document.querySelector(`.${unchangedAllBoxes[i]}`).addEventListener('click', () => {
            if (thebox.classList.contains('selected')) {
                choose(thebox)
                check()
            } else if (thebox.classList.contains('selected1')) {
                //if it was already selected
            } else {
                score -= 1
                wrongChoice(thebox)
                if (score <= 0) {
                    sleep(500).then(() => {
                        endMenu.style.display = 'flex'
                        //shows the boxes you missed after you lose
                        for (let i = 0; i < unchangedAllBoxes.length; i++) {
                            if (document.querySelector(`.${unchangedAllBoxes[i]}`).classList.contains('selected')) {
                                document.querySelector(`.${unchangedAllBoxes[i]}`).classList.add('red')
                            }
                        }
                    })
                    //make start screen show up here
                }
            }
        })
    }
}

function choose(el) {
    el.classList.add("selected1");
    el.classList.remove('selected')
}

function wrongChoice(el) {
    el.classList.add('wrongchoice')
}

function check() {
    //checks the classes on all boxes, returns if one still has the selected class. and announces winner if it can finish the loop
    for (let i = 0; i < unchangedAllBoxes.length; i++) {
        if (document.querySelector(`.${unchangedAllBoxes[i]}`).classList.contains('selected')) {
            return false
        }
    }
    winMenu.style.display = "flex"
    //localstorage to keep track of completions?
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

makeBlocks(6)
displayTime()