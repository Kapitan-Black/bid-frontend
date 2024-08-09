import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./DragElement";


interface Element {
  id: string;
  input1: string;
  input2: string;
  input3: string;
}

const Drag: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));

  const addElement = () => {
    const newElement: Element = {
      id: `element-${elements.length}`,
      input1: "",
      input2: "",
      input3: "",
    };
    setElements([...elements, newElement]);
  };

  const handleInputChange = (
    id: string,
    inputName: keyof Element,
    value: string
  ) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, [inputName]: value } : el))
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={addElement}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Element
      </button>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={elements.map((el) => el.id)}
          strategy={verticalListSortingStrategy}
        >
          {elements.map((element) => (
            <SortableItem
              key={element.id}
              id={element.id}
              element={element}
              handleInputChange={handleInputChange}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Drag;