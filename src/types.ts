

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
export interface HotelFormData  {
  
  hotelName: string;
  hotelDescription: string;
  images: string[];
  rooms: RoomFormData[];
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
  numberOfAdults: number;
  numberOfChildren: number;
  agentComments: string;
  sum: number;
}

export type FlightCardFields = {
  id: string;
  type: "flight";
  forthDepartureDate: Date;
  forthArrivalDate: Date;
  forthFlightNumber: string;
  forthAirline: string;
  forthDepartureAirport: string;
  forthArrivalAirport: string;
  forthStopsNumber: number;
  forthStopoverAirport1: string;
  forthStopoverAirport2: string;
  forthFlightTime: string;
  forthLandingTime: string;

  backDepartureDate: Date;
  backArrivalDate: Date;
  backFlightNumber: string;
  backAirline: string;
  backDepartureAirport: string;
  backArrivalAirport: string;
  backStopsNumber: number;
  backStopoverAirport1: string;
  backStopoverAirport2: string;
  backFlightTime: string;
  backLandingTime: string;
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


