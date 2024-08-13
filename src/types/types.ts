export type Images = {
  id: string;
  images: string[];
};

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
export interface HotelFormData {
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
  sum: number;
}

export interface TransferCardFields {
  id: string;
  type: "transfer";
  transferDescription: string;
  transferDate: Date;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  agentComments: string;
  passengerComposition: string;
  sum: number;
}

export type FlightCardFields = {
  id: string;
  type: "flight";
  flightDescription: string;
  departureDate: Date;
  arrivalDate: Date;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  stopsNumber: number;
  stopoverAirport1: string;
  stopoverAirport2: string;
  stopoverAirport3: string;
  stopover1Time: string;
  stopover2Time: string;
  stopover3Time: string;
  flightTime: string;
  landingTime: string;

  numberOfAdults: number;
  numberOfChildren: number;
  numberOfBabies: number;
  priceForAdult: number;
  priceForChild: number;
  priceForBaby: number;
  agentComments: string;
};

// export type MainBidForm = {
//   hotel: HotelForm[];
//   attraction: AttractionForm[];
// }
