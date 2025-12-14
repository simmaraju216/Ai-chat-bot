import React, { createContext, useState } from "react";

export const DataContext = createContext();

// Temporary user image holder
export const user = {
  data: null,
  mime_type: null,
  imgUrl: null,
};

function UserContext({ children }) {
  const [messages, setMessages] = useState([]); // chat history
  const [startRes, setStartRes] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [input, setInput] = useState("");

  return (
    <DataContext.Provider
      value={{
        messages,
        setMessages,
        startRes,
        setStartRes,
        popUp,
        setPopUp,
        input,
        setInput,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default UserContext;
