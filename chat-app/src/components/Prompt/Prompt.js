import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Prompt.css';

const Prompt = () => {
  const [message, setMessage] = useState('');

  // appelée lorsque le formulaire est soumis.
  const handleSubmit = (event) => {
    event.preventDefault(); // Evite le rechargement de la page.

    console.log("Message : ", message);
    setMessage('');
  };

  return (
    <form className="chat-prompt" onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
      {message}
      <button type="submit">Send</button>
    </form>
  );
};

Prompt.propTypes = {};

Prompt.defaultProps = {};

export default Prompt;