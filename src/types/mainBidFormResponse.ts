type FlightResponse = {
  Airline: string;
  ArrivalAirport: string;
  ArrivalDate: string; // ISO date string
  DepartureAirport: string;
  DepartureDate: string; // ISO date string
  FlightNumber: string;
  FlightTime: string;
  LandingTime: string;
  StopoverAirport1: string;
  StopoverAirport2: string;
  StopsNumber: number;
  agentComments: string;
  numberOfAdults: number;
  numberOfChildren: number;
  priceForAdult: number;
  priceForChild: number;
  type: string;
  id: string;
  _id: string;
};

type HotelRoom = {
  roomType: string;
  images: string[];
  nightPrice: number;
  numberOfRooms: number;
  _id: string;
};

type HotelResponse = {
  id: string;
  type: "hotel";
  hotelName: string;
  checkInDate: string; // ISO date string
  checkOutDate: string; // ISO date string
  hotelDescription: string;
  images: string[];
  rooms: HotelRoom[];
  sum: number;
  _id: string;
};

type TransferResponse = {
  id: string;
  type: "transfer";
  transferDate: string; // ISO date string
  time: string;
  from: string;
  to: string;
  sum: number;
    agentComments: string;
    _id: string;
};

type ImageResponse = {
  id: string;
  type: string;
  imageUrl: string;
  _id: string;
};

export type MainBidServerResponse = {
  formName: string;
  flight: FlightResponse[];
  hotel: HotelResponse[];
  transfer: TransferResponse[];
  image: ImageResponse[];
  idArray: string[];
  __v: number;
  _id: string;
};
