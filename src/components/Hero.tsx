import hero from "../assets/HeroToursSite2.png";
import logo from "../assets/logo-thailand-sababa1.png";


const Hero = () => {
  return (
    <div className=" sm:-mx-10 -mx-2">
      <img src={hero} className="w-full h-[500px] object-cover" />
      <img
        src={logo}
        className="absolute sm:w-[500px] sm:h-[400px] w-[250px] top-[250px] sm:top-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Hero;
