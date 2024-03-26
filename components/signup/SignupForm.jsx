import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const signupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit=(e)=> {
    e.preventDefault();

    axios.post("http://localhost:8000/signup", formData).then((response) => {
      console.log(response.data)

      if (response.status === 200) {
        if (response.data.errorCode == 0) {
          router.push("/login");
        }

    } else {
      // ! ERROR HANDLING NEEDS DONE
      alert("Form submission failed!");
    }
  });
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form px-40 py-10">
        <div className="form__group">
          <label htmlFor="name" className="form__label block py-4">
            Name
          </label>
          <input
            type="name"
            id="name"
            required
            className="form__input w-full p-4 mb-8 rounded-xl"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
          />
        </div>
        <div className="form__group">
          <label htmlFor="email" className="form__label block py-4">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="form__input w-full p-4 mb-8 rounded-xl"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
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
            className="form__input w-full p-4 mb-8 rounded-xl"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__group">
          <button
            type="submit"
            className="btn w-full text-3xl text-white my-4 py-4 rounded-xl"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};

export default signupForm;
