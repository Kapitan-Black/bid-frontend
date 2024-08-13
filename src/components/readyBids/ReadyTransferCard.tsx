import { TransferResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";


interface ReadyTransferCardProps {
  data: TransferResponse;
}

const ReadyTransferCard:React.FC<ReadyTransferCardProps> = ({data}) => {
    return (
      <div dir="rtl" className="">
        <Accordion type="single" collapsible>
          <AccordionItem key={data.id} value={data.id}>
            <AccordionTrigger className="bg-yellow-300 rounded-xl hover:no-underline">
              <h3 className="mr-4">{data.transferDescription}</h3>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
}

export default ReadyTransferCard;