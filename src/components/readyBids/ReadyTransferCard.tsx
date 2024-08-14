import { TransferResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { dateFormat } from "@/config/utils";
import { useState } from "react";

interface ReadyTransferCardProps {
  data: TransferResponse;
}

const ReadyTransferCard: React.FC<ReadyTransferCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div dir="rtl" className="">
      <Accordion type="single" collapsible>
        <AccordionItem key={data.id} value={data.id}>
          <AccordionTrigger
            className={`bg-yellow-300 p-4 hover:no-underline flex flex-col sm:flex-row ${
              isOpen ? "rounded-t-xl" : "rounded-xl"
            }`}
            onClick={handleToggle}
          >
            <h3 className="mr-4 text-sm sm:text-lg ">
              {data.transferDescription}
            </h3>
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
