import React, { useState } from 'react';
import { FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import sir from '../assets/sir.jpg';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');     
  const [modalContent, setModalContent] = useState('');  

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const privacyPolicyContent = (
    <div>
      <p className="mt-2">At Nirmal's website, we respect your privacy. This Privacy Policy outlines the information we collect from you and how we use it.</p>
      <p className="mt-2">We do not share your personal information with third parties without your consent, except as required by law. By using our services, you consent to the collection and use of your information in accordance with this policy.</p>
    </div>
  );

  const termsOfServiceContent = (
    <div className>
      <p className="mt-2">By accessing or using our website, you agree to comply with these Terms of Service. You may not use this website for any illegal or unauthorized purposes.</p>
      <p className="mt-2">We reserve the right to modify or discontinue the services we offer at any time, and we are not liable for any consequences resulting from these changes.</p>
    </div>
  );

  const supportContent = (
    <div>
      <p className="mt-2">If you need help or have any questions, feel free to reach out to us. Our support team is available 24/7 to assist you with any issues you may face.</p>
      <p className="mt-2">You can contact us via email at <a href="mailto:vaishnavlibrary18@gmail.com" className="text-blue-500">vaishnavlibrary18@gmail.com</a></p>
    </div>
  );

  const faqsContent = (
    <div>
      <div className="mt-2">
        <h4 className="font-semibold">Q: How do I create an account?</h4>
        <p>A: To create an account, simply click the "Sign Up" button on our homepage and follow the instructions.</p>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold">Q: What payment methods are accepted?</h4>
        <p>A: We accept payments via credit card, debit card, and PayPal.</p>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold">Q: How can I reset my password?</h4>
        <p>A: If you've forgotten your password, click the "Forgot Password" link on the login page and follow the instructions.</p>
      </div>
    </div>
  );

  return (
    <footer className="py-8 mt-10 bg-neutral">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <div className="flex items-center mb-6 md:mb-0">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={sir} alt="Profile" />
            </div>
          </div>
          <div className="ml-4 text-white">
            <p className="text-lg font-semibold ">Nirmal Vaishnav</p>
            <a href="mailto:vaishnavlibrary18@gmail.com" className="text-sm hover:underline ">vaishnavlibrary18@gmail.com</a>
            <div className="flex items-center mt-2">
              <FaInstagram className="mr-2 text-xl" />
              <a
                href="https://www.instagram.com/vaishnavlibrary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                Instagram
              </a>
            </div>
            <div className="flex items-center mt-2">
              <FaMapMarkerAlt className="mr-2 text-xl" />
              <a href='https://www.google.com/maps/place/973X%2BCMX+Vaishnav+library' className="text-sm hover:underline">Vaishnav Library</a>
            </div>
            <div className="flex items-center mt-2">
              <FaPhone className="mr-2 text-xl" />
              <p className="text-sm">+91 7069449963</p>
            </div>
          </div>
        </div>

        <ul className="menu menu-horizontal p-0 space-x-6 text-white">
          <li>
            <button
              onClick={() => openModal('Privacy Policy', privacyPolicyContent)}
              className="hover:text-gray-400"
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal('Terms of Service', termsOfServiceContent)}
              className="hover:text-gray-400"
            >
              Terms of Service
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal('Support', supportContent)}
              className="hover:text-gray-400"
            >
              Support
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal('FAQs', faqsContent)}
              className="hover:text-gray-400"
            >
              FAQs
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-6 text-white text-center">
        <p className="text-sm">Created by <a
  href="https://www.instagram.com/sanjuuu_x18"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm hover:underline"
>
  Sanjay
</a> © {new Date().getFullYear()}</p>
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-semibold">{modalTitle}</h2>
            <div className="mt-4">{modalContent}</div>
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
