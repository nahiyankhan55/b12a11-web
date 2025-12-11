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
    <div className="w-full bg-linear-to-b from-black via-black to-sky-950 py-10 sm:px-8 px-5 flex flex-col items-center">
      <div className="flex flex-wrap justify-between items-start gap-5 w-full py-5 border-b border-gray-500">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <img
              src={footerLogo}
              className="w-8 h-8 rounded-md animate-pulse"
              alt="footerLogo"
            />
            <h4 className="text-2xl font-bold text-white">ScholarStream</h4>
          </div>
          <p className="max-w-xs font-medium text-gray-300">
            ScholarStream connects students with global scholarship
            opportunities. Our platform helps you discover programs, compare
            options, and apply easily — making your academic journey smoother
            and more accessible.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h5 className="font-semibold text-white text-xl">Information</h5>
          <ul className="font-medium text-gray-400 flex flex-col items-start gap-1">
            <li>
              <Link
                to={"/about"}
                className="hover:text-white transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Join Us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h5 className="font-semibold text-white text-xl">Social</h5>
          <ul className="font-medium text-gray-400 flex flex-col items-start gap-2 text-xl">
            <li>
              <a href="#" className="items-center flex gap-1 group">
                <span className="p-1 rounded-full bg-white group-hover:text-black duration-300 text-gray-700">
                  <FaXTwitter></FaXTwitter>
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="items-center flex gap-1 group">
                <span className="p-1 rounded-full bg-white group-hover:bg-sky-700 group-hover:text-white text-black duration-300">
                  <FaLinkedinIn></FaLinkedinIn>
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="items-center flex gap-1 group">
                <span className="p-1 rounded-full bg-white group-hover:bg-blue-600 group-hover:text-white text-black duration-300">
                  <FaFacebookF></FaFacebookF>
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="items-center flex gap-1 group">
                <span className="p-1 rounded-full bg-white group-hover:text-red-700 duration-300 text-black">
                  <FaEnvelope></FaEnvelope>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="font-medium text-gray-300 text-center mt-5">
        © ScholarStream. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
