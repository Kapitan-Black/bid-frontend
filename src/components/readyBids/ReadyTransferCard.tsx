import { TransferResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { dateFormat } from "@/config/utils";
import { useState } from "react";
import { FaCar } from "react-icons/fa6";


interface ReadyTransferCardProps {
  data: TransferResponse;
}

const ReadyTransferCard: React.FC<ReadyTransferCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div dir="rtl" className="">
      <Accordion type="single" collapsible>
        <AccordionItem key={data.id} value={data.id}>
          <AccordionTrigger
            className={`bg-gradient-to-r from-rose-400 to-stone-500  text-white hover:no-underline flex flex-col sm:flex-row p-4 border-2 hover:border-rose-400 ${
              isOpen ? "rounded-t-full" : "rounded-full"
            }`}
            onClick={handleToggle}
          >
            <div className="flex items-center ml-8 sm:mr-4 ">
              <FaCar />
              <h3 className="mr-4 text-sm sm:text-lg ">
                {data.transferDescription}
              </h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-yellow-100 p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div>
                  <p className="underline">מסלול הנסיע:</p>
                  <p>מ{data.from}</p>
                  <p>ל{data.to}</p>
                </div>
                <div>
                  <p className="underline">תאריך ההסעה:</p>
                  <p>{dateFormat(data.transferDate)}</p>
                </div>
                <div className="flex gap-1">
                  <p>שעת הנסיע:</p>
                  <p>{data.departureTime}</p>
                </div>
                <div className="flex gap-1">
                  <p>שעת הגעה משוערת:</p>
                  <p>{data.arrivalTime}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex gap-1">
                  <p>הרכב הנוסעים:</p>
                  <p>{data.passengerComposition}</p>
                </div>
                <div className="flex gap-1 font-bold">
                  <p>מחיר:</p>
                  <p>฿{data.sum}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReadyTransferCard;
