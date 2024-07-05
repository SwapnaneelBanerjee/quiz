const startButton = document.getElementById("start")
const nextButton = document.getElementById("next")
const questionContainerElement = document.getElementById('question-block')
const questionElement = document.getElementById('question')
const answerbuttons = document.getElementById('options')
const scoreElement = document.getElementById('score')
let shuffled, current, score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    current++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add("hide")
    shuffled = questions.sort(() => Math.random() - 0.5)
    current = 0
    score = 0
    scoreElement.innerText = score
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetblock()
    showQuestion(shuffled[current])
}

function resetblock() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerbuttons.firstChild) {
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerbuttons.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct === 'true'
    setStatusClass(document.body, correct)
    Array.from(answerbuttons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true')
    })
    if (correct) {
        score++
        scoreElement.innerText = score
    }
    if (shuffled.length > current + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
        nextButton.classList.add('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Which city-state is considered as the epicenter of "Renaissance" ?',
        answers: [
            { text: 'Milan', correct: false },
            { text: 'Rome', correct: false },
            { text: 'Florence', correct: true },
            { text: 'Naples', correct: false }
        ]
    },
    {
        question: 'Which invention by Johannes Gutenberg is credited with starting the spread of Renaissance ideas?',
        answers: [
            { text: 'Telescope', correct: false },
            { text: 'Printing Press', correct: true },
            { text: 'Microscope', correct: false },
            { text: 'Aqueduct', correct: false }
        ]
    },
    {
        question: 'Who wrote "The Prince," a political treatise of the Renaissance?',
        answers: [
            { text: 'Niccolò Machiavelli', correct: true },
            { text: 'Erasmus', correct: false },
            { text: 'Thomas More', correct: false },
            { text: 'Dante Alighieri', correct: false }
        ]
    },
    {
        question: 'Who Painted "The Last Supper"?',
        answers: [
            { text: 'Raphael', correct: false },
            { text: 'Donatello', correct: false },
            { text: 'Michelangelo', correct: false },
            { text: 'Leonardo da Vinci', correct: true }
        ]
    },
    {
        question: 'Which Renaissance figure is known for his notebooks filled with sketches, inventions, and scientific observations?',
        answers: [
            { text: 'Galileo Galilei', correct: false },
            { text: 'Johannes Kepler', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Nicolaus Copernicus', correct: false }
        ]
    }
]
