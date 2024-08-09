import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { FlightCardFields } from "@/types";
import ConfirmationModal from "@/components/ConfirmationModal";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface FlightCardProps {
  id: string;
  index: number;
  onRemove: () => void;
}

type FlightCardFieldPath = `items.${number}.${keyof FlightCardFields}`;

const FlightCard: React.FC<FlightCardProps> = ({ id, index, onRemove }) => {
  const { register, control } = useFormContext<{ items: FlightCardFields[] }>();
  const [showModal, setShowModal] = useState<boolean>(false);
 
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };


  const getFieldPath = (
    index: number,
    field: keyof FlightCardFields
  ): FlightCardFieldPath => `items.${index}.${field}`;

  const renderInput = (label: string, field: keyof FlightCardFields) => (
    <div className="flex flex-col">
      <label>{label}:</label>
      <input {...register(getFieldPath(index, field))} className="border p-1" />
    </div>
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = () => {
    onRemove();
    setShowModal(false);
  };

  return (
    <div
      dir="rtl"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={(e) => {
        if (
          e.target instanceof HTMLElement &&
          (e.target.tagName === "BUTTON" ||
            e.target.tagName === "INPUT" ||
            e.target.tagName === "SELECT" ||
            e.target.tagName === "TEXTAREA")
        ) {
          e.stopPropagation();
        }
      }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${id}`}>
          <AccordionTrigger className="flex relative justify-between bg-green-500 rounded-md p-2 sm:p-4 hover:no-underline border-2 hover:border-green-500">
            <h2 className="mr-4">Flight Information</h2>
            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 p-1 rounded-md absolute sm:top-4 sm:left-12 top-2 left-8 sm:text-md text-xs"
              onClick={handleDelete}
            >
              remove
            </button>
          </AccordionTrigger>
          <AccordionContent className="bg-gray-100 rounded-md border p-2 sm:p-4 text-md">
            <div className="space-y-4">
              <div className="flex flex-wrap">
                <div className="w-1/2 p-2">
                  <h2 className="text-xl mb-4">טיסת הלןך</h2>
                  <div className="flex flex-col">
                    <label className="mb-2">תאריך טיסה המראה:</label>
                    <Controller
                      name={getFieldPath(index, "forthDepartureDate")}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          placeholderText="Select date"
                          className="border p-1"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">תאריך טיסה נחיתה:</label>
                    <Controller
                      name={getFieldPath(index, "forthArrivalDate")}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          placeholderText="Select date"
                          className="border p-1"
                        />
                      )}
                    />
                  </div>
                  {renderInput("מספר טיסה ", "forthFlightNumber")}
                  {renderInput("חברת תעופה ", "forthAirline")}
                  {renderInput("שדה תעופה יציאה", "forthDepartureAirport")}
                  {renderInput("שדה תעופה הגעה", "forthArrivalAirport")}
                  {renderInput("מספר עצירות", "forthStopsNumber")}
                  {renderInput("שדה תעופה עצירה1", "forthStopoverAirport1")}
                  {renderInput("שדה תעופה עצירה2", "forthStopoverAirport2")}
                  {renderInput("שעת המראה", "forthFlightTime")}
                  {renderInput("שעת נחיתה", "forthLandingTime")}
                </div>

                <div className="w-1/2 p-2">
                  <h2 className="text-xl mb-4">טיסת חזור</h2>
                  <div className="flex flex-col">
                    <label className="mb-2">תאריך טיסה המראה:</label>
                    <Controller
                      name={getFieldPath(index, "backDepartureDate")}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          placeholderText="Select date"
                          className="border p-1"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">תאריך טיסה נחיתה:</label>
                    <Controller
                      name={getFieldPath(index, "backArrivalDate")}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          placeholderText="Select date"
                          className="border p-1"
                        />
                      )}
                    />
                  </div>
                  {renderInput("מספר טיסה ", "backFlightNumber")}
                  {renderInput("חברת תעופה ", "backAirline")}
                  {renderInput("שדה תעופה יציאה", "backDepartureAirport")}
                  {renderInput("שדה תעופה הגעה", "backArrivalAirport")}
                  {renderInput("מספר עצירות", "backStopsNumber")}
                  {renderInput("שדה תעופה עצירה1", "backStopoverAirport1")}
                  {renderInput("שדה תעופה עצירה2", "backStopoverAirport2")}
                  {renderInput("שעת המראה", "backFlightTime")}
                  {renderInput("שעת נחיתה", "backLandingTime")}
                </div>
              </div>

              {renderInput("מספר מבוגרים", "numberOfAdults")}
              {renderInput("מספר ילדים", "numberOfChildren")}
              {renderInput("מחיר למבוגר", "priceForAdult")}
              {renderInput("מחיר לילד", "priceForChild")}

              <div className="flex flex-col">
                <label className="mb-2">הערות הסוכן:</label>
                <textarea
                  {...register(getFieldPath(index, "agentComments"))}
                  className="border p-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white py-1 px-2 mr-4 rounded hover:bg-red-700 mt-8"
                  onClick={handleDelete}
                >
                  Remove Flight
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default FlightCard;
