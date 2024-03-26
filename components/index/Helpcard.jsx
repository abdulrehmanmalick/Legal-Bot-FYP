import React from "react";

const Helpcard = ({ title, description }) => {
  return (
    <div className="card px-16 py-8 rounded-2xl">
      <h2 className="heading__secondary text-3xl normal-case">{title}</h2>
      <p className="landing__text landing__text--2 pt-6 pb-4 text-black">
        {description}
      </p>
    </div>
  );
};

export default Helpcard;
