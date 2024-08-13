
import { SeparatorUrls } from "@/config/separatorUrls";

const FormActions: React.FC<{
  addHotel: () => void;
  addTransfer: () => void;
  addFlight: () => void;
    addImageComponent: () => void;
    selectedImageUrl: string;
    setSelectedImageUrl: React.Dispatch<React.SetStateAction<string>>
}> = ({ addHotel, addTransfer, addFlight, addImageComponent, setSelectedImageUrl, selectedImageUrl }) => {
//   const [selectedImageUrl, setSelectedImageUrl] = useState(
//     SeparatorUrls[0].url
//   );

  return (
    <div className="flex flex-col gap-2 mt-12">
      <button
        type="button"
        onClick={addHotel}
        className="bg-blue-300 rounded hover:bg-blue-500 p-2"
      >
        Add Hotel Component
      </button>
      <button
        type="button"
        onClick={addTransfer}
        className="bg-yellow-300 rounded hover:bg-yellow-500 p-2"
      >
        Add Transfer Component
      </button>
      <button
        type="button"
        onClick={addFlight}
        className="bg-green-300 rounded hover:bg-green-500 p-2"
      >
        Add Flight Component
      </button>

      <div className="bg-purple-300 rounded">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addImageComponent}
            className="bg-purple-400 rounded hover:bg-purple-500 p-2 sm:px-36"
          >
            Add Image Component
          </button>
          <select
            className="border border-black rounded"
            value={selectedImageUrl}
            onChange={(e) => setSelectedImageUrl(e.target.value)}
          >
            {SeparatorUrls.map((image, index) => (
              <option key={index} value={image.url}>
                {image.description}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormActions;
