import { Divide } from "lucide-react";
import Hero from "../Hero";
import Countdown from "./Countdown";
import BeforeApproved from "./BeforeApproved";

interface Props {
  createDate: string;
  holidayStartDate: string;
  formName: string | undefined;
  isBidApproved: boolean | undefined;
  randomNumber: number | undefined;
}

const ReadyBidHeader: React.FC<Props> = ({
  createDate,
  holidayStartDate,
  formName,
  isBidApproved,
  randomNumber,
}) => {
  return (
    <>
      <Hero />
      {isBidApproved ? (
        <Countdown
          createDate={createDate}
          holidayStartDate={holidayStartDate}
          formName={formName}
          randomNumber={randomNumber}
        />
      ) : (
          <BeforeApproved formName={formName} randomNumber={randomNumber}/>
      )}
    </>
  );
};

export default ReadyBidHeader;
