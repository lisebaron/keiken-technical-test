import React, { useEffect, useState } from 'react';
import './HistoryAccordion.css';

const HistoryAccordion = ({ sendDataToParent }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics();
  }, []);

  function selectTopic(id) {
    sendDataToParent(id);
  }
  
  const getAllTopics = () => {
    fetch("/getTopics", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setTopics(data.topics))
      .catch(error => console.error('Erreur lors de la requête vers le serveur:', error));
  }

  return (
    <div className="HistoryAccordion">
      <h3 className="title">Tech-test OpenAI</h3>
      <div className="button-box">
        {topics.map((topic) => (
            <button className='button' key={topic._id} onClick={() => selectTopic(topic._id)}>{topic.name}</button>
        ))}
      </div>
    </div>
  )
};

HistoryAccordion.propTypes = {};

HistoryAccordion.defaultProps = {};

export default HistoryAccordion;
