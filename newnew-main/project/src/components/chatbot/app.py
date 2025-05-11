import os
from google import genai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import absl.logging
from langdetect import detect


app = Flask(__name__)
CORS(app)

os.environ["GRPC_VERBOSITY"] = "NONE"
absl.logging.set_verbosity(absl.logging.ERROR)

client = genai.Client(api_key="AIzaSyDjho6SJ0gw0GadBv5FoXzbqwH8aY6DFE4")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        data = request.get_json()
        user_message = data.get('message')
        chat_type = data.get('chat_type')

        # if chat_type == 'ai':
        #     response = client.models.generate_content(
        #         model="gemini-2.0-flash", contents=user_message
        #     )
        #     return jsonify({'response': response.text})
        if chat_type == 'ai':
            # Detect language
            lang = detect(user_message)
            system_prompt = f"""
            You are SmartLoanMate, an AI loan advisor. Reply in the user's language ({lang}). 
            Answer clearly, using bullet points or numbering where needed.
            Help with loan advice, EMI calculation, document info, and application process.
            """
            prompt = f"{system_prompt}\n\nUser: {user_message}\nAI:"
            response = client.models.generate_content(
                model="gemini-2.0-flash", contents=prompt

        )
        cleaned = clean_response(response.text)
        return jsonify({'response': cleaned})


        return jsonify({'response': f"You said: {user_message}"})
    
    except Exception as e:
        return jsonify({'response': f"An error occurred: {str(e)}"}), 500
import re

def clean_response(text):
    
    # max_length = 300 
    # if len(cleaned) > max_length:
    #     cleaned = cleaned[:max_length].rsplit('.', 1)[0] + '.'
    # Remove Markdown-style bold and italics
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    text = re.sub(r'\*(.*?)\*', r'\1', text)
    
    # Remove AI: prefix
    text = re.sub(r'^AI:\s*', '', text, flags=re.IGNORECASE)

    # Optional: Replace bullet points and unnecessary colons
    text = re.sub(r'^[\*\-]\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r':\s*\n', '.\n', text)

    # Remove excessive newlines
    text = re.sub(r'\n{2,}', '\n', text)

    return text.strip()


if __name__ == '__main__':
    app.run(debug=True)