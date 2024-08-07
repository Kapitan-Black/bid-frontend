import ConfirmationModal from "@/components/ConfirmationModal";
import React, { useState } from "react";

interface ImageSeparator {
  id: string;
  index: number;
  imageUrl: string;
  onRemove: (index: number) => void;
}

const ImageSeparator: React.FC<ImageSeparator> = ({
  id,
  index,
  imageUrl,
  onRemove,
}) => {
      const [showModal, setShowModal] = useState<boolean>(false);


  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = () => {
    onRemove(index)
    setShowModal(false);
  };
    
  return (
    <div key={id} className="relative">
      <img src={imageUrl} alt="Selected" />
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

export default ImageSeparator;
