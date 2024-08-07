import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  };

  return (
    <div className="carousel-container w-full max-w-[1000px]">
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
