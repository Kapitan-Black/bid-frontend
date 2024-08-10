import React, { useEffect, useState } from "react";
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
  ImageComponent,
} from "../../../types/types";
import SortableList from "./SortableList";
import FormActions from "./FormActions";
import { useCreateMainBidForm } from "@/api/MainFormApi";
import { formSchema } from "../../mainBidForm/ZodSchema"
import { SeparatorUrls } from "@/config/separatorUrls";



export interface FormFields {
  formName: string;
  items: (
    | HotelCardFields
    | TransferCardFields
    | FlightCardFields
    | ImageComponent
  )[];
}



const MainBidForm: React.FC = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { items: [] },
  });
    
    const [selectedImageUrl, setSelectedImageUrl] = useState(
      SeparatorUrls[0].url
    );


  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [hotelData, setHotelData] = useState<
    { selectedHotel: Hotel | null; selectedRooms: Room[] }[]
      >([]);
    

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
      agentComments: "",
      sum: 0,
    } as TransferCardFields);
  };

  const addFlight = () => {
    append({
      id: uuidv4(),
      type: "flight",
      DepartureDate: new Date(),
      ArrivalDate: new Date(),
      FlightNumber: "",
      Airline: "",
      DepartureAirport: "",
      ArrivalAirport: "",
      StopsNumber: 0,
      StopoverAirport1: "",
      StopoverAirport2: "",
      FlightTime: "00:00",
      LandingTime: "00:00",

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

  const handleSumbmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const idArray = formData.items.map((item) => item.id);

    const payload = {
      formName: formData.formName,
      hotel: hotelDataArray.filter((item) => item.type === "hotel") || [],
      transfer: formData.items.filter((item) => item.type === "transfer") || [],
      flight: formData.items.filter((item) => item.type === "flight") || [],
      image: formData.items.filter((item) => item.type === "image") || [],
      idArray,
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

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSumbmit}>
        <div className="flex flex-row-reverse justify-center mb-12">
          <label htmlFor="formName">:שם ההצעה</label>
          <input
            id={"formName"}
            className="border border-black"
            {...form.register("formName")}
          />
        </div>

        <SortableList
          fields={fields}
          move={move}
          handleHotelRemove={handleHotelRemove}
          handleHotelDataChange={handleHotelDataChange}
          remove={remove}
        />

        <FormActions
          addComponent={addComponent}
          addTransfer={addTransfer}
          addFlight={addFlight}
                  addImageComponent={addImageComponent}
                  selectedImageUrl={selectedImageUrl}
                  setSelectedImageUrl={setSelectedImageUrl}
        />

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
