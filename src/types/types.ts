

export interface Room {
  roomType: string;
  images: string[];
  nightPrice?: number;
  numberOfRooms?: number;
  _id: string;
}
export interface Hotel {
  _id: string;
  id: string;
  type: string;
  hotelName: string;
  hotelDescription: string;
  images: string[];
  rooms: Room[];

}

export interface RoomFormData {
  roomType: string;
  images: string[];
}
export interface HotelFormData  {
  
  hotelName: string;
  hotelDescription: string;
  images: string[];
  rooms: RoomFormData[];
}


export interface ImageComponent {
  id: string;
  type: "image";
  imageUrl: string;
}


export interface HotelCardFields {
  id: string;
  type: "hotel";
  hotelName: string;
  checkInDate: Date;
  checkOutDate: Date;
  hotelDescription: string;
  rooms: RoomFormData[];
  // images: string[];
  sum: number;
};

export interface TransferCardFields {
  id: string;
  type: "transfer";
  transferDate: Date;
  time: string;
  from: string;
  to: string;
  agentComments: string;
  sum: number;
}

export type FlightCardFields = {
  id: string;
  type: "flight";
  DepartureDate: Date;
  ArrivalDate: Date;
  FlightNumber: string;
  Airline: string;
  DepartureAirport: string;
  ArrivalAirport: string;
  StopsNumber: number;
  StopoverAirport1: string;
  StopoverAirport2: string;
  FlightTime: string;
  LandingTime: string;

  numberOfAdults: number;
  numberOfChildren: number;
  priceForAdult: number;
  priceForChild: number;
  agentComments: string;
};





// export type MainBidForm = {
//   hotel: HotelForm[];
//   attraction: AttractionForm[];
// }


