import { MdPets } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import useAuth from "../../hooks/useAuth";
// import Mode from "./Mode";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-pets">All Pets</NavLink>
      </li>
      <li>
        <NavLink to="/pet-food">Pet Food</NavLink>
      </li>
      <li>
        <details>
          <summary>My Profile</summary>
          <ul className="p-2 bg-[#1A1A2E]">
            <li>
              <NavLink to="/add-pets">Add Pets</NavLink>
            </li>
            <li>
              <NavLink to="/my-pets">My Pets</NavLink>
            </li>
            <li>
              <NavLink to="/wishlist">Wish List</NavLink>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <div className="bg-[#1A1A2E] fixed top-0 left-0 right-0 z-50 shadow-lg text-white py-3">
      {/* Container for Navbar Content */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16">
        {/* Navbar Start */}
        <div className="flex items-center">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1A1A2E] rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="text-gray-200 flex gap-3 text-3xl">
            <MdPets className="text-indigo-600 " /> Paddy
          </Link>

        
         <div>
          {
            user && user?.email ? <h2 className="pl-10">{user.email}</h2> : ''
          }
         </div>
          
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-4">
          {/* <Mode /> */}

          {user && user?.email ? (
           <button onClick={logOut}>
           <Button name="LogOut" />
         </button>         
          ) : (
            <Link to="/login">
              <Button name="LogIn"></Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
