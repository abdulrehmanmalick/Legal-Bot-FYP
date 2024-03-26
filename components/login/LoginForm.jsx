import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const loginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/login", formData)
      .then((response) => {
        const data = response.data;
        console.log(response.data);

          setCookie("Authorization", response.data.authorization);
          router.push("/chat");
      })
      .catch((error) => {
        console.log("error", error);
      });


      setFormData({
        name: "",
        email: "",
        password: "",
      });
};

  return (
    <>
      <form onSubmit={handleSubmit} className="form px-40 py-10">
        <div className="form__group">
          <label htmlFor="email" className="form__label block py-4">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="form__input w-full p-4 mb-8 rounded-xl"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label block pb-4">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="form__input w-full p-4 mb-8 rounded-xl"
            placeholder="Enter your Password"
            required
          />
        </div>
        <div className="form__group">
          <button
            type="submit"
            className="btn w-full text-3xl text-white my-4 py-4 rounded-xl"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default loginForm;
