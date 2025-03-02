import React from 'react';
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import sir from '../assets/sir.jpg';

const Footer = () => {
    return (
        <footer className="py-8 mt-10 text-white bg-neutral">
            <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
                <div className="flex items-center mb-6 md:mb-0">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={sir} alt="Profile" />
                        </div>
                    </div>
                    <div className="ml-4">
                        <p className="text-lg font-semibold">Nirmal Vaishnav</p>
                        <a href="mailto:nirmalvaishnav@gmail.com" className="text-sm hover:underline">nirmalvaishnav@gmail.com</a>
                        <div className="flex items-center mt-2">
                            <FaInstagram className="mr-2 text-xl" />
                            <a
                                href="https://www.instagram.com/yourprofile"
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
                    </div>
                </div>

                <ul className="menu menu-horizontal p-0 space-x-6">
                    <li><a className="hover:text-gray-400">Privacy Policy</a></li>
                    <li><a className="hover:text-gray-400">Terms of Service</a></li>
                    <li><a className="hover:text-gray-400">Support</a></li>
                    <li><a className="hover:text-gray-400">FAQs</a></li>
                </ul>
            </div>
            <div className="mt-6 text-center">
                <p className="text-sm">Created by Sanjay © {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
