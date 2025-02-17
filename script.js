// Google Sheet Web App URL
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx-kTIErFXAnuHK70NCmm4sXeggZHFkLFZtqYeeimesOzCj7u6Ymi76QafH3ZM7NSIzYw/exec';

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initThemeToggle();
    updateDate();

    // If on the letters page, fetch messages
    if (window.location.pathname.includes('letters.html')) {
        fetchMessages();
        setInterval(fetchMessages, 60000); // Auto-refresh every minute
    }
});

// Initialize floating hearts animation
function initFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 20}s`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        container.appendChild(heart);
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    });
}

// Update date in letter header
function updateDate() {
    const dateElement = document.querySelector('.date');
    if (!dateElement) return;

    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
}

// Send message functionality
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const button = document.querySelector('.send-button');
    
    if (!messageInput || !button) return;

    const message = messageInput.value.trim();
    if (!message) {
        alert('Please write something before sending! ❤️');
        return;
    }

    try {
        button.disabled = true;
        button.style.opacity = '0.7';

        const response = await fetch(SHEET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        if (!response.ok) throw new Error('Failed to send message.');

        showSuccessModal();
        messageInput.value = ''; // Clear input

        setTimeout(() => {
            button.disabled = false;
            button.style.opacity = '1';
        }, 2000);

    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again! 💌');
        button.disabled = false;
        button.style.opacity = '1';
    }
}

// Success animation modal
function showSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (!modal) return;
    
    modal.style.display = 'flex';
    setTimeout(() => { modal.style.display = 'none'; }, 2000);
}

// Fetch and display messages
async function fetchMessages() {
    const lettersFeed = document.getElementById('lettersFeed');
    if (!lettersFeed) return;

    try {
        const response = await fetch(SHEET_URL);
        const messages = await response.json();

        lettersFeed.innerHTML = ''; // Clear previous messages

        messages.reverse().forEach((msg, index) => {
            const letterCard = document.createElement('div');
            letterCard.className = 'letter-card animate__animated animate__fadeInUp';
            letterCard.style.animationDelay = `${index * 0.1}s`;

            const date = new Date(msg.timestamp);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', hour12: true
            });

            letterCard.innerHTML = `
                <div class="letter-content">${msg.message}</div>
                <div class="letter-timestamp">
                    <i class="far fa-clock"></i> ${formattedDate} at ${formattedTime}
                </div>
            `;

            lettersFeed.appendChild(letterCard);
        });

    } catch (error) {
        console.error('Error fetching messages:', error);
        lettersFeed.innerHTML = `<div class="error-message">Failed to load messages. Please refresh! 💌</div>`;
    }
}

// Handle Ctrl+Enter for sending messages
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        const messageInput = document.getElementById('messageInput');
        if (document.activeElement === messageInput) {
            sendMessage();
        }
    }
});
