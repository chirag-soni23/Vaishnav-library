import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/contact/send-email', {
        name,
        email,
        message,
      });

      if (response.data.message === 'Email sent successfully') {
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-5">Contact Us</h1>
      <form
        className="w-full max-w-lg bg-base-100 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Message</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter your message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
