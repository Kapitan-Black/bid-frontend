
import Countdown from "./Countdown";


interface Props {
    createDate: string;
    flightDate: string
}

const ReadyBidHeader: React.FC<Props> = ({ createDate, flightDate }) => {
  

    return (
        <Countdown createDate={createDate} flightDate={flightDate}/>
  )
}

export default ReadyBidHeader;