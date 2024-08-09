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
} from "@/types";
import HotelCard from "./HotelCard";
import TransferCard from "./TransferCard";
import FlightCard from "./FlightCard";
import { useCreateMainBidForm } from "@/api/MainFormApi";
import { formSchema } from "./ZodSchema";
import { SeparatorUrls } from "@/config/separatorUrls";
import ImageSeparator from "./ImageSeparatorCard";

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface FormFields {
  formName: string;
  items: (
    | HotelCardFields
    | TransferCardFields
    | FlightCardFields
    | { id: string; type: "image"; imageUrl: string }
  )[];
}

const SortableItem: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4"
    >
      {children}
    </div>
  );
};

const MainBidForm: React.FC = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { items: [] },
  });

  const {
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [hotelData, setHotelData] = useState<
    { selectedHotel: Hotel | null; selectedRooms: Room[] }[]
  >([]);

  const [selectedImageUrl, setSelectedImageUrl] = useState(
    SeparatorUrls[0].url
  );

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

  

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  console.log(form.getValues().items)

  return (
    <FormProvider {...form}>
      <form onSubmit={handeleSumbmit}>
        <div className="flex flex-row-reverse justify-center mb-12">
          <label htmlFor="formName">:שם ההצעה</label>
          <input
            id={"formName"}
            className="border border-black"
            {...form.register("formName")}
          />
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={fields.map((field) => field.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {fields.map((field, index) => (
                <SortableItem key={field.id} id={field.id}>
                  {field.type === "hotel" ? (
                    <HotelCard
                      id={field.id}
                      index={index}
                      onRemove={() => handleHotelRemove(index)}
                      onDataChange={handleHotelDataChange}
                    />
                  ) : field.type === "transfer" ? (
                    <TransferCard
                      id={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                    />
                  ) : field.type === "flight" ? (
                    <FlightCard
                      id={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                    />
                  ) : (
                    <ImageSeparator
                      id={field.id}
                      index={index}
                      imageUrl={field.imageUrl}
                      onRemove={remove}
                    />
                  )}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>

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
