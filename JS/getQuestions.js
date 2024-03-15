import { getRanking, ranking } from "./utils.js";

let correctAnswersCount = 0;
let currentQuestionIndex = 0;
let questions = [];
let questionHistory = []; // Historial de preguntas y respuestas

async function getQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    return data.results.map(question => ({ ...question, answered: false }));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sendInfo() {
    console.log("¡La función sendInfo() se ha llamado!");
    const tierlist = getRanking();
    const localId = localStorage.userId;
    const id =`/Users/${localId}`;
    for (var i=0; i<tierlist.length;i++){
        if (tierlist[i][2]== id){
            var points = correctAnswersCount+tierlist[i][1];
            ranking(localId ,tierlist[i][0], points);
        }
    }
    correctAnswersCount = 0;
}

function displayQuestion(question) {
    // Restaurar el estado de la pregunta desde el historial si está disponible
    if (questionHistory[currentQuestionIndex]) {
        question = questionHistory[currentQuestionIndex].question;
    } else {
        // Guardar la pregunta actual en el historial
        questionHistory[currentQuestionIndex] = { question: question };
    }

    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';

    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<p>${currentQuestionIndex + 1}. ${question[4] || question.question}</p>`;

    const options = question[3] ? question[3] : [...question.incorrect_answers, question.correct_answer];
    const correctAnswer = question[1] ? question[1] : question.correct_answer;

    const shuffledOptions = shuffleArray(options);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            if (!question.answered) {
                if (option === correctAnswer) {
                    button.style.backgroundColor = "green";
                    correctAnswersCount++;
                    document.getElementById('correct-count').textContent = correctAnswersCount;
                } else {
                    button.style.backgroundColor = "red";
                }
                question.answered = true; // Marcar la pregunta como respondida
                
                // Bloquear los botones después de responder
                const buttons = questionElement.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.disabled = true;
                    if (btn.textContent !== option) {
                        btn.style.backgroundColor = "black";
                        btn.style.color = "white";
                    }
                });
            }
        });
        questionElement.appendChild(button);
    });

    questionsContainer.appendChild(questionElement);
}

async function loadQuestions() {
    const externalQuestions = await getQuestions();
    questions = shuffleArray(externalQuestions);
    displayQuestion(questions[currentQuestionIndex]);
}

function restartGame() {
    sendInfo();
    document.getElementById('questions').innerHTML = ''; 
    document.getElementById('correct-count').textContent = '0'; 
    correctAnswersCount = 0;
    currentQuestionIndex = 0;
    questionHistory = []; // Limpiar el historial al reiniciar el juego
    loadQuestions();
}

function checkSession() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
        window.location.href = "Login.html";
    } else {
        loadQuestions();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(questions[currentQuestionIndex]);
    }
}

checkSession();
document.getElementById("restart-btn").addEventListener("click", restartGame);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("prev-btn").addEventListener("click", prevQuestion);