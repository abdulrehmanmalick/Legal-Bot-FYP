"use client";
import { createContext, useState } from "react";

export const History = createContext(null);

function ChatContext({ children }) {
  const chat = useState(null);

  return <History.Provider value={chat}>{children}</History.Provider>;
}

export default ChatContext;
