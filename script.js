// Data for the Quiz
const quizData = [
    {
        question: "Quale tra questi raggruppamenti è un insieme in senso matematico?",
        options: [
            "Le canzoni più belle dell'estate.",
            "I ragazzi alti della tua scuola.",
            "I numeri dispari minori di 10.",
            "I gatti più simpatici del quartiere."
        ],
        correct: 2,
        explanation: "Solo 'I numeri dispari minori di 10' ha un criterio oggettivo. Tutti sanno esattamente quali numeri ci sono dentro (1, 3, 5, 7, 9). Gli altri sono soggettivi!"
    },
    {
        question: "Quale simbolo si usa per l'insieme vuoto?",
        options: [
            "{0}",
            "∅",
            "∈",
            "V"
        ],
        correct: 1,
        explanation: "Il simbolo ∅ indica l'insieme vuoto, ovvero un insieme che non ha elementi. {0} invece ha un elemento: lo zero!"
    },
    {
        question: "Come si dice che un elemento 'fa parte' di un insieme?",
        options: [
            "L'elemento appartiene all'insieme (simbolo ∈).",
            "L'elemento è uguale all'insieme.",
            "L'elemento concorda con l'insieme.",
            "L'elemento sta sopra l'insieme."
        ],
        correct: 0,
        explanation: "In matematica si dice che un elemento 'appartiene' (∈) a un insieme."
    },
    {
        question: "Se A = { a, b, c }, quale di queste affermazioni è VERA?",
        options: [
            "d ∈ A",
            "a ∈ A",
            "b ∅ A",
            "A = b"
        ],
        correct: 1,
        explanation: "Poiché la lettera 'a' è elencata tra gli elementi di A, è corretto dire che 'a appartiene ad A' (a ∈ A)."
    }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// DOM Elements
const quizContainer = document.getElementById('quiz-container');

// Initialize the quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    if (quizContainer) {
        renderQuestion();
    }
}

function renderQuestion() {
    answered = false;
    const qData = quizData[currentQuestionIndex];

    quizContainer.innerHTML = `
        <div class="question-block" style="animation: fadeIn 0.4s ease;">
            <div class="score-display mb-2" style="margin-bottom: 1rem; color: rgba(255,255,255,0.7);">Domanda ${currentQuestionIndex + 1} di ${quizData.length}</div>
            <div class="question-text">${qData.question}</div>
            
            <div class="options-container" id="options-box">
                ${qData.options.map((option, index) => `
                    <button class="option-btn" onclick="selectOption(${index}, this)">
                        <span style="display:inline-block; width: 24px; height: 24px; background: rgba(255,255,255,0.1); border-radius: 50%; text-align: center; line-height: 24px; margin-right: 12px; font-weight: bold;">${String.fromCharCode(65 + index)}</span>
                        ${option}
                    </button>
                `).join('')}
            </div>

            <div id="feedback-${currentQuestionIndex}" class="feedback-box"></div>

            <div class="quiz-controls">
                <div class="score-display" style="color: white; font-weight: bold;">Punteggio: <span id="current-score">${score}</span></div>
                <button id="next-btn" class="next-btn" onclick="nextQuestion()">Prossima Domanda ➔</button>
            </div>
        </div>
    `;
}

// Ensure globally accessible
window.selectOption = function (selectedIndex, btnElement) {
    if (answered) return; // Prevent multiple answers
    answered = true;

    const qData = quizData[currentQuestionIndex];
    const isCorrect = (selectedIndex === qData.correct);
    const feedbackBox = document.getElementById(`feedback-${currentQuestionIndex}`);
    const nextBtn = document.getElementById('next-btn');
    const optionsBlock = document.getElementById('options-box');
    const allOptions = optionsBlock.querySelectorAll('.option-btn');

    // Highlight correct & incorrect
    allOptions.forEach((btn, index) => {
        if (index === qData.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        } else {
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        }
    });

    if (isCorrect) {
        score++;
        feedbackBox.innerHTML = `<strong>Corretto! 🎉</strong><br/>${qData.explanation}`;
        feedbackBox.classList.add('success', 'show');
    } else {
        feedbackBox.innerHTML = `<strong>Sbagliato! ❌</strong><br/>${qData.explanation}`;
        feedbackBox.classList.add('error', 'show');
    }

    // Update score display immediately
    document.getElementById('current-score').textContent = score;

    // Show next button
    nextBtn.style.display = 'block';
    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = 'Vedi Risultati 🏆';
    }
}

window.nextQuestion = function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    let emoji = '';
    let message = '';

    // Percentage
    const percentage = Math.round((score / quizData.length) * 100);

    if (percentage === 100) {
        emoji = '🌟';
        message = 'Perfetto! Sei un maestro degli insiemi!';
    } else if (percentage >= 75) {
        emoji = '😎';
        message = 'Ottimo lavoro! Hai capito benissimo i concetti base.';
    } else if (percentage >= 50) {
        emoji = '🙂';
        message = 'Buono, ma puoi fare di meglio. Rileggi gli appunti!';
    } else {
        emoji = '📖';
        message = "Forse gli insiemi sono ancora un po' confusi. Prova a rileggere la teoria e riprova!";
    }

    quizContainer.innerHTML = `
        <div class="result-screen">
            <div class="result-emoji">${emoji}</div>
            <div class="result-score">${score} / ${quizData.length}</div>
            <div class="result-message">${message}</div>
            <button class="restart-btn" onclick="initQuiz()">🔄 Riprova il Quiz</button>
        </div>
    `;
}

// Start
document.addEventListener('DOMContentLoaded', initQuiz);
