import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  handleRemoveImage?: (index: number) => void;
  showDeleteButtons?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  handleRemoveImage,
  showDeleteButtons,
}) => {

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-slick-prev`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <span>
        <ArrowBigRight/>
        </span>
      </div>
    );
  };
  
  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
      className={`${className} custom-slick-next`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      >
        <span>
      <ArrowBigLeft/>
        </span>
      </div>
    );
  };
  const settings = {
    dots: true,
    infinite: images.length > 1, // Only allow infinite scroll if more than 1 image
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    rtl: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="carousel-container w-full px-4">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="rounded-md object-cover h-[500px] w-full block"
            />
            {showDeleteButtons && handleRemoveImage && (
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
