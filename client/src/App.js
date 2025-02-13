import React, { useEffect, useState } from "react";
import socket from "./socket"; 

const App = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [privateMessage, setPrivateMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [privateMessages, setPrivateMessages] = useState([]); // Store private messages

  useEffect(() => {
    // Listen for new group messages
    socket.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Listen for private messages
    socket.on("newPrivateMessage", (data) => {
      setPrivateMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("newMessage");
      socket.off("newPrivateMessage");
    };
  }, []);

  const joinRoom = () => {
    if (room) {
      socket.emit("joinRoom", room);
      console.log(`Joined room: ${room}`);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", { room, sender: "User1", message });
      setMessage("");
    }
  };

  const sendPrivateMessage = () => {
    if (receiver && privateMessage) {
      socket.emit("sendPrivateMessage", {
        sender: "User1",
        receiver,
        message: privateMessage,
      });
      setPrivateMessage("");
    }
  };


  
const DeliveryForm = () => {
  const [userType, setUserType] = useState("manufacturer");
  const [response, setResponse] = useState(null);

  // Function to generate a random location
  const generateRandomLocation = () => ({
    lat: (Math.random() * 180 - 90).toFixed(6), // Random latitude (-90 to 90)
    lon: (Math.random() * 360 - 180).toFixed(6), // Random longitude (-180 to 180)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const manufacturerLocation = generateRandomLocation();
    const wholesalerLocation = generateRandomLocation();

    try {
      const res = await fetch("http://localhost:5000/api/delivery/calculate", {
        method: "POST",  
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          manufacturerLocation: manufacturerLocation,
          wholesalerLocation: wholesalerLocation
        }) // Convert data to JSON string
      });
      
      const data = await res.json();
      setResponse(data);
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Failed to calculate delivery fee" });
    }
  };

  return (
    <div>
      <h2>Delivery Fee Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>User Type:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="manufacturer">Manufacturer</option>
          <option value="wholesaler">Wholesaler</option>
        </select>

        <button type="submit">Calculate Fee</button>
      </form>

      {response && (
        <div>
          <h3>Result:</h3>
          {response.error ? (
            <p style={{ color: "red" }}>{response.error}</p>
          ) : (
            <p>
              Distance: {response.distance} <br />
              Fee: {response.fee}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

  return (
    <div>
      <h2>Group Chat</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <h3>Group Messages</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </li>
        ))}
      </ul>

      <h2>Private Chat</h2>
      <input
        type="text"
        placeholder="Receiver ID"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="text"
        placeholder="Private Message"
        value={privateMessage}
        onChange={(e) => setPrivateMessage(e.target.value)}
      />
      <button onClick={sendPrivateMessage}>Send Private</button>

      <h3>Private Messages</h3>
      <ul>
        {privateMessages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender} to {msg.receiver}:</strong> {msg.message}
          </li>
        ))}
      </ul>
      <DeliveryForm/>
    </div>
  );
};

export default App;





