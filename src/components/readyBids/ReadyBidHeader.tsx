import Hero from "../Hero";
import Countdown from "./Countdown";

interface Props {
  createDate: string;
  holidayStartDate: string;
  formName: string | undefined;
}

const ReadyBidHeader: React.FC<Props> = ({
  createDate,
  holidayStartDate,
  formName,
}) => {
  return (
    <>
      <Hero />
      <Countdown
        createDate={createDate}
        holidayStartDate={holidayStartDate}
        formName={formName}
      />
    </>
  );
};

export default ReadyBidHeader;
