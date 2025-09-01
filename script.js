// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

// Quiz Functionality
let currentQuestion = 1;
const totalQuestions = 8;
const answers = {};

function openQuiz() {
    document.getElementById('quizModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    resetQuiz();
}

function closeQuiz() {
    document.getElementById('quizModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetQuiz();
}

function resetQuiz() {
    currentQuestion = 1;
    Object.keys(answers).forEach(key => delete answers[key]);
    document.querySelectorAll('.question-container').forEach(container => {
        container.classList.remove('active');
    });
    document.querySelector('[data-question="1"]').classList.add('active');
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').textContent = 'Próxima';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizNav').style.display = 'flex';
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
}

function selectOption(element) {
    const container = element.closest('.question-container');
    container.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
    
    const questionNum = container.getAttribute('data-question');
    answers[questionNum] = element.textContent;
}

function nextQuestion() {
    const currentContainer = document.querySelector(`[data-question="${currentQuestion}"]`);
    const selectedOption = currentContainer.querySelector('.option.selected');
    
    if (!selectedOption) {
        alert('Por favor, selecione uma opção antes de continuar.');
        return;
    }

    if (currentQuestion < totalQuestions) {
        currentContainer.classList.remove('active');
        currentQuestion++;
        document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
        
        updateProgress();
        updateNavigationButtons();
    } else {
        showResult();
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        document.querySelector(`[data-question="${currentQuestion}"]`).classList.remove('active');
        currentQuestion--;
        document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
        
        updateProgress();
        updateNavigationButtons();
    }
}

function updateProgress() {
    const progress = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.style.display = currentQuestion > 1 ? 'block' : 'none';
    nextBtn.textContent = currentQuestion === totalQuestions ? 'Finalizar' : 'Próxima';
}

function showResult() {
    document.querySelector(`[data-question="${currentQuestion}"]`).classList.remove('active');
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizNav').style.display = 'none';
    document.getElementById('progressFill').style.width = '100%';
}

// Close quiz when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('quizModal')) {
        closeQuiz();
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .value-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});