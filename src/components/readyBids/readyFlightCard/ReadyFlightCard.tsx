import { useState } from "react";
import { FlightResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import FlightDetails from "./FlightDetails";
import PasangersDetails from "./PasangersDetails";
import { Separator } from "@/components/ui/separator";

interface ReadyFlightCardProps {
  data: FlightResponse;
}

const ReadyFlightCard: React.FC<ReadyFlightCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div dir="rtl" className="">
      <Accordion type="single" collapsible>
        <AccordionItem key={data.id} value={data.id} className="group">
          <AccordionTrigger
            className={`flex flex-col sm:flex-row bg-green-400 p-4 hover:no-underline ${
              isOpen ? "rounded-t-xl" : "rounded-xl"
            }`}
            onClick={handleToggle}
          >
            <div className="sm:w-[300px] text-start">
              <h3 className="mr-4 text-sm sm:text-lg">
                {data.flightDescription}
              </h3>
            </div>
            <div className="flex gap-1">
              <p>חברת תעופה</p>
              <p>:</p>
              <p>{data.airline}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-green-100 rounded-b-lg py-4">
              <FlightDetails data={data} />
              <Separator className="bg-green-400" />
              <PasangersDetails data={data} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReadyFlightCard;
