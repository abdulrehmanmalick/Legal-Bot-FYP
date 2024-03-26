import React from 'react';

const Problemscard = ({ title, description }) => {
  return (
    <>
      <div className="double-box relative">
        <div className="card px-28 py-32  mx-24 my-36 flex bg-stone-200 gap-16 w-5/5">
          <div className="textbox w-4/6">
            <h2 className="heading__secondary text-5xl normal-case font-bold">
              {title}
            </h2>
            <p className="card__text pt-6 pb-4 text-black text-2xl font-thin">
              {description}
            </p>
          </div>
        </div>
        <div className="innerbox bg-white absolute top-0 right-0 p-16"></div>
      </div>
    </>
  );
};

export default Problemscard;
