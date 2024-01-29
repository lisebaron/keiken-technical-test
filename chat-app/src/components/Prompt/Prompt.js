import React, { useState } from 'react';
import './Prompt.css';

const Prompt = ({ sendDataToParent, topicId }) => {
  const [formData, setFormData] = useState({
    messageContent: '',
    apiKey: ''
  });

  function sendData(answer) {
    sendDataToParent({
      role:"user",
      message_content: formData.messageContent
    }, 
    {
      role:answer.role,
      message_content: answer.message_content
    }, answer.topic_id);
  }

  const sendNewQuestion = () => {
    fetch("/create", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${formData.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message_content: formData.messageContent,
        topicId: topicId == null ? "" : topicId
      })
    })
      .then(response => response.json())
      .then(data => sendData(data.newAnswer))
      .catch(error => console.error('Erreur lors de la requête vers le serveur:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendNewQuestion();

    setFormData({
      messageContent: '',
      apiKey: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="chat-prompt center">
        <input className="input-key" type="text" name="apiKey" value={formData.apiKey} onChange={handleChange} placeholder="API Key" />
        <input className="input-prompt" type="text" name="messageContent" value={formData.messageContent} onChange={handleChange} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

Prompt.propTypes = {};

Prompt.defaultProps = {};

export default Prompt;