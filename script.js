// Google Sheet URL
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx-kTIErFXAnuHK70NCmm4sXeggZHFkLFZtqYeeimesOzCj7u6Ymi76QafH3ZM7NSIzYw/exec';

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initThemeToggle();/* Base Styles */
:root {
    --primary-color: #4a6fa5;
    --primary-light: #6789bd;
    --primary-dark: #345282;
    --secondary-color: #f8f9fa;
    --text-color: #333;
    --text-light: #666;
    --background-color: #fff;
    --border-color: #e9ecef;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
    
    /* Dark Theme Variables */
    --dark-background: #1f2937;
    --dark-card-background: #374151;
    --dark-text: #f3f4f6;
    --dark-text-light: #d1d5db;
    --dark-border: #4b5563;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    transition: var(--transition);
}

.dark-mode {
    --text-color: var(--dark-text);
    --text-light: var(--dark-text-light);
    --background-color: var(--dark-background);
    --border-color: var(--dark-border);
    --secondary-color: var(--dark-card-background);
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5em;
}

a {
    text-decoration: none;
    color: var(--primary-color);
    transition: var(--transition);
}

a:hover {
    color: var(--primary-dark);
}

img {
    max-width: 100%;
    height: auto;
}

/* Button Styles */
.btn-primary {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    border: none;
}

.btn-primary:hover {
    background-color: var(--primary-dark);
    color: white;
}

.btn-secondary {
    display: inline-block;
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    background-color: var(--border-color);
}

/* Header Styles */
header {
    background-color: var(--background-color);
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 100;
}

header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
}

.logo h1 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin: 0;
}

nav ul {
    display: flex;
    list-style: none;
}

nav li {
    margin-left: 20px;
}

nav a {
    color: var(--text-color);
    font-weight: 500;
    padding: 5px 0;
    position: relative;
}

nav a.active, nav a:hover {
    color: var(--primary-color);
}

nav a.active::after, nav a:hover::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    left: 0;
    bottom: 0;
}

.theme-toggle {
    cursor: pointer;
    padding: 5px;
    font-size: 1.2rem;
}

/* Hero Styles */
.hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://source.unsplash.com/random/1600x900/?office,documents');
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 100px 0;
}

.hero-content {
    max-width: 600px;
    margin: 0 auto;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Features Styles */
.features {
    padding: 80px 0;
    background-color: var(--secondary-color);
    text-align: center;
}

.features h2 {
    margin-bottom: 50px;
    font-size: 2rem;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.feature-card {
    background-color: var(--background-color);
    border-radius: 8px;
    padding: 30px;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.feature-card h3 {
    margin-bottom: 15px;
}

/* Letters Page Styles */
.letters-hero {
    background-color: var(--primary-color);
    color: white;
    padding: 50px 0;
    text-align: center;
}

.letters-hero h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.letters-main {
    padding: 50px 0;
}

.letters-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.search-box {
    position: relative;
    width: 60%;
}

.search-box input {
    width: 100%;
    padding: 12px 40px 12px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    background-color: var(--background-color);
    color: var(--text-color);
}

.search-box i {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
}

.letters-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.letter-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: var(--transition);
}

.letter-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.letter-subject {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--primary-color);
}

.letter-details {
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 15px;
}

.letter-details span {
    margin-right: 15px;
}

.letter-content {
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.loading {
    text-align: center;
    padding: 30px;
    font-size: 1.2rem;
    color: var(--text-light);
}

.loading i {
    font-size: 2rem;
    margin-bottom: 10px;
    color: var(--primary-color);
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: var(--background-color);
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 15px;
    margin-bottom: 20px;
}

.close-modal {
    color: var(--text-light);
    font-size: 1.8rem;
    cursor: pointer;
}

.close-modal:hover {
    color: var(--danger-color);
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    background-color: var(--background-color);
    color: var(--text-color);
}

textarea {
    resize: vertical;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 30px;
}

.letter-content-container {
    margin-top: 20px;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    background-color: var(--secondary-color);
    border-radius: 4px;
}

/* Footer Styles */
footer {
    background-color: var(--primary-dark);
    color: white;
    padding: 50px 0 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
}

.footer-section h3 {
    margin-bottom: 20px;
    font-size: 1.2rem;
    position: relative;
}

.footer-section h3::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 2px;
    background-color: var(--primary-light);
    left: 0;
    bottom: -8px;
}

.footer-section p {
    margin-bottom: 10px;
}

.footer-section i {
    margin-right: 10px;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-links a {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.social-links a:hover {
    background-color: var(--primary-light);
    transform: translateY(-3px);
}

.google-map {
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
}

.google-map iframe {
    width: 100%;
    height: 100%;
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive Styles */
@media (max-width: 768px) {
    .hero {
        padding: 80px 0;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
    
    .letters-controls {
        flex-direction: column;
        gap: 15px;
    }
    
    .search-box {
        width: 100%;
    }
    
    .letters-container {
        grid-template-columns: 1fr;
    }
    
    .modal-content {
        width: 95%;
    }
}

@media (max-width: 576px) {
    header .container {
        flex-direction: column;
        gap: 15px;
    }
    
    nav ul {
        justify-content: center;
    }
    
    .theme-toggle {
        position: absolute;
        top: 20px;
        right: 20px;
    }
    
    .hero {
        padding: 60px 0;
    }
    
    .hero h1 {
        font-size: 1.8rem;
    }
    
    .features {
        padding: 60px 0;
    }
}
    updateDate();
    
    // If we're on the letters page, fetch messages
    if (window.location.pathname.includes('letters.html')) {
        fetchMessages();
        // Refresh messages every minute
        setInterval(fetchMessages, 60000);
    }
});

// Initialize floating hearts background
function initFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const numberOfHearts = 20;

    for (let i = 0; i < numberOfHearts; i++) {
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
    const icon = themeToggle.querySelector('i');
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Toggle icon
        if (icon.classList.contains('fa-moon')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Update date in letter header
function updateDate() {
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Send message functionality
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) {
        alert('Please write something before sending! ❤️');
        return;
    }
    
    try {
        const button = document.querySelector('.send-button');
        button.disabled = true;
        button.style.opacity = '0.7';
        
        await fetch(SHEET_URL, {
            method: 'POST',
            body: JSON.stringify({ message }),
            mode: 'no-cors'
        });
        
        // Show success animation
        showSuccessModal();
        
        // Clear input
        messageInput.value = '';
        
        // Reset button
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

// Success modal
function showSuccessModal() {
    const modal = document.querySelector('.success-modal');
    modal.style.display = 'flex';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 2000);
}

// Fetch and display messages
async function fetchMessages() {
    const lettersFeed = document.getElementById('lettersFeed');
    if (!lettersFeed) return;
    
    try {
        const response = await fetch(SHEET_URL);
        const messages = await response.json();
        
        lettersFeed.innerHTML = ''; // Clear existing messages
        
        messages.reverse().forEach((msg, index) => {
            const letterCard = document.createElement('div');
            letterCard.className = 'letter-card animate__animated animate__fadeInUp';
            letterCard.style.animationDelay = `${index * 0.1}s`;
            
            const date = new Date(msg.timestamp);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
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
        lettersFeed.innerHTML = `
            <div class="error-message">
                Failed to load messages. Please refresh the page! 💌
            </div>
        `;
    }
}

// Handle Enter key in textarea
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        const messageInput = document.getElementById('messageInput');
        if (document.activeElement === messageInput) {
            sendMessage();
        }
    }
});
