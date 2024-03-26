"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios if it's not already imported
import HistoryCard from "./HistoryCard";
import { getCookie } from "cookies-next";

import { History } from "@/contexts/ChatContext";
import { Auth } from "@/contexts/AuthContext";

const SideBar = () => {
  const [chats, setChats] = useState([]);
  const [historyError, settHistoryError] = useState("");

  const [currentChat, setCurrentChat] = useContext(History);
  const [auth, setAuth] = useContext(Auth);

  useEffect(() => {
    async function retrieveChats() {
      if (!getCookie("Authorization")) {
        settHistoryError("Please login to get history");
        return 401;
      }

      try {
        axios
          .get("http://localhost:8000/history", {
            headers: { authorization: getCookie("Authorization") },
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setChats(response.data?.data.chats?.reverse());
            }
          })
          .catch((error) => {
            if (error.status == 401) {
              settHistoryError("Please login to get history");
              throw error;
            }
          });
      } catch (error) {
        console.error("Error retrieving chats:", error);
      }
    }

    retrieveChats();
  }, [currentChat]);


  return (
    <div className="side p-8 uppercase">
      <h1 className="head text-center text-white text-4xl">LegalBot</h1>
      <ol className="history text-white text-2xl">
        {chats.map((chat, index) => {
          return (
          <HistoryCard
            key={index}
            chat={chat}
            onclick={() => {
              setCurrentChat(chat);
            }}
          />
        )})}
      </ol>
      <p className="text-white text-center pt-20">{historyError}</p>
      <a
        href=""
        className="new-chat hover:bg-white hover:text-[#1a1957] duration-200 block text-white text-center mx-auto my-20 text-2xl py-4 px-8 border border-solid border-white"
      >
        New Chat
      </a>
    </div>
  );
};

export default SideBar;
