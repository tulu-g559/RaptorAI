const startRecordBtn = document.getElementById('start-record-btn');
const responseText = document.getElementById('response-text');
const conversationHistory = document.getElementById('conversation-history');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    responseText.innerHTML = 'Listening...';
};

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onresult = function(event) {
    const userInput = event.results[0][0].transcript;
    responseText.innerHTML = `You said: "${userInput}"`;

    fetch('/process_voice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        const aiResponse = data.response;
        responseText.innerHTML = `AI Response: "${aiResponse}"`;
        updateConversationHistory(data.conversation_history);
        speakResponse(aiResponse);
    })
    .catch(error => {
        responseText.innerHTML = 'Error processing request.';
    });
};

startRecordBtn.addEventListener('click', () => {
    recognition.start();
});

function updateConversationHistory(history) {
    conversationHistory.innerHTML = '';
    history.forEach(entry => {
        const historyEntry = document.createElement('div');
        historyEntry.classList.add('history-entry');

        const userInput = document.createElement('div');
        userInput.classList.add('user-input');
        userInput.innerHTML = `You: ${entry.user}`;

        const aiResponse = document.createElement('div');
        aiResponse.classList.add('ai-response');
        aiResponse.innerHTML = `AI: ${entry.ai}`;

        historyEntry.appendChild(userInput);
        historyEntry.appendChild(aiResponse);
        conversationHistory.appendChild(historyEntry);
    });
}

function speakResponse(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// ...existing code...

const stopSpeakBtn = document.getElementById('stop-speak-btn');
let currentUtterance = null;

function speakResponse(text) {
    const synth = window.speechSynthesis;
    
    // Stop any ongoing speech
    if (synth.speaking) {
        synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;

    utterance.onstart = () => {
        stopSpeakBtn.disabled = false;
    };

    utterance.onend = () => {
        stopSpeakBtn.disabled = true;
        currentUtterance = null;
    };

    utterance.onerror = () => {
        stopSpeakBtn.disabled = true;
        currentUtterance = null;
    };

    synth.speak(utterance);
}

stopSpeakBtn.addEventListener('click', () => {
    if (currentUtterance) {
        window.speechSynthesis.cancel();
        stopSpeakBtn.disabled = true;
        currentUtterance = null;
    }
});

// Add this to handle page unload
window.addEventListener('beforeunload', () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
});