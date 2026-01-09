import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import footerLogo from "/scholar.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-linear-to-b from-slate-900 via-black to-slate-900 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-800">
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex items-center gap-3">
              <img
                src={footerLogo}
                className="w-10 h-10 rounded-lg animate-pulse"
                alt="ScholarStream Logo"
              />
              <h4 className="text-2xl font-bold bg-linear-to-r from-white to-sky-400 bg-clip-text text-transparent">
                ScholarStream
              </h4>
            </div>
            <p className="text-gray-400 leading-relaxed font-medium">
              Empowering ambitious students by bridging the gap to global
              education opportunities. Your future starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-bold text-white text-xl tracking-wide">
              Resources
            </h5>
            <ul className="text-gray-400 flex flex-col gap-3 font-medium">
              <li>
                <Link
                  to="/all-scholarships"
                  className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Find Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  to="/stories"
                  className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-bold text-white text-xl tracking-wide">
              Company
            </h5>
            <ul className="text-gray-400 flex flex-col gap-3 font-medium">
              <li>
                <Link
                  to={"/policy"}
                  className="hover:text-white transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"/terms"}
                  className="hover:text-white transition duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to={"/career"}
                  className="hover:text-white transition duration-300"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-bold text-white text-xl tracking-wide">
              Connect With Us
            </h5>
            <p className="text-gray-400 text-sm">
              Follow our social media for daily updates on new programs.
            </p>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 shadow-lg"
                >
                  <FaXTwitter size={18} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 shadow-lg"
                >
                  <FaLinkedinIn size={18} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-lg"
                >
                  <FaFacebookF size={18} />
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@scholarstream.com"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 shadow-lg"
                >
                  <FaEnvelope size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
          <p>
            © {new Date().getFullYear()} ScholarStream. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Support
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Sitemap
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
