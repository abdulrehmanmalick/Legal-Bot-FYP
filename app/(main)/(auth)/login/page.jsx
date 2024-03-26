import React from 'react';
import Image from 'next/image';

const Page = () => {
  return (
    <>
      <section className="page grid items-center">
        <div className="form-container">
          <a href="index.html" className="block heading__primary margin-auto text-5xl text-cyan-400 uppercase font-bold text-center">Legalbot</a>
          <form action="/login" method="POST" className="form px-40 py-10">
            <div className="form__group">
              <label htmlFor="email" className="form__label block py-4">Email</label>
              <input type="email" name="email" id="email" className="form__input w-full p-4 mb-8 rounded-xl" placeholder="Enter Your Email" required />
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label block pb-4">Password</label>
              <input type="password" name="password" id="password" className="form__input w-full p-4 mb-8 rounded-xl" placeholder="Enter your Password" required />
            </div>
            <div className="form__group">
              <button type="submit" className="btn w-full text-3xl text-white my-4 py-4 rounded-xl">Login</button>
            </div>
          </form>
        </div>
        <div className="info-login-signup text-center flex items-center">
          <div className="info-container">
            <Image 
              src="/assets/images/bot.png" alt="" className="info-img m-auto" 
              width={1000} height={1000} 
            />
            <div className="info-text">
              <h1 className="heading__primary margin-auto text-5xl text-white uppercase text-center my-16">Legalbot</h1>
              <p className="text-info text-2xl text-white m-auto w-3/5">Welcome to Legal Bot, your one-stop shop for all things legal. We're here to make the law accessible and understandable for everyone, regardless of their background or knowledge.</p>
              <a href="signup.html" type="submit" className="btn--2 w-3/6 text-3xl my-4 py-4 rounded-xl mt-16">Sign Up</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
