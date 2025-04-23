import image1 from "../../../src/assets/parallax.jpg";
import Container from "../../components/Container";
import CareCard from "../../components/CareCard";
import { FiHeart, FiAward, FiUsers, FiPhone } from "react-icons/fi";

const ParallaxBanner = () => {
  return (
    <div
      className=" bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <div className="min-h-[600px] flex items-center justify-center  text-white   bg-black/50 backdrop-blur-sm">
        <div className=" text-justify py-32 max-w-[1400px]">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <Container>
            <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2  gap-14">
              <CareCard
                image={<FiHeart className="w-8 h-8 text-white mx-auto" />}
                imageStyle="w-32 mx-auto bg-red-500 p-2 rounded-full "
                heading="Loving Care"
                paragraph="All our pets receive the highest standard of care and attention."
                tailwindStayle="text-center bg-blur"
              />
              <CareCard
                image={<FiAward className="w-8 h-8 text-white mx-auto" />}
                imageStyle="w-32 mx-auto border bg-base-200 p-2 rounded-full"
                heading="Quality Assurance"
                paragraph="Thorough health checks and vaccinations for all our pets."
                tailwindStayle="text-center"
              />
              <CareCard
                image={<FiUsers className="w-8 h-8 text-white mx-auto" />}
                imageStyle="w-32 mx-auto border bg-red-500 p-2 rounded-full"
                heading="Expert Team"
                paragraph="Professional staff with years of experience in pet care."
                tailwindStayle="text-center"
              />
               <CareCard
                image={<FiPhone className="w-8 h-8 text-white mx-auto" />}
                imageStyle="w-32 mx-auto border bg-red-500 p-2 rounded-full"
                heading="Lifetime Support"
                paragraph="Ongoing assistance and advice for all pet parents."
                tailwindStayle="text-center"
              />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBanner;