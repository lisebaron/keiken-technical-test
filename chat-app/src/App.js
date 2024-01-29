import './App.css';
import React, { useEffect, useState } from 'react';
import HistoryAccordion from './components/HistoryAccordion/HistoryAccordion';
import ChatDisplay from './components/ChatDisplay/ChatDisplay';

function App() {
  const [currentTopicId, setCurrentTopicId] = useState(null);

  const handleDataFromChild = (data) => {
    setCurrentTopicId(data);
  };

  return (
    <div className="app">
      <HistoryAccordion sendDataToParent={handleDataFromChild}/>
      <ChatDisplay topicId={currentTopicId}/>
    </div>
  );
}

export default App;
