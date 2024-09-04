import ConfirmationModal from "@/components/ConfirmationModal";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ImageSeparator {
  id: string;
  index: number;
  imageUrl: string;
  imageText: string;
  onRemove: (index: number) => void;
}

const ImageSeparator_Update: React.FC<ImageSeparator> = ({
  id,
  index,
  imageUrl,
  onRemove,
  imageText,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = () => {
    onRemove(index);
    setShowModal(false);
  };

  return (
    <div
      key={id}
      className="relative"
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
            e.target.tagName === "TEXTAREA" ||
            // e.target.tagName === "DIV" ||
            e.target.tagName === "H2" ||
            e.target.tagName === "SPAN")
        ) {
          e.stopPropagation();
        }
      }}
    >
      <img src={imageUrl} alt="Selected" className="h-24"/>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-30">
        {imageText}
      </div>
      <button
        className="bg-red-400 hover:bg-red-500 p-1 rounded-md absolute sm:top-4 sm:left-12 top-2 left-8 sm:text-md text-xs"
        type="button"
        onClick={handleDelete}
      >
        Remove
      </button>
      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default ImageSeparator_Update;
