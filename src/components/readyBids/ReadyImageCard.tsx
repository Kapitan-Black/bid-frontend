import { dateFormat } from "@/config/utils";
import { ImageResponse } from "@/types/mainBidFormResponse";

interface ReadyImageCardProps {
  data: ImageResponse;
}

const ReadyImageCard: React.FC<ReadyImageCardProps> = ({ data }) => {
  return (
    <div className="h-[80px] sm:h-[100px] relative">
      <img className="h-full rounded-lg" src={data.imageUrl} alt="Bid Image" />

      <div
        dir="rtl"
        className="absolute top-0 left-0 rounded-lg w-full h-full flex items-center justify-center text-white sm:text-xl bg-black bg-opacity-30"
      >
        <p className="flex justify-center text-lg sm:text-2xl">{data.description}</p>

        {/* <div className="sm:space-y-2">
          <p className="flex justify-center">{data.description}</p>
          <div className="flex">
            <p className="w-28">מהתאריך:</p>
            <p>{dateFormat(data.start)}</p>
          </div>
          <div className="flex">
            <p className="w-28">עד התאריך:</p>
            <p>{dateFormat(data.end)}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ReadyImageCard;
