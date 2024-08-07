import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  TransferCardFields,
  Hotel,
  Room,
  HotelCardFields,
  FlightCardFields,
} from "@/types";
import HotelCard from "./HotelCard";
import TransferCard from "./TransferCard";
import FlightCard from "./FlightCard";
import { useEffect, useState } from "react";
import { useCreateMainBidForm } from "@/api/MainFormApi";
import { formSchema } from "./ZodSchema";
import { imageUrls } from "@/config/separatorUrls";

interface FormFields {
  items: (
    | HotelCardFields
    | TransferCardFields
    | FlightCardFields
    | { id: string; type: "image"; imageUrl: string }
  )[];
}

const MainBidForm: React.FC = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { items: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [hotelData, setHotelData] = useState<
    { selectedHotel: Hotel | null; selectedRooms: Room[] }[]
  >([]);

  // const images = imageUrls
  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[0].url);

  const handleHotelDataChange = (
    index: number,
    data: { selectedHotel: Hotel | null; selectedRooms: Room[] }
  ) => {
    setHotelData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };

  const handleHotelRemove = (index: number) => {
    setHotelData((prevData) => prevData.filter((_, i) => i !== index));
    remove(index);
  };

  const addComponent = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    append({
      id: uuidv4(),
      type: "hotel",
      hotelName: "",
      checkInDate: today,
      checkOutDate: tomorrow,
      hotelDescription: "",
      rooms: [],
      sum: 0,
    } as HotelCardFields);
  };

  const addTransfer = () => {
    append({
      id: uuidv4(),
      type: "transfer",
      transferDate: new Date(),
      time: "00:00",
      from: "",
      to: "",
      numberOfAdults: 0,
      numberOfChildren: 0,
      agentComments: "",
      sum: 0,
    } as TransferCardFields);
  };

  const addFlight = () => {
    append({
      id: uuidv4(),
      type: "flight",
      forthDepartureDate: new Date(),
      forthArrivalDate: new Date(),
      forthFlightNumber: "",
      forthAirline: "",
      forthDepartureAirport: "",
      forthArrivalAirport: "",
      forthStopsNumber: 0,
      forthStopoverAirport1: "",
      forthStopoverAirport2: "",
      forthFlightTime: "00:00",
      forthLandingTime: "00:00",

      backDepartureDate: new Date(),
      backArrivalDate: new Date(),
      backFlightNumber: "",
      backAirline: "",
      backDepartureAirport: "",
      backArrivalAirport: "",
      backStopsNumber: 0,
      backStopoverAirport1: "",
      backStopoverAirport2: "",
      backFlightTime: "00:00",
      backLandingTime: "00:00",

      numberOfAdults: 0,
      numberOfChildren: 0,
      priceForAdult: 0,
      priceForChild: 0,
      agentComments: "",
    } as FlightCardFields);
  };

  const addImageComponent = () => {
    append({
      id: uuidv4(),
      type: "image",
      imageUrl: selectedImageUrl,
    });
  };

  const { createForm, isLoading, isSuccess, error } = useCreateMainBidForm();
  const handeleSumbmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = form.getValues();

    const hotelDataArray = formData.items.map((item, index) => {
      if (item.type === "hotel") {
        const hotelDataEntry = hotelData[index];
        return {
          ...item,
          hotelName: hotelDataEntry.selectedHotel?.hotelName,
          hotelDescription: hotelDataEntry.selectedHotel?.hotelDescription,
          images: hotelDataEntry.selectedHotel?.images,
          rooms: hotelDataEntry.selectedRooms.map((room) => ({
            roomType: room.roomType,
            images: room.images,
            nightPrice: room.nightPrice,
            numberOfRooms: room.numberOfRooms,
          })),
        };
      }
      return item;
    });

    const payload = {
      hotel: hotelDataArray.filter((item) => item.type === "hotel") || [],
      transfer: formData.items.filter((item) => item.type === "transfer") || [],
      flight: formData.items.filter((item) => item.type === "flight") || [],
      image: formData.items.filter((item) => item.type === "image") || [],
    };
    createForm(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Form updated");
    }
    if (error) {
      toast.error("Failed to update form");
    }
  }, [isSuccess, error]);

  console.log(form.getValues().items)
  // console.log(form.getValues().items.map(item => item.id))

  return (
    <FormProvider {...form}>
      <form onSubmit={handeleSumbmit}>
        {fields.map((field, index) =>
          field.type === "hotel" ? (
            <HotelCard
              key={field.id}
              id={field.id}
              index={index}
              onRemove={() => handleHotelRemove(index)}
              onDataChange={handleHotelDataChange}
            />
          ) : field.type === "transfer" ? (
            <TransferCard
              key={field.id}
              id={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ) : field.type === "flight" ? (
            <FlightCard
              key={field.id}
              id={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ) : (
            <div key={field.id} className="image-component">
              <img src={field.imageUrl} alt="Selected" />
              <button
                className="bg-red-400 rounded"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          )
        )}
        <div className="flex flex-col gap-2 mt-12">
          <button
            type="button"
            onClick={addComponent}
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
                className="bg-purple-400 rounded hover:bg-purple-500 p-2  sm:px-36"
              >
                Add Image Component
              </button>
              <select
                className="border border-black rounded"
                value={selectedImageUrl}
                onChange={(e) => setSelectedImageUrl(e.target.value)}
              >
                {imageUrls.map((image, index) => (
                  <option key={index} value={image.url}>
                    {image.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="space-x-8 mt-10">
          <button
            type="submit"
            className="bg-green-300 rounded hover:bg-green-500 p-2"
          >
            {isLoading ? "Submitting..." : "Submit Form"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MainBidForm;
