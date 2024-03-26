import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function HelpForm() {

    const nameRef = useRef();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await axios.post("http://localhost:8000/help", formData);
        console.log(response);

        if(response.status === 200) {
        alert("Form submitted successfully!")
        }
        else {
         //  !!!ADD ERROR HANDLING
          
                 alert("Form submission failed!")
        }

        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form w-full">
            <div className="name-email flex gap-4 items-center py-8 justify-between">
                <label htmlFor="name" className="hidden">Name</label>
                <input
                    type="text"
                    id="name"
                    ref={nameRef}
                    required
                    className="name rounded-3xl w-full h-11 border-none p-4"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name" />
                <label htmlFor="email" className="hidden">Email</label>
                <input
                    type="email"
                    id="email"
                    required
                    className="email rounded-3xl w-full h-11 border-none p-4"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" />
            </div>
            <label htmlFor="message" className="hidden">Message</label>
            <textarea
                name="message"
                id="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message..."
                className="message w-full h-28 rounded-2xl border-none px-4 py-1.5"></textarea>
            <div className="submit text-center">
                <button
                    type="submit"
                    className="btn-secondary border-2 border-solid border-cyan-400 text-2xl text-white px-16 py-2 font-bold inline-block my-4 hover:bg-white hover:border-white hover:text-cyan-400 duration-200">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default HelpForm;
