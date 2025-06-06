RaptorAI Voice Assistant
========================
**catches your voice fast**

A modern web-based voice assistant that uses Google's Gemini AI to provide natural conversations through voice interactions.

Features
--------

*   🎤 Voice-to-text input using Web Speech API
*   🤖 AI-powered responses using Google's Gemini Pro model
*   🔊 Text-to-speech output for AI responses
*   💬 Conversation history tracking
*   🎨 Modern, responsive UI design
*   ⚡ Real-time voice processing
    

Technology Stack
----------------

*   **Backend**: Python with Flask
*   **Frontend**: HTML5, CSS3, JavaScript
*   **AI Model**: Google Gemini Pro
*   **APIs**:
    *   Web Speech API for voice recognition
    *   SpeechSynthesis API for text-to-speech
    *   Google Generative AI for responses
        

Prerequisites
-------------
*   Python 3.8 or higher
*   Google API key for Gemini Pro
*   Modern web browser that supports Web Speech API
    

Installation
------------

1.  Clone the repository:
```
git clone https://github.com/tulu-g559/RaptorAI.git
```
2. Install required Python packages:

`pip install flask python-dotenv google-generativeai`

3. Create a .env file in the project root:
`GOOGLE_API_KEY=your_google_api_key_here`

Project Structure
-----------------
```
RaptorAI/
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── templates/
│   └── index.html
├── raptorrun.py
├── .env
└── README.md
```
Usage
-----

1.  Start the Flask application:
`python raptorrun.py`

Features in Detail
------------------
*   **Voice Recognition**: Automatically captures user voice input
*   **AI Processing**: Processes natural language using Gemini Pro
*   **Voice Output**: Converts AI responses to speech
*   **Conversation History**: Maintains a log of all interactions
*   **Responsive Design**: Works on desktop and mobile devices
    

Contributing
-----------
1.  Fork the repository
2.  Create your feature branch (git checkout -b feature/amazing-feature)
3.  Commit your changes (git commit -m 'Add some amazing feature')
4.  Push to the branch (git push origin feature/amazing-feature)
5.  Open a Pull Request
    

License
-------
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
---------------

*   Google Generative AI team for Gemini Pro
*   Flask framework developers
*   Web Speech API contributors
