import { ImageResponse } from "@/types/mainBidFormResponse";

interface ReadyImageCardProps {
    data: ImageResponse
}

const ReadyImageCard:React.FC<ReadyImageCardProps> = ({data}) => {
    return (
      <div className="h-[60px] sm:h-[80px]">
        <img className="h-full rounded" src={data.imageUrl} alt="Bid Image" />
      </div>
    );
}

export default ReadyImageCard;