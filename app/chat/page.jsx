"use client";
import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import SideBar from "@/components/chat/SideBar";
import axios from "axios";

import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionAnswer from "@/components/chat/QuestionAnswer";
import { getCookie } from "cookies-next";
import { History } from "@/contexts/ChatContext";

const schema = z.object({
  prompt: z.string().min(1, "Please input a prompt"),
});

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [incompleteChat, setIncompleteChat] = useState({});

  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const [currentChat, setCurrentChat] = useContext(History);

  const addChat = (question) => {
    setIncompleteChat({ question: question, answer: "" });
  };

  const handleCustomSubmit = (fields) => {
    addChat(fields.prompt);

    axios
      .post(
        "http://localhost:8000/chat",
        {
          prompt: fields.prompt,
          chats_id: currentChat?.chats_id,
        },
        { headers: { Authorization: getCookie("Authorization") } }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (!currentChat) {
          setCurrentChat(response.data.data);
        }

        setChats([
          ...chats,
          { question: fields.prompt, answer: data.data.response },
        ]);
        setIncompleteChat({});
        reset();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (!currentChat) return;

    axios
      .get(
        "http://localhost:8000/one_history?chats_id=" + currentChat.chats_id,
        {
          headers: { authorization: getCookie("Authorization") },
        }
      )
      .then((res) => {
        console.log("fetched chat", res);

        const fetched_chats = res.data.data.chats;
        const chats_data = [];
        for(let i = 0; i < fetched_chats.length; i++){
          chats_data.push({question: fetched_chats[i].prompt, answer: fetched_chats[i].response});
        }
        

        setChats(chats_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentChat]);

  return (
    <div>
      <section className="page flex">
        <SideBar />

        <div className="main p-8 uppercase  font-bold relative">
          {chats.length == 0 && (
            <h1 className="chat-heading text-5xl text-center absolute">
              How can i Help you today?
            </h1>
          )}

          <form onSubmit={handleSubmit(handleCustomSubmit)}>
            <div className="chat-box absolute my-12 w-full flex justify-center">
              <label htmlFor="chatbox" className="chat-label hidden"></label>
              <div className="flex w-3/5 gap-2">
                <input
                  type="text"
                  id="chatbox"
                  name="chatbox"
                  placeholder="Message LegalBot..."
                  className="chat-box-input px-16 border border-solid block w-full m-auto"
                  {...register("prompt")}
                />
                <button
                  type="submit"
                  className="bg-blue-900 px-5 border-2 rounded-3xl hover:bg-[#3836b6] hover:text-white duration-300 chat-box-input"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>

          {chats.length != 0 && (
            <div className="question-answer absolute w-full">
              {chats && chats.map((QNA) => <QuestionAnswer QNA={QNA} />)}
              {incompleteChat.question && (
                <QuestionAnswer QNA={incompleteChat} />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Chat;
