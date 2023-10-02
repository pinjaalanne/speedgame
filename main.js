const playButton = document.querySelector('#play')
const stopButton = document.querySelector('#stop')
const closeButton = document.querySelector('#closeButton')
const instButton = document.querySelector('#instButton')
const instrModal = document.querySelector('#instmodal')
const clowns = document.querySelectorAll('.clowncircle')
const showScore = document.querySelector('.score')
const scoreText = document.querySelector('#score')
const modalScore = document.querySelector('.mscore')
const modal = document.querySelector('.modal')
const modalHeader = document.querySelector('#modalheader')
const modalText = document.querySelector('#modaltext')
const closingButton = document.querySelector('#xButton')
const clownAudio = document.querySelector('#clownlaugh')
const whatAudio = document.querySelector('#what')
const backAudio = document.querySelector('#backaudio')
const screamAudio = document.querySelector('#scream')
const gameOverAudio = document.querySelector('#gameover')
const killerAudio = document.querySelector('#thekiller')
const circleContainer = document.querySelector('.clown-container')
const clownImg = document.querySelector('img')

let score = 0;
let timer;
let pace = 1000;
let number = 0;
let rounds = 0;

const getRandomI = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const clickClown = (i) => {
    if (i === number) {
        clowns[number].classList.add('blood');
    } else if(i !== number) {
        return stopGame()
    }
    rounds--
    score += 1
    showScore.textContent = score;
    clownAudio.pause()
    screamAudio.play()
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
    backAudio.play()
    clownAudio.play()
    playButton.classList.add('notvisible')
    stopButton.classList.add('visible')
    instButton.classList.add('notvisible')
    circleContainer.classList.add('visible')
    clownImg.classList.add('visible')
    scoreText.classList.add('visible')

    if(rounds >= 5) {
        return stopGame()
    }
    
    enableEvents();
    const newClown = newNumber(number)
    
    clowns[newClown].classList.toggle('number')
    clowns[number].classList.remove('number')

    number = newClown;
    
    timer = setTimeout(playGame, pace)
    
    pace -= 20
    
    rounds++
    
    function newNumber(number) {
        const newClown = getRandomI(0,3)
        if(newClown !== number) {
            clowns[number].classList.remove('blood')
            return newClown
        }
        return newNumber(number)
    }
}

const modalBox = () => {
    clownAudio.pause()
    backAudio.pause()
    if(score >= 15) {
        modalHeader.textContent = `YOU'RE THE CLOWN KILLER!`
        modalText.textContent = `Good job! You killed ${score} clowns! You're safe for now...`
        modalScore.textContent = score;
        killerAudio.play()
    } else if(score >= 1) {
        modalHeader.textContent = `AREN'T YOU SCARED?`
        modalText.textContent = `You killed only ${score} clowns? You're going to get killed soon if you don't try harder...`
        modalScore.textContent = score;
        whatAudio.play()
    } else {
        modalHeader.textContent = `GAME OVER!`
        modalText.textContent = `What was that? You should watch your back!`
        modalScore.textContent = score;
        gameOverAudio.play()
    }
}

const stopGame = () => {
    modal.classList.toggle('visible')
    modalBox()
    clearTimeout(timer)
}

const resetGame = () => {
    window.location.reload()
}

const instModal = () => {
    instrModal.classList.toggle('visible')
}

playButton.addEventListener('click', playGame)
stopButton.addEventListener('click', stopGame, modalBox)
instButton.addEventListener('click', instModal)
closeButton.addEventListener('click', resetGame)
closingButton.addEventListener('click', resetGame)