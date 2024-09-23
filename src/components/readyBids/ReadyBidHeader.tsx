import Hero from "../Hero";
import Countdown from "./Countdown";

interface Props {
  createDate: string;
  flightDate: string;
  formName: string | undefined;
}

const ReadyBidHeader: React.FC<Props> = ({
  createDate,
  flightDate,
  formName,
}) => {
  return (
    <>
      <Hero />
      <Countdown
        createDate={createDate}
        flightDate={flightDate}
        formName={formName}
      />
    </>
  );
};

export default ReadyBidHeader;
