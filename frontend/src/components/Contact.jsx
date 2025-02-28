import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-5 mt-10">Contact Us</h1>
      <form className="w-full max-w-lg bg-base-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" className="input input-bordered w-full" placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" className="input input-bordered w-full" placeholder="Enter your email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
          <textarea className="textarea textarea-bordered w-full" placeholder="Enter your message" rows="4"></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;