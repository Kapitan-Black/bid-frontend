import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Element {
  id: string;
  input1: string;
  input2: string;
  input3: string;
}

interface SortableItemProps {
  id: string;
  element: Element;
  handleInputChange: (
    id: string,
    inputName: keyof Element,
    value: string
  ) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  element,
  handleInputChange,
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
      className="mb-4 p-4 bg-gray-100 rounded shadow-md"
    >
      <div className="mb-2">
        <label className="block text-gray-700">Input 1</label>
        <input
          type="text"
          value={element.input1}
          onChange={(e) => handleInputChange(id, "input1", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Input 2</label>
        <input
          type="text"
          value={element.input2}
          onChange={(e) => handleInputChange(id, "input2", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Input 3</label>
        <input
          type="text"
          value={element.input3}
          onChange={(e) => handleInputChange(id, "input3", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default SortableItem;
