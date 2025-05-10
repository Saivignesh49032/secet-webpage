from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from chatterbot import ChatBot # type: ignore
from chatterbot.trainers import ListTrainer # type: ignore
from datetime import datetime
import json
import logging
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5501"}})  # Allow Live Server origin

# Set up logging to file and console
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s',
    handlers=[
        logging.FileHandler('chatbot.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

chatbot = ChatBot('SEACETBot', read_only=False)
trainer = ListTrainer(chatbot)

# Load training data
try:
    if os.path.exists('data/chatbot-data.json'):
        with open('data/chatbot-data.json', 'r') as f:
            training_data = json.load(f)
            for query, response in training_data.items():
                trainer.train([query, response])
        logger.info('Chatbot trained with chatbot-data.json')
    else:
        logger.warning('chatbot-data.json not found, using default response')
except Exception as e:
    logger.error(f'Error loading chatbot-data.json: {e}')

@app.route('/api/chatbot', methods=['POST'])
def chatbot_response():
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            logger.error('Invalid request: No query provided')
            return jsonify({'response': 'Error: No query provided'}), 400

        query = data['query'].lower()
        context = data.get('context', 'guest')
        logger.info(f'Received query: {query}, context: {context}')

        # Test response for debugging
        if query == 'test':
            response = 'Test response successful!'
        else:
            response = chatbot.get_response(query).text or 'Sorry, I didn’t understand. Try asking about courses or internships.'

        logger.info(f'Response: {response}')

        # Store low-confidence queries
        if chatbot.get_response(query).confidence < 0.7:
            with open('data/active-learning.json', 'a') as f:
                json.dump({'query': query, 'timestamp': str(datetime.now())}, f)
                f.write('\n')
            logger.info('Stored query for active learning')

        return jsonify({'response': response})
    except Exception as e:
        logger.error(f'Error processing request: {e}')
        return jsonify({'response': 'Server error, please try again.'}), 500

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    logger.info('Test endpoint accessed')
    return jsonify({'status': 'Backend is running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)