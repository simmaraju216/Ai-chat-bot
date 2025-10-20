import React, { useContext } from "react";
import "../App.css";
import { BiImageAdd } from "react-icons/bi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaPlus, FaArrowUpLong, FaUser, FaRobot } from "react-icons/fa6";
import { DataContext, prevUser, user } from "../context/UserContext";
import { genarateResponse } from "../gemini";

export default function Home() {
  const {
    startRes, setStartRes,
    popUp, setPopUp,
    input, setInput,
    feature, setFeature,
    showResult, setShowResult,
    prevFeature, setPrevFeature
  } = useContext(DataContext);

  // Handle message submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!input && !user.imgUrl) return;

    setStartRes(true);
    setPrevFeature(feature);
    setShowResult("");

    // Save current user data to previous user
    prevUser.data = user.data;
    prevUser.mime_type = user.mime_type;
    prevUser.imgUrl = user.imgUrl;
    prevUser.prompt = input;

    // Clear input
    setInput("");

    // Generate AI response
    const result = await genarateResponse();
    setShowResult(result);
    setFeature("chat");

    // Reset current user data
    user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
  }

  // Handle image upload
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFeature("upimg");

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result.split(",")[1];
      user.data = base64;
      user.mime_type = file.type;
      user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
      console.log("Image loaded:", user.imgUrl);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="home">
      {/* Navbar */}
      <nav>
        <div
          className="logo"
          onClick={() => {
            setStartRes(false);
            setFeature("chat");
          }}
        >
          Smart AI Bot
        </div>
      </nav>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        hidden
        id="inputImg"
        onChange={handleImage}
      />

      {/* Hero Section */}
      {!startRes ? (
        <div className="hero">
          <span id="tag">What can I help with?</span>
          <div className="cate">
            <div
              className="upImg"
              onClick={() => document.getElementById("inputImg").click()}
            >
              <BiImageAdd />
              <span>Upload Image</span>
            </div>
            <div className="chat" onClick={() => setFeature("chat")}>
              <IoChatboxEllipsesOutline />
              <span>Let's Chat</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-container">
          {/* User message */}
          {prevUser.prompt && (
            <div className="message user-msg">
              <FaUser className="msg-icon" />
              <div className="msg-content">
                {prevUser.prompt && <p>{prevUser.prompt}</p>}
                {prevUser.imgUrl && (
                  <img src={prevUser.imgUrl} alt="User Upload" className="msg-img" />
                )}
              </div>
            </div>
          )}

          {/* AI response */}
          {showResult && feature === "chat" && (
            <div className="message ai-msg">
              <FaRobot className="msg-icon" />
              <div className="msg-content">
                <p>{showResult}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Box */}
      <form className="input-box" onSubmit={handleSubmit}>
        {/* Pop-up menu */}
        {popUp && (
          <div className="pop-up">
            <div
              className="select-up"
              onClick={() => {
                setPopUp(false);
                setFeature("chat");
                document.getElementById("inputImg").click();
              }}
            >
              <BiImageAdd />
              <span>Upload Image</span>
            </div>
          </div>
        )}

        {/* Add Button */}
        <div id="add" onClick={() => setPopUp(prev => !prev)}>
          <FaPlus />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Submit Button */}
        {(input || user.imgUrl) && (
          <button id="submit" type="submit">
            <FaArrowUpLong />
          </button>
        )}
      </form>
    </div>
  );
}
