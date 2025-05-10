document.addEventListener('DOMContentLoaded', () => {
    console.log('Chatbot script loaded and DOM ready');

    // DOM elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbot = document.getElementById('chatbot');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const clearBtn = document.getElementById('clear-chat-btn');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const suggestions = document.getElementById('suggestions');
    const chatToggle = document.getElementById('chat-toggle');
    const feedbackInput = document.getElementById('feedback-input');
    const feedbackSubmit = document.getElementById('feedback-submit');

    // Validate DOM elements
    const requiredElements = {
        chatbotToggle, chatbot, chatBody, chatInput, sendBtn, clearBtn,
        suggestions, chatToggle, feedbackInput, feedbackSubmit
    };
    let missingElements = false;
    for (const [key, element] of Object.entries(requiredElements)) {
        if (!element) {
            console.error(`Critical error: ${key} is missing from DOM`);
            missingElements = true;
        }
    }
    if (missingElements) {
        alert('Chatbot initialization failed: Missing DOM elements. Check Console for details.');
        return;
    }
    console.log('All chatbot DOM elements found');

    // Check quick replies
    if (quickReplies.length === 0) {
        console.warn('No quick-reply buttons found');
    } else {
        console.log(`Found ${quickReplies.length} quick-reply buttons`);
    }

    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    let isProcessing = false;

    // Static responses
    const staticResponses = {
        "about us": "SEACET, established in 1972, is committed to quality education. Learn more on our <a href='about-us.html'>About Us</a> page.",
        "vision": "SEACET's vision is to be a global leader in technical education.",
        "mission": "Our mission includes transformative education and research.",
        "internships": "Explore internship opportunities on our Internships page: <a href='internships.html'>Internships</a>.",
        "ai internships": "AI internships include roles like Data Scientist at Infosys.",
        "cs internships": "CS internships include Software Engineer roles at TCS.",
        "courses": "We offer AI & Data Science, Computer Science, Electronics, and Mechanical Engineering.",
        "fees": "Hostel fees are ₹50,000/year. Contact the office for course fees.",
        "admissions": "Admissions are open for 2025. Visit <a href='admissions.html'>Admissions</a> for details.",
        "placements": "Our placement cell offers 90% placement. See <a href='placements.html'>Placements</a>."
    };

    function displayMessage(message, sender) {
        console.log(`Attempting to display ${sender} message: ${message}`);
        try {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            messageDiv.innerHTML = `<div class="message-bubble">${message}</div>`;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
            console.log('Message displayed successfully');
        } catch (error) {
            console.error('Error displaying message:', error);
        }
    }

    function saveChatHistory() {
        console.log('Saving chat history:', chatHistory);
        try {
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    function loadChatHistory() {
        console.log('Loading chat history:', chatHistory);
        chatHistory.forEach(msg => displayMessage(msg.text, msg.sender));
    }

    function clearChatHistory() {
        console.log('Clearing chat history');
        chatHistory = [];
        chatBody.innerHTML = '';
        saveChatHistory();
        localStorage.removeItem('chatHistory');
        displayMessage('Chat history cleared.', 'bot');
    }

    function getBotResponse(query) {
        console.log(`Getting response for query: ${query}`);
        return staticResponses[query] || "Sorry, I didn't understand. Try asking about courses, fees, or internships.";
    }

    async function handleUserInput() {
        if (isProcessing) {
            console.log('Input processing in progress, ignoring');
            return;
        }
        isProcessing = true;

        const query = chatInput.value.trim().toLowerCase();
        console.log(`Processing query: ${query}`);
        if (!query) {
            console.log('Empty query, ignoring');
            isProcessing = false;
            return;
        }

        displayMessage(query, 'user');
        chatHistory.push({ text: query, sender: 'user' });
        saveChatHistory();

        chatInput.value = '';
        displayMessage('Typing...', 'bot typing-indicator');

        // Simulate response delay
        setTimeout(() => {
            const typingIndicator = chatBody.querySelector('.typing-indicator');
            if (typingIndicator) {
                chatBody.removeChild(typingIndicator);
            }
            const response = getBotResponse(query);
            displayMessage(response, 'bot');
            chatHistory.push({ text: response, sender: 'bot' });
            saveChatHistory();

            // Proactive suggestion
            if (query.includes('about us') || query.includes('vision') || query.includes('mission')) {
                setTimeout(() => {
                    displayMessage("Learn more on the <a href='about-us.html'>About Us</a> page!", 'bot');
                }, 2000);
            }
            isProcessing = false;
        }, 1000);
    }

    // Event listeners
    chatbotToggle.addEventListener('click', () => {
        console.log('Chatbot toggle clicked');
        chatbot.classList.toggle('chatbot-hidden');
        if (!chatbot.classList.contains('chatbot-hidden')) {
            chatInput.focus();
            console.log('Chatbot opened, input focused');
        }
    });

    chatToggle.addEventListener('click', () => {
        console.log('Chatbot minimize clicked');
        chatbot.classList.add('chatbot-hidden');
    });

    sendBtn.addEventListener('click', () => {
        console.log('Send button clicked');
        handleUserInput();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            handleUserInput();
        }
    });

    clearBtn.addEventListener('click', () => {
        console.log('Clear button clicked');
        clearChatHistory();
    });

    quickReplies.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log(`Quick reply ${index + 1} clicked: ${button.dataset.query}`);
            chatInput.value = button.dataset.query;
            handleUserInput();
        });
    });

    feedbackSubmit.addEventListener('click', () => {
        const feedback = feedbackInput.value.trim();
        console.log(`Feedback submit clicked, value: ${feedback}`);
        if (feedback) {
            let feedbackData = JSON.parse(localStorage.getItem('chatbotFeedback')) || [];
            feedbackData.push({ text: feedback, timestamp: new Date().toISOString() });
            localStorage.setItem('chatbotFeedback', JSON.stringify(feedbackData));
            feedbackInput.value = '';
            displayMessage('Thank you for your feedback!', 'bot');
        }
    });

    loadChatHistory();
    console.log('Chatbot fully initialized');
});