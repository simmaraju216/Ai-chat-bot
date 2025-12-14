import React, { useContext } from "react";
import "../App.css";
import { BiImageAdd } from "react-icons/bi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaPlus, FaArrowUpLong, FaTrash } from "react-icons/fa6";
import { DataContext, user } from "../context/UserContext";
import { genarateResponse } from "../gemini";
import Chat from "./Chat";

export default function Home() {
  const {
    messages,
    setMessages,
    startRes,
    setStartRes,
    popUp,
    setPopUp,
    input,
    setInput,
  } = useContext(DataContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input && !user.imgUrl) return;

    setStartRes(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input, img: user.imgUrl },
    ]);

    setInput("");

    const aiText = await genarateResponse(input);

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: aiText },
    ]);

    user.imgUrl = null;
  }

  function handleClearChat() {
    setMessages([]);       // ✅ clear chat
    setStartRes(false);    // optional: go back to home
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      user.imgUrl = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="home">
      <nav>
        <div className="logo" onClick={() => setStartRes(false)}>
          Smart AI Bot
        </div>

        {/* ✅ CLEAR CHAT BUTTON */}
        {messages.length > 0 && (
          <button className="clear-btn" onClick={handleClearChat}>
            <FaTrash /> Clear Chat
          </button>
        )}
      </nav>

      <input type="file" hidden id="inputImg" onChange={handleImage} />

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

            <div className="chat" onClick={() => setStartRes(true)}>
              <IoChatboxEllipsesOutline />
              <span>Let's Chat</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}

      <form className="input-box" onSubmit={handleSubmit}>
        {popUp && (
          <div className="pop-up">
            <div
              className="select-up"
              onClick={() => {
                setPopUp(false);
                document.getElementById("inputImg").click();
              }}
            >
              <BiImageAdd />
              <span>Upload Image</span>
            </div>
          </div>
        )}

        <div id="add" onClick={() => setPopUp((p) => !p)}>
          <FaPlus />
        </div>

        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {(input || user.imgUrl) && (
          <button id="submit" type="submit">
            <FaArrowUpLong />
          </button>
        )}
      </form>
    </div>
  );
}
