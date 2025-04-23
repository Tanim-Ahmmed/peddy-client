import { Link } from "react-router-dom";
import bg from "../assets/hero.jpg"
import Button from "../Pages/Shared/Button";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          `url(${bg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
      <div className="max-w-lg ">
          <h1 className="mb-5 text-5xl font-bold"> Find Your Perfect Pet! </h1>
          <p className="mb-5">
            Give a loving home to a rescued pet and change a life forever!  
            Every pet deserves a second chance. Adopt today! 
          </p>
          <Link
          className="flex justify-center"
            to="/login"
          >
            <Button name="Adopt Now"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
