import React, { useContext } from "react";
import "../App.css";
import { DataContext } from "../context/UserContext";
import { FaUser, FaRobot } from "react-icons/fa6";

function Chat() {
  const { messages } = useContext(DataContext);

  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${
            msg.role === "user" ? "user-msg" : "ai-msg"
          }`}
        >
          {msg.role === "user" ? <FaUser /> : <FaRobot />}
          <div className="msg-content">
            {msg.text && <p>{msg.text}</p>}
            {msg.img && <img src={msg.img} className="msg-img" />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
