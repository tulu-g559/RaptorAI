import google.generativeai as genai
import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable is not set")

genai.configure(api_key=api_key)

app = Flask(__name__)

model = genai.GenerativeModel("models/gemini-1.5-pro")

# Global variables to store conversation history and context
conversation_history = []

def voice_assistance(input_user):
    if not input_user:
        return "Please provide some input"

    try:
        # Improved prompt with focus on concise and direct answers
        prompt = f"""
        You are an AI assistant in an engaging conversation with a user. The user just asked the following question:
        '{input_user}'
        Provide a direct and informative answer, focusing on the exact details the user is asking for. 
        Avoid unnecessary elaboration or asking follow-up questions unless essential to the user's inquiry. 
        Keep the response clear, concise, and to the point. If the topic is complex, briefly summarize the key aspects.
        """

        response = model.generate_content(prompt).text

        # Update conversation history
        conversation_history.append({
            'user': input_user,
            'ai': response
        })

        return response

    except Exception as e:
        return f"An error occurred: {str(e)}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_voice', methods=['POST'])
def process_voice():
    user_input = request.json.get("user_input")
    response = voice_assistance(user_input)

    return jsonify({
        'response': response, 
        'conversation_history': conversation_history
    })

if __name__ == '__main__':
    app.run(debug=True)