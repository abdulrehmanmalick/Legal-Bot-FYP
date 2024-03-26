import React from "react";

function HistoryCard({ chat, onclick }) {
  return (
    <div
      onClick={onclick}
      className="border-2 border-white rounded-xl px-4 py-2 mt-2 hover:cursor-pointer hover:bg-white hover:bg-opacity-20 duration-300 w-full"
    >
      <h2 className="font-bold">{chat.prompt}</h2>
      <p className="text-[10px]">{chat.response}</p>
    </div>
  );
}

export default HistoryCard;
