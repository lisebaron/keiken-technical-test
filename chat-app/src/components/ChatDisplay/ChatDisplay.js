import React, { useEffect, useRef, useState } from 'react';
import './ChatDisplay.css';
import Prompt from '../Prompt/Prompt';

const ChatDisplay = ({topicId}) => {
  const [messages, setMessages] = useState([]);

  const handleDataFromChild = (question, answer) => {
    setMessages([...messages, question, answer]);
  };
  
  //scroll default to bottom
  const myDivRef = useRef(null);
  useEffect(() => {
    const myDiv = myDivRef.current;
    if (myDiv) {
      myDiv.scrollTop = myDiv.scrollHeight;
    }
  })

  useEffect(() => {
    if (topicId !== null) {
      getMessageByTopicId();
    }
  }, [topicId]);

  const getMessageByTopicId = () => {
      fetch("/getMessages/" + topicId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setMessages(data.messages.map((message => ({role:message.role, message_content:message.message_content})))))
      .catch(error => console.error('Error when fetching messages by topic Id :', error));
  }

  return (
  <div className="chat-display">
    <div ref={myDivRef} className="chat-box">
      {messages.map((message, index) => (
        <div key={index} className='message-box'>

          <span>{message.role}</span>

          <div className="border-solid">
            <span>{message.message_content}</span>
          </div>

        </div>
      ))}
    </div>

    <Prompt sendDataToParent={handleDataFromChild} topicId={topicId}/>
  </div>
  )
};

ChatDisplay.propTypes = {};

ChatDisplay.defaultProps = {};

export default ChatDisplay;
