import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import HistoryAccordion from './components/HistoryAccordion/HistoryAccordion';
import ChatDisplay from './components/ChatDisplay/ChatDisplay';

function App() {
  const [currentTopicId, setCurrentTopicId] = useState(null);

  const historyAccordionRef = useRef();

  const callGetAllTopics = () => {
    // Call HistoryAccordion's function getAllTopics using the ref
    if (historyAccordionRef.current && historyAccordionRef.current.getAllTopics) {
      historyAccordionRef.current.getAllTopics();
    }
  };

  const handleDataFromChild = (data) => {
    setCurrentTopicId(data);
  };

  return (
    <div className="app">
      <HistoryAccordion ref={historyAccordionRef} sendDataToParent={handleDataFromChild} callGetAllTopics={callGetAllTopics}/>
      <ChatDisplay currentTopicId={currentTopicId} setCurrentTopicId={setCurrentTopicId}/>
    </div>
  );
}

export default App;
