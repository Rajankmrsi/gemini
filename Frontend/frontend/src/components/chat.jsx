import React, { useState } from 'react';
import '../App.css';
// import userImage from '../user.png';
import aiImage from '../ai.png';
import axios from 'axios';
import hackerImage from '../hacker.png';

const API = 'http://localhost:3000';

function Chat() {
  const [question, setQuestion] = useState('');

  const [response, setResponse] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/getResponse`, { question })
      .then((res) => typeText(res.data.response))
      .catch((err) => {
        console.error('Error:', err);
        setResponse('Error fetching response.');
      });
  };

  const typeText = (text) => {
    let index = 0;
    setResponse('');
    const interval = setInterval(() => {
      setResponse((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 30);
  };

  const speakHandler = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="app">
      <header className="header">Welcome to Smart ChatBot</header>

      <div className="box user-box">
        <div className="profile-pic">
          <img className="profile" src={hackerImage} alt="User" />
        </div>
        <p className="label">User</p>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
        />
        <button onClick={submitHandler}>Send</button>
      </div>

      <div className="box ai-box">
        <div className="profile-pic">
          <img className="profile" src={aiImage} alt="AI" />
        </div>
        <p className="label">Bharat GPT</p>
        <textarea
          value={response}
          readOnly
          placeholder="AI is working ..."
        />
        <button onClick={speakHandler}>Speak</button>
      </div>
    </div>
  );
}

export default Chat;
