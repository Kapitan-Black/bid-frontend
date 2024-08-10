import { z } from "zod";

const headerFormSchema = z.object({
  formName: z.string().min(1, "formName is required")
})

const hotelSchema = z.object({
  id: z.string(),
  type: z.literal("hotel"),
  hotelName: z.string().min(1, "Hotel name is required"),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  hotelDescription: z.string(),
  rooms: z.array(
    z.object({
      roomType: z.string(),
      images: z.array(z.string()),
    })
  ),
  sum: z.string(),
});
const transferSchema = z.object({
  id: z.string(),
  type: z.literal("transfer"),
  transferDate: z.date(),
  time: z.string(),
  from: z.string(),
  to: z.string(),
  sum: z.string(),
  agentComments: z.string()
});

export const flightSchema = z.object({
  id: z.string(),
  type: z.literal("flight"),
  forthDepartureDate: z.date(),
  forthArrivalDate: z.date(),
  forthFlightNumber: z.string(),
  forthAirline: z.string(),
  forthDepartureAirport: z.string(),
  forthArrivalAirport: z.string(),
  forthStopsNumber: z.number(),
  forthStopoverAirport1: z.string(),
  forthStopoverAirport2: z.string(),
  forthFlightTime: z.string(),
  forthLandingTime: z.string(),
  
  numberOfAdults: z.number(),
  numberOfChildren: z.number(),
  priceForAdult: z.number(),
  priceForChild: z.number(),
  agentComments: z.string().optional(),
});

const imageSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  imageUrl: z.string().url(),
});

export const formSchema = z.object({
  items: z.array(
    z.union([
      hotelSchema,
      transferSchema,
      flightSchema,
      imageSchema,
      headerFormSchema,
    ])
  ),
});
