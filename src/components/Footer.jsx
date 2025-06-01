import {
    FaFacebookF,
    FaTwitter,
    FaGoogle,
    FaInstagram,
    FaLinkedin,
    FaGithub,
    FaHome
  } from 'react-icons/fa';
  import { FaEnvelope, FaPhone, FaPrint  } from 'react-icons/fa6';
import Tooltip from './Tooltip';

  
  const Footer = () => {
    return (
      <footer className="w-full mt-10 bg-white text-gray-700 shadow-inner font-serif">
        {/* Social media bar */}
        <div className="w-full relative h-16 bg-gray-500 border-b-2 rounded-sm text-white px-4 py-3 flex flex-col md:flex-row items-center gap-3">
          <span className="text-center md:text-left text-sm font-medium">
            Connect with ReBook Hub on social networks:
          </span>
          {/* <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-gray-200 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaGoogle /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaGithub /></a>
          </div> */}
           <div  className='absolute right-[12rem]'>
           <Tooltip />
           </div>
        </div>

       
  
        {/* Footer content */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h6 className="uppercase font-bold text-green-600 mb-4">ReBook Hub</h6>
              <hr className="mb-6 w-[6rem] -mt-[0.5rem]  border-t-2 border-green-500" />
              <p className="text-[0.82rem] justify-center">
                ReBook Hub is a trusted second-hand book marketplace helping readers buy and sell books with ease. Save money, save trees, share knowledge.
              </p>
            </div>
  
            {/* Explore */}
            <div>
              <h6 className="uppercase font-bold text-green-600 mb-4">Explore</h6>
              <hr className="mb-6 w-[6rem] -mt-[0.5rem]  border-t-2 border-green-500" />
              <ul className="space-y-2 text-sm">
                <li><a href="/books/Romance" target='_blank' className="hover:underline">Browse Categories</a></li>
                <li><a href="#trending_books" className="hover:underline">Trending Books</a></li>
                <li><a href="/dashboard/add-book" target='_blank' className="hover:underline">Sell Your Book</a></li>
                <li><a href="/about" target='_blank' className="hover:underline">About Us</a></li>
              </ul>
            </div>
  
            {/* Useful Links */}
            <div>
              <h6 className="uppercase font-bold text-green-600 mb-4">Useful Links</h6>
              <hr className="mb-6 w-[6rem] -mt-[0.5rem]  border-t-2 border-green-500" />
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" target='_blank' className="hover:underline">Your Account</a></li>
                <li><a href="/faq" className="hover:underline">FAQs</a></li>
                <li><a  href="/shipping" className="hover:underline">Shipping & Delivery</a></li>
                <li><a href="/support" className="hover:underline">Customer Support</a></li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h6 className="uppercase font-bold text-green-600 mb-4">Contact</h6>
              <hr className="mb-6 w-[6rem] -mt-[0.5rem]  border-t-2 border-green-500" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><FaHome /> Hyderabad, Telangana, India</li>
                <li className="flex items-center gap-2"><FaEnvelope /> support@rebookhub.com</li>
                <li className="flex items-center gap-2"><FaPhone /> +91 8688338315</li>
                <li className="flex items-center gap-2"><FaPrint /> +91 98765 43211</li>
              </ul>
            </div>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="bg-gray-100 text-center text-sm py-3 text-gray-600">
          © {new Date().getFullYear()} <span className="font-semibold">ReBook Hub</span>. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  