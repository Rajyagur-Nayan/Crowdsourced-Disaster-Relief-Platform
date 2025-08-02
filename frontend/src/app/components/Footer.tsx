import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white py-8 px-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Company
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Resources
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Legal
          </a>
        </div>
        <div className="flex space-x-4">
          {/* Social media icons - using simple text for now, could be Lucide icons or SVGs */}
          <a href="#" className="hover:text-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-17 17a18.9 18.9 0 0 1-5-1c1.7 1.2 5 2 8 2 9 0 10.6-8.6 10.6-10.6v-.7c.9-.6 1.6-1.3 2.2-2.1z" />
            </svg>
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
