import hero from "../assets/HeroToursSite2.png";
import logo from "../assets/logo-thailand-sababa1.png";


const Hero = () => {
  return (
    <div className=" sm:-mx-12">
      <img src={hero} className="w-full h-[500px] object-cover" />
      <img
        src={logo}
        className="absolute sm:w-[300px] w-[200px] top-1/3 sm:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Hero;
