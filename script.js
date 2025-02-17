// Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx-kTIErFXAnuHK70NCmm4sXeggZHFkLFZtqYeeimesOzCj7u6Ymi76QafH3ZM7NSIzYw/exec';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page initialized');
    loadLetters();
    initializeForm();
});

// Language toggle functionality
function toggleLanguage() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang') || 'en';
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    html.setAttribute('lang', newLang);
    
    // Update placeholders
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const placeholder = textarea.dataset[`${newLang}Placeholder`];
        if (placeholder) textarea.placeholder = placeholder;
    });
}

// Initialize form submission
function initializeForm() {
    const form = document.getElementById('letterForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const content = document.getElementById('letterContent').value;
    if (!content.trim()) return;
    
    try {
        console.log('Submitting message:', content);
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: content
            }),
            mode: 'no-cors' // Add this to handle CORS
        });

        console.log('Submission response:', response);
        
        document.getElementById('letterContent').value = '';
        showSuccessAnimation();
        
        // If we're on the letters page, refresh the letters
        if (window.location.pathname.includes('letters.html')) {
            loadLetters();
        } else {
            // Redirect to letters page after brief delay
            setTimeout(() => {
                window.location.href = 'letters.html';
            }, 1000);
        }
    } catch (error) {
        console.error('Error saving letter:', error);
        alert('Failed to save letter. Please try again.');
    }
}

// Show success animation
function showSuccessAnimation() {
    const btn = document.querySelector('.submit-btn');
    const heart = document.querySelector('.heart-animation');
    
    heart.style.opacity = '1';
    heart.style.transform = 'translate(-50%, -50%) scale(1.5)';
    
    setTimeout(() => {
        heart.style.opacity = '0';
        heart.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 1000);
}

// Load letters from Google Apps Script
async function loadLetters() {
    const container = document.getElementById('lettersContainer');
    if (!container) {
        console.log('Letters container not found');
        return;
    }
    
    try {
        console.log('Fetching letters...');
        const response = await fetch(SCRIPT_URL);
        console.log('Response:', response);
        
        if (!response.ok) throw new Error('Failed to fetch messages');
        
        const letters = await response.json();
        console.log('Fetched letters:', letters);
        
        if (Array.isArray(letters)) {
            displayLetters(letters);
        } else {
            console.error('Received data is not an array:', letters);
            container.innerHTML = '<p>Error: Invalid data format received</p>';
        }
    } catch (error) {
        console.error('Error loading letters:', error);
        container.innerHTML = '<p>Failed to load letters. Please try again later.</p>';
    }
}

// Display letters in the container
function displayLetters(letters) {
    const container = document.getElementById('lettersContainer');
    if (!letters || letters.length === 0) {
        console.log('No letters to display');
        container.innerHTML = '<p>No letters yet. Be the first to write one!</p>';
        return;
    }
    
    console.log('Displaying letters:', letters);
    container.innerHTML = '';
    
    letters.reverse().forEach(letter => {
        const element = createLetterElement(letter);
        container.appendChild(element);
    });
}

// Create letter element
function createLetterElement(letter) {
    console.log('Creating element for letter:', letter);
    const div = document.createElement('div');
    div.className = 'letter';
    
    const date = new Date(letter.timestamp);
    const formattedDate = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    div.innerHTML = `
        <div class="letter-content">${letter.message}</div>
        <div class="letter-meta">
            <span>${formattedDate}</span>
            <div class="letter-actions">
                <button class="heart-btn" onclick="toggleHeart(this)">❤️</button>
            </div>
        </div>
    `;
    
    return div;
}

// Toggle heart animation
function toggleHeart(btn) {
    btn.classList.toggle('active');
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}
