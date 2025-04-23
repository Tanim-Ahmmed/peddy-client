
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdPets } from "react-icons/md";

const Footer = () => {
  return (
  
      <footer className="bg-neutral text-neutral">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2">
              <h1 className="max-w-2x text-xl font-semibold tracking-tight text-gray-200 xl:text-2xl ">
                Subscribe our newsletter to get update.
              </h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input
                  id="email"
                  type="text"
                  className="px-4 py-2 text-black bg-white border rounded-md  focus:border-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-300"
                  placeholder="Email Address"
                />

                <div className="ml-0 md:ml-2">
                  <Button name={"Subscribe"}></Button>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-200 ">Quick Link</p>

              <div className="flex flex-col items-start mt-5 space-y-2 font-medium">
                <NavLink to={"/"} className="text-gray-200">
                  Home
                </NavLink>
                <NavLink to={"/dashboard"} className="text-gray-200">
                  Dashboard
                </NavLink>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-200 ">Courses</p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <NavLink to={"/"} className="text-gray-200">
                  Courses
                </NavLink>

                <NavLink to={"/"} className="text-gray-200">
                  Detailes
                </NavLink>
                <NavLink to={"/"} className="text-gray-200">
                  Membership
                </NavLink>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-8" />

          <div className="flex items-center justify-between ">
            <Link to={"/"} className="text-gray-200 flex gap-3 text-5xl">
            <MdPets className="text-indigo-600 " /> <span className="sm:flex hidden">Paddy</span>
            </Link>

            <div className="flex -mx-2 justify-between gap-4 text-3xl ">
              <Link >
                <FaFacebookF className="text-indigo-500 bg-white rounded-full p-1"></FaFacebookF>
              </Link>
              <Link >
                <FaLinkedinIn className="text-indigo-500 bg-white rounded-full p-1"></FaLinkedinIn>
              </Link>
              <Link >
                <FaGithub className="text-white"></FaGithub>
              </Link>
            </div>
          </div>
          <p className=" pt-8 text-center text-[14px] font-medium text-slate-700 font-roboto">
            &copy; Copyright 2025. All Rights Reserved. By{" "}
            <Link
             to={"/"}
              className="underline text-primary"
            >
              Wixerd
            </Link>
          </p>
        </div>
      </footer>
  );
};

export default Footer;
