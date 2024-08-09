import RemoveButton from "@/components/RemoveButton";
import SmallCarousel from "@/components/SmallCarousel";
import { Room } from "@/types";
import { useEffect, useState } from "react";

interface HotelRoomCardProps {
  //   index: number;
  onRemove: () => void;
  rooms: Room[] | undefined;
  onRoomDataChange: (roomData: Room) => void;
}

const HotelslRoomCard: React.FC<HotelRoomCardProps> = ({
  //   index,
  onRemove,
  rooms,
  onRoomDataChange,
}) => {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [nightPrice, setNightPrice] = useState<number | null>(null);
  const [numberOfRooms, setNumberOfRooms] = useState<number | null>(null);

  useEffect(() => {
    setRoomData(rooms || []);
  }, [rooms]);

  useEffect(() => {
    if (selectedRoom) {
      onRoomDataChange({
        ...selectedRoom,
        nightPrice: nightPrice ?? 0,
        numberOfRooms: numberOfRooms ?? 1 
      });
    }
  }, [selectedRoom, nightPrice, numberOfRooms]);

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (roomData) {
      const room = roomData.find((room) => room._id === selectedId);
      setSelectedRoom(room || null);
      // setNightPrice(room?.nightPrice || 0)
      // setNumberOfRooms(room?.numberOfRooms || 0)
    }
  };

  const handleNightPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNightPrice(Number(event.target.value));
  };

  const handleNumberOfRoomsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfRooms(Number(event.target.value));
  };

  return (
    <div className="bg-amber-100 rounded-lg mt-4 p-2">
    
      <SmallCarousel images={selectedRoom?.images} slidesToShow={3}/>

      <div className="mb-2">
        <label htmlFor="room-select">בחירת סוג חדר:</label>
        <select className="border" id="room-select" onChange={handleRoomChange}>
          <option value="">--Please choose an option--</option>

          {roomData &&
            roomData.map((room) => (
              <option key={room._id} value={room._id}>
                {room.roomType}
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col sm:flex-row">
        <label htmlFor={`night-price-${selectedRoom?._id}`}>מחיר ללילה :</label>
        <input
          //   type="number"
          id={`night-price-${selectedRoom?._id}`}
          value={nightPrice ?? ""}
          onChange={handleNightPriceChange}
          className="border"
        />

        <label htmlFor={`number-of-rooms-${selectedRoom?._id}`}>
          כמות חדרים:
        </label>
        <input
          //   type="number"
          id={`number-of-rooms-${selectedRoom?._id}`}
          value={numberOfRooms ?? 1}
          onChange={handleNumberOfRoomsChange}
          className="border"
        />
      </div>
      <div className="flex justify-end mt-4">
        <RemoveButton onRemove={onRemove} text="מחק חדר"/>
      </div>
    </div>
  );
};

export default HotelslRoomCard;


