import { HotelResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ImageCarousel from "../ImageCarousel";
import SmallCarousel from "../SmallCarousel";
import { calculateNights, dateFormat } from "@/config/utils";
import { useState } from "react";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import { RiHotelFill } from "react-icons/ri";
import StarRating from "../StarRaiting";

interface ReadyHotelCardProps {
  data: HotelResponse;
}

const ReadyHotelCard: React.FC<ReadyHotelCardProps> = ({ data }) => {
  const nights = calculateNights(data.checkInDate, data.checkOutDate);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };
  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  return (
    <div dir="rtl" className="">
      <Accordion type="single" collapsible className="">
        <AccordionItem key={data._id} value={data._id}>
          <AccordionTrigger
            className={`flex flex-col lg:flex-row bg-gradient-to-r from-customYellow2 to-customYellow1  text-black font-normal p-2 sm:p-4 hover:no-underline text-sm sm:text-lg border-2 hover:border-yellow-400 ${
              isOpen1 ? "rounded-t-full" : "rounded-full"
            }`}
            onClick={handleToggle1}
          >
            <div className="flex items-center gap-2 sm:mr-4 md:w-[400px]">
              <RiHotelFill />
              <p className="sm:mr-4"> {data.hotelName}</p>
            </div>

            <div className="flex gap-2">
              <span className="flex gap-1">
                <p>{dateFormat(data.checkInDate)}</p>
                <p>-</p>
                <p>{dateFormat(data.checkOutDate)}</p>
              </span>
              <p>({nights} לילות)</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-yellow-50 border p-2 sm:p-4">
            <div className="flex justify-center">
              <ImageCarousel images={data.images} />
            </div>
            <h2 className="text-2xl mb-4 mt-8 text-center">{data.hotelName}</h2>
            <div className="bg-yellow-100 p-2 rounded-md">
              <div className="flex justify-center">
                <p className="mt-4 sm:text-lg text-center">{data.hotelDescription}</p>
              </div>


            

              <div className="flex flex-col md:flex-row sm:justify-between sm:text-lg gap-2 mr-6 mt-4">
                <span className="flex justify-center gap-1">
                  <p>{dateFormat(data.checkInDate)}</p>
                  <p>-</p>
                  <p>{dateFormat(data.checkOutDate)}</p>
                  <p>({nights} לילות)</p>
                </span>

                <span className="flex justify-center ml-6 ">
                  <StarRating star={data.stars} />
                </span>
              </div>

              <div className="flex justify-center gap-1 mt-4 text-lg mr-6">
                <p>סה׳׳כ:</p>
                <p className="font-semibold">฿{data.sum}</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-2 mt-4">
              {data.rooms.map((room) => (
                <AccordionItem key={room._id} value={room._id}>
                  <AccordionTrigger
                    onClick={handleToggle2}
                    className="bg-yellow-300 rounded-2xl p-4 sm:text-lg hover:no-underline hover:bg-yellow-400"
                  >
                    <div className="flex gap-2">
                      <div className="flex flex-col sm:flex-row sm:gap-2 sm:w-[400px]">
                        <p>סוג החדר:</p>
                        <p className="ml-2"> {room.roomType}</p>
                      </div>

                      <div className="flex hover:underline">
                        <p className="mr-8">לחצו כאן לפרטי החדר</p>
                        {isOpen2 ? (
                          <ArrowBigUpDash className="mt-1 hidden sm:block" />
                        ) : (
                          <ArrowBigDownDash className="mt-1 hidden sm:block" />
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="rounded pb-0">
                    <SmallCarousel
                      images={room.images}
                      slidesToShow={room.images.length > 2 ? 3 : 1}
                      responsive={[
                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 1,
                          },
                        },
                      ]}
                    />

                    <div className="flex justify-center items-center text-lg mt-8">
                      <p className="w-2/3 text-center">
                        {room.roomDescription}
                      </p>
                    </div>

                    <div className="bg-yellow-100 flex flex-col sm:flex-row justify-between rounded-lg mt-8 sm:text-lg">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-20 m-2 mr-4">
                        <div className="flex flex-row sm:flex-col gap-8 sm:gap-4">
                          <p>סוג חדר</p>
                          <p className="font-semibold text-center">
                            {room.roomType}
                          </p>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-8 sm:gap-4">
                          <p>כמות חדרים</p>
                          <p className="font-semibold text-center">
                            {room.numberOfRooms}
                          </p>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-8 sm:gap-4">
                          <p>מחיר לילה</p>
                          <p className="font-semibold text-center ">
                            ฿{room.nightPrice}
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-200 p-4 md:px-16 lg:px-36 text-center rounded">
                        <p>סה׳׳כ</p>
                        <p className="text-xl font-bold">
                          ฿{room.numberOfRooms * room.nightPrice * nights}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReadyHotelCard;
