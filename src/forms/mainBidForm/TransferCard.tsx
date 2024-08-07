import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { Controller, useFormContext } from "react-hook-form";
import { TransferCardFields } from "@/types";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import ConfirmationModal from "@/components/ConfirmationModal";

interface AttractionCardProps {
  id: string;
  index: number;
  onRemove: () => void;
}

type AttractionFieldPath = `items.${number}.${keyof TransferCardFields}`;

const TransferCard: React.FC<AttractionCardProps> = ({
  id,
  index,
  onRemove,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { register, control } = useFormContext<{
    items: TransferCardFields[];
  }>();

  function getFieldPath(
    index: number,
    field: keyof TransferCardFields
  ): AttractionFieldPath {
    return `items.${index}.${field}`;
  }

  const renderInput = (label: string, field: keyof TransferCardFields) => (
    <div className="flex flex-col">
      <label>{label}:</label>
      <Input {...register(getFieldPath(index, field))} className="border" />
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
    <div className="mb-4" dir="rtl">
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${id}`}>
          <AccordionTrigger className="relative bg-yellow-400 rounded-md p-2 sm:p-4 hover:no-underline border-2 hover:border-sky-500">
            Transfer Information
            <div
              className="bg-red-400 hover:bg-red-500 p-1 rounded-md absolute sm:top-4 sm:left-12 top-2 left-8 sm:text-md text-xs"
              onClick={handleDelete}
            >
              remove
            </div>
          </AccordionTrigger>
          <AccordionContent className="border">
            <div className="bg-gray-100 p-4">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col sm:w-1/2">
                  <div className="mb-8">
                    <label className="mb-2"> תאריך המעבר:</label>
                    <Controller
                      name={getFieldPath(index, "transferDate")}
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
                  {renderInput("שעת הנסיע", "time")}
                  {renderInput("מאיפה", "from")}
                  {renderInput(" לאן", "to")}
                </div>
                <div className="flex flex-col sm:w-1/2">
                  {" "}
                  {renderInput("כמןת מבוגרים", "numberOfAdults")}
                  {renderInput("כמות ילדים", "numberOfChildren")}
                  {renderInput("הערות סוכן ", "agentComments")}
                  {renderInput("מחיר", "sum")}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 mt-4"
                  onClick={handleDelete}
                >
                  Remove
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

export default TransferCard;
