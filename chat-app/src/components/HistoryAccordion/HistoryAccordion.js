import React, { forwardRef, useEffect, useState } from "react";
import "./HistoryAccordion.css";

const HistoryAccordion = forwardRef(({ sendDataToParent, callGetAllTopics, setCurrentTopicId }, ref) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics();
    if (ref) {
      ref.current = { getAllTopics };
    }
  }, [ref, callGetAllTopics]);

  function selectTopic(id) {
    sendDataToParent(id);
  }
  
  const getAllTopics = () => {
    fetch("http://localhost:4000/getTopics", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setTopics(data.topics))
      .catch(error => console.error('Erreur lors de la requête vers le serveur:', error));
  }

  function createNewTopic() {
    setCurrentTopicId('');
  }

  useEffect(() => {
    getAllTopics();
  }, [getAllTopics]);

  return (
    <div className="bg-color">
      <div className="history-accordion">
        <h3 className="title">Tech-test OpenAI</h3>
        <div className="button-box">
        <button className="button color-gray" onClick={createNewTopic}>Nouveau Topic</button>
        <hr className="color-dark-gray hr-margin"></hr>
          {topics.slice().reverse().map((topic) => (
              <button className="button color-dark-gray" key={topic._id} onClick={() => selectTopic(topic._id)}>{topic.name}</button>
          ))}
        </div>
      </div>
    </div>
  )
});

HistoryAccordion.propTypes = {};

HistoryAccordion.defaultProps = {};

export default HistoryAccordion;
