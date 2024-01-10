import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Message = styled.div`
  background-color: ${(props) => (props.type === 'user' ? '#0084FF' : '#003366')};
  color: white;
  border-radius: 8px;
  padding: 10px;
  max-width: 70%;
  align-self: ${(props) => (props.type === 'user' ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #555;
  font-size: 16px;
  margin-right: 10px;
  outline: none;
  background-color: #333;
  color: white;
  &::placeholder {
    color: #777;
  }
`;

const SendButton = styled.button`
  background-color: #0084FF;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #006bbf;
  }
`;

const ChatApp = () => {
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        const userMessage = { text: inputText, type: 'user' };
        setChatHistory([...chatHistory, userMessage]);

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userMessage: inputText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            const aiResponse = { text: responseData.aiResponse, type: 'ai' };
            setChatHistory([...chatHistory, aiResponse]);
            setInputText('');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Container>
            <ChatContainer>
                {chatHistory.map((message, index) => (
                    <Message key={index} type={message.type}>
                        {message.text}
                    </Message>
                ))}
            </ChatContainer>
            <InputContainer>
                <Input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <SendButton onClick={handleSubmit}>Send</SendButton>
            </InputContainer>
        </Container>
    );
};

export default ChatApp;
