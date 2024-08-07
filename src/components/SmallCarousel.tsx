import React from "react";
import Slider from "react-slick";

interface CarouselProps {
  images: string[] | undefined;
  slidesToShow?: number;
  responsive?: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll?: number;
    };
  }[];
}


const SmallCarousel: React.FC<CarouselProps> = ({
  images = [],
  slidesToShow = 1,
  responsive = [],
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Adjust this value based on your definition of small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      ...responsive,
    ],
  };

  return (
    <div className="carousel-container mx-auto my-4 w-full max-w-7xl">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide flex items-center px-1 justify-center h-[180px] bg-gray-200 rounded-lg shadow-lg"
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SmallCarousel;
