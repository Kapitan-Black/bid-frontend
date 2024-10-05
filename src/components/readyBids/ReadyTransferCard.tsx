import { TransferResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { dateFormat } from "@/config/utils";
import { useState } from "react";
import transfer_icon from "../../assets/transfer-icon.png"

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
            className={`bg-gradient-to-r from-blueSea to-blueSky  text-black font-normal hover:no-underline flex flex-col sm:flex-row p-4 border-2 hover:border-blue-300 ${
              isOpen ? "rounded-t-full" : "rounded-full"
            }`}
            onClick={handleToggle}
          >
            <div className="flex items-center justify-start ml-8 md:w-[400px]">
              {/* <span className="hidden md:block w-[30px]"> */}
              <span className=" w-[30px]">
                <img src={transfer_icon} />
              </span>
              <h3 className="mr-4 text-sm sm:text-lg">
                {data.transferDescription}
              </h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-sky-100 p-4 space-y-4">
              <div className="flex flex-col sm:flex-row justify-center sm:gap-80">
                <div>
                  <p className="underline">מסלול הנסיעה:</p>
                  <p>מ{data.from}</p>
                  <p>ל{data.to}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="underline">תאריך ההסעה:</p>
                    <p>{dateFormat(data.transferDate)}</p>
                  </div>
                  <div className="flex gap-1">
                    <p>שעת איסוף:</p>
                    <p>{data.departureTime}</p>
                  </div>
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
