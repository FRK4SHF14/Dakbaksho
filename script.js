// Google Sheet URL
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx-kTIErFXAnuHK70NCmm4sXeggZHFkLFZtqYeeimesOzCj7u6Ymi76QafH3ZM7NSIzYw/exec';

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initThemeToggle();
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
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            letterCard.innerHTML = `
                <div class="letter-content">${msg.message}</div>
                <div class="letter-timestamp">
                    <i class="far fa-clock"></i> ${formattedDate}
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
