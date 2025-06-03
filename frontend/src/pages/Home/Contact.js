import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: 'mianinzemam@gmail.com',
      name: formData.name,
      email: formData.email,
      subject: formData.subject || `New message from: ${formData.name}`,
      message: formData.message
    };

    emailjs.send('service_93z2g9b', 'template_zphrw8m', templateParams, '2wyDhAljfMQpAmHDQ')
      .then((response) => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
      });
  };

  return (
    <div>
      <SectionTitle title="Contact Me" />

      <div className="flex w-full items-center sm:flex-col mt-2 gap-8">
        {/* Image (Lottie Animation) - Moved above the form */}
        <div className="h-[65vh] w-1/2 sm:w-full">
          <dotlottie-player
            src="https://lottie.host/8f830d83-5c9a-4d71-be5d-a12edb3df59b/WZqHfiIxqZ.lottie"
            background="transparent"
            speed="1"
            style={{ height: "100%", width: "100%" }}
          ></dotlottie-player>
        </div>

        {/* Form */}
        <form
          className="w-1/2 sm:w-full bg-primary p-2 rounded-lg shadow-md flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-tertiary block mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-3 bg-transparent border border-tertiary text-white rounded focus:outline-none focus:ring-2 focus:ring-tertiary"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-tertiary block mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-transparent border border-tertiary text-white rounded focus:outline-none focus:ring-2 focus:ring-tertiary"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-tertiary block mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              className="w-full p-3 bg-transparent border border-tertiary text-white rounded focus:outline-none focus:ring-2 focus:ring-tertiary"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-tertiary block mb-1">Message</label>
            <textarea
              rows="5"
              name="message"
              placeholder="Write your message..."
              className="w-full p-3 bg-transparent border border-tertiary text-white rounded focus:outline-none focus:ring-2 focus:ring-tertiary resize-none"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-tertiary text-primary font-bold py-2 px-6 rounded hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;