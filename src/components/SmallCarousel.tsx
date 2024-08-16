import React from "react";
import Slider from "react-slick";
import "./carousel.css"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

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

   const CustomPrevArrow = (props: any) => {
     const { className, style, onClick } = props;
     return (
       <div
         className={`${className} custom-slick-prev`}
         style={{ ...style, display: "block" }}
         onClick={onClick}
       >
         <span>
           <ArrowBigRight />
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
           <ArrowBigLeft />
         </span>
       </div>
     );
   };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
    <div className="carousel-container mx-auto my-4 w-full max-w-7xl px-6">
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
