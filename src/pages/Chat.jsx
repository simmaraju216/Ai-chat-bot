import React, { useContext } from "react";
import "../App.css";
import { DataContext, prevUser } from "../context/UserContext";
import { FaUserCircle, FaRobot } from "react-icons/fa";

function Chat() {
  const { showResult, prevFeature, genImgUrl } = useContext(DataContext);

  return (
    <div className="chat-page">
      {/* AI Message */}
      <div className="chat-bubble ai-bubble">
        <div className="chat-icon">
          <FaRobot size={30} color="deepskyblue" />
        </div>
        <div className="chat-content">
          {prevFeature === "upimg" ? (
            prevUser.imgUrl ? <img src={prevUser.imgUrl} alt="user" /> : null
          ) : prevFeature === "genimg" ? (
            !genImgUrl ? <span>Generating Image...</span> : <img src={genImgUrl} alt="generated" />
          ) : !showResult ? (
            <span>Loading...</span>
          ) : (
            <span>{showResult}</span>
          )}
        </div>
      </div>

      {/* User Message */}
      <div className="chat-bubble user-bubble">
        <div className="chat-content">
          {prevFeature === "upimg" && prevUser.imgUrl && (
            <img src={prevUser.imgUrl} alt="user upload" />
          )}
          <span>{prevUser.prompt}</span>
        </div>
        <div className="chat-icon">
          <FaUserCircle size={30} color="yellowgreen" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
