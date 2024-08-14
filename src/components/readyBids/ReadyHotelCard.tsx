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

interface ReadyHotelCardProps {
  data: HotelResponse;
}

const ReadyHotelCard: React.FC<ReadyHotelCardProps> = ({ data }) => {
  const nights = calculateNights(data.checkInDate, data.checkOutDate);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div dir="rtl" className="">
      <Accordion type="single" collapsible className="">
        <AccordionItem key={data._id} value={data._id}>
          <AccordionTrigger
            className={`flex flex-col md:flex-row bg-sky-400 p-2 sm:p-4 hover:no-underline text-sm sm:text-lg ${
              isOpen ? "rounded-t-xl" : "rounded-xl"
            }`}
            onClick={handleToggle}
          >
            <div>
              <p className="sm:mr-4"> {data.hotelName}</p>
            </div>

            <div className="flex gap-2">
              <span className="flex gap-1">
                <p>{dateFormat(data.checkInDate)}</p>
                <p>-</p>
                <p>{dateFormat(data.checkOutDate)}</p>
              </span>
              <p>({nights}-לילות)</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-sky-50 border p-2 sm:p-4">
            <div className="flex justify-center">
              <ImageCarousel images={data.images} />
            </div>
            <h2 className="text-2xl mb-4 mt-8 text-center font-bold">
              {data.hotelName}
            </h2>
            <div className="bg-sky-100 p-2 rounded-md">
              <div className="flex sm:text-lg gap-2 font-semibold">
                <span className="flex gap-1">
                  <p>{dateFormat(data.checkInDate)}</p>
                  <p>-</p>
                  <p>{dateFormat(data.checkOutDate)}</p>
                </span>

                <p>({nights}-לילות)</p>
              </div>

              <p className="mt-4 sm:text-lg">{data.hotelDescription}</p>

              <div className="flex gap-1 mt-4 text-lg">
                <p>סה׳׳כ:</p>
                <p className="font-semibold">฿{data.sum}</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-2 mt-4">
              {data.rooms.map((room) => (
                <AccordionItem key={room._id} value={room._id}>
                  <AccordionTrigger className="bg-amber-200 rounded p-4 ">
                    <div className="flex gap-2">
                      <p>סוג החדר:</p>
                      <p className="ml-2 font-semibold"> {room.roomType}</p>
                      <p>({room.images.length}תמונות)</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="rounded bg-amber-50 pb-0">
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

                    <div className="flex justify-between mt-4 p-4">
                      <div>
                        <p>סוג חדר</p>
                        <p className="font-semibold text-center">
                          {room.roomType}
                        </p>
                      </div>
                      <div>
                        <p>כמות חדרים</p>
                        <p className="font-semibold text-center">
                          {room.numberOfRooms}
                        </p>
                      </div>
                      <div>
                        <p>מחיר לילה</p>
                        <p className="font-semibold text-center">
                          ฿{room.nightPrice}
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-100 mt-8 p-4 text-center rounded">
                      <p>סה׳׳כ</p>
                      <p className="text-xl font-bold">
                        ฿{room.numberOfRooms * room.nightPrice * nights}
                      </p>
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
