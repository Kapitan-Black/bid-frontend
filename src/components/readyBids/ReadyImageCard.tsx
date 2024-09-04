import { ImageResponse } from "@/types/mainBidFormResponse";

interface ReadyImageCardProps {
    data: ImageResponse
}

const ReadyImageCard: React.FC<ReadyImageCardProps> = ({ data }) => {
    return (
        <div className="h-[60px] sm:h-[100px] relative">
            <img className="h-full rounded-lg" src={data.imageUrl} alt="Bid Image" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-30 rounded-lg">
                {data.description}
            </div>
        </div>
    );
}

export default ReadyImageCard;
