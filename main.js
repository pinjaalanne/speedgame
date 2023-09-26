const playButton = document.querySelector('#play')
const stopButton = document.querySelector('#stop')
const clowns = document.querySelectorAll('.clowncircle')
const showScore = document.querySelector('.score')

let score = 0;
let timer;
let pace = 1000;
let number = 0;
let rounds = 0;

const getRandomI = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const clickClown = (i) => {
    if(i !== number) {
        return stopGame()
    }
    rounds--
    score += 15
    showScore.textContent = score;
}

clowns.forEach((clowncircle, i) => {
    clowncircle.addEventListener('click', () => clickClown(i))
})

const enableEvents = () => {
    clowns.forEach(clowncircle => {
    clowncircle.style.pointerEvents = "auto"
})
}

const playGame = () => {
if(rounds >= 3) {
    return stopGame()
}

    enableEvents();
    const newClown = newNumber(number)

    clowns[newClown].classList.toggle('number')
    clowns[number].classList.remove('number')

    number = newClown;

    timer = setTimeout(playGame, pace)

    pace -= 10

    rounds++

    function newNumber(number) {
        const newClown = getRandomI(0,3)
    if(newClown !== number) {
        return newClown
    } 
        return newNumber(number)
    }
}

const stopGame = () => {
    clearTimeout(timer)
    resetGame()
}

const resetGame = () => {
    window.location.reload()
}

playButton.addEventListener('click', playGame)
stopButton.addEventListener('click', stopGame)