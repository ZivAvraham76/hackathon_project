import '../index.css';
import { useState } from 'react';

function Newgame() {
  const [gameName, setGameName] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [roomDetails, setRoomDetails] = useState(null); 
  const [gameCreated, setGameCreated] = useState(false); 

  const handleCreateGame = async () => {
    if (!gameName.trim()) {
      setMessage('Please enter a valid game name.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/rooms/create-new-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: gameName }), 
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Game created successfully!');
        setRoomDetails(result);
        setGameCreated(true); 
      } else {
        setMessage(result.message || 'Failed to create the game. Please try again.');
        setRoomDetails(null);
      }
    } catch (error) {
      console.error('Error creating game:', error);
      setMessage('An error occurred. Please try again later.');
      setRoomDetails(null); 
    }
  };

  return (
    <div className="container">
      
      {!gameCreated ? (
        <>
        <h1>Create a New Game</h1>
          <input
            type="text"
            placeholder="Enter game name"
            className="gameInput"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <button className="createButton" onClick={handleCreateGame}>
            Create Game
          </button>
          {message && <p className="message">{message}</p>}
        </>
      ) : (
        <>
          {message && <h1 className="message">{message}</h1>}
          {roomDetails && (
            <div className="roomDetails">
              <h3>Room Details:</h3>
              <p><strong>Room ID:</strong> {roomDetails.room_id}</p>
              <p><strong>Join Code:</strong> {roomDetails.join_code}</p>
              <p><strong>Owner ID:</strong> {roomDetails.owner_id}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Newgame;
