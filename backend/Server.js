// ai-chat-backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.userMessage;
    const aiResponse = generateResponse(userMessage);
    res.json({ aiResponse });
});

function generateResponse(userMessage) {
    // we can implement response logic based on keywords
    // This is an example
    if (userMessage.toLowerCase().includes('hello')) {
        return 'Hi there!';
    } else if (userMessage.toLowerCase().includes('how are you')) {
        return 'I am doing well, thank you!';
    } else {
        return 'I did not understand that.';
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
