import './App.css';
import React, { useEffect } from 'react';
import Prompt from './components/Prompt/Prompt';

function App() {
  useEffect(() => {
    fetch('/test')
      .then(response => response.json())
      .then(data => console.log('Réponse du serveur:', data))
      .catch(error => console.error('Erreur lors de la requête vers le serveur:', error));
  }, []);
  
  return (
    <div className="App">
      <div className="chat-container">
        <Prompt />
      </div>
    </div>
  );
}

export default App;
