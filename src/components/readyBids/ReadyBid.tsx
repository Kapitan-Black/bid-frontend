import {
  FlightResponse,
  HotelResponse,
  ImageResponse,
  MainBidServerResponse,
  TransferResponse,
} from "@/types/mainBidFormResponse";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadyFlightCard from "./readyFlightCard/ReadyFlightCard";
import ReadyTransferCard from "./ReadyTransferCard";
import ReadyHotelCard from "./ReadyHotelCard";
import ReadyImageCard from "./ReadyImageCard";
import ReadyBidHeader from "./ReadyBidHeader";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";



const ReadyBid = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate()

  const { formName } = useParams<{ formName: string }>();
  const [form, setForm] = useState<MainBidServerResponse[] | undefined>();

  const {isAuthenticated} = useAuth0()


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/main-form/${formName}`,
          {
            method: "GET",
          }

        );

        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.log(error, "Error");
      }
    };

    fetchData();
  }, [formName]);

  if (!form) {
    return <div>Loading...</div>;
  }

  const flattenAndSortBidForm = (bidForm: MainBidServerResponse[]) => {
    if (bidForm.length === 0) return null;

    const form = bidForm[0];

    const flattenedElements = [
      ...form.flight.map((f) => ({ ...f, type: "flight" })),
      ...form.hotel.map((h) => ({ ...h, type: "hotel" })),
      ...form.transfer.map((t) => ({ ...t, type: "transfer" })),
      ...form.image.map((i) => ({ ...i, type: "image" })),
    ];

    const idPositionMap = form.idArray.reduce<Record<string, number>>(
      (acc, id, index) => {
        acc[id] = index;
        return acc;
      },
      {}
    );

    const sortedElements = flattenedElements.sort(
      (a, b) => idPositionMap[a.id] - idPositionMap[b.id]
    );

    return {
      formName: form.formName,
      createDate: form.createDate,
      sortedElements,
      idArray: form.idArray,
      id: form._id,
    };
  };

  const processedBidForms = flattenAndSortBidForm(form);


    const handleUpdateHotel = (mainForm: MainBidServerResponse[]) => {
      navigate(`/update-main-form`, { state: { mainForm } });
    };

  return (
    <>
      {/* <ReadyBidsTopHeader /> */}
      <div className="sm:px-8">
        <ReadyBidHeader
          createDate={form[0].createDate}
          holidayStartDate={form[0].holidayStartDate}
          formName={processedBidForms?.formName}
        />
        <div className="space-y-2 md:px-36">
          {processedBidForms?.sortedElements.map((element, index) => {
            switch (element.type) {
              case "flight":
                return (
                  <ReadyFlightCard
                    key={index}
                    data={element as FlightResponse}
                  />
                );
              case "image":
                return (
                  <ReadyImageCard key={index} data={element as ImageResponse} />
                );
              case "hotel":
                return (
                  <ReadyHotelCard key={index} data={element as HotelResponse} />
                );
              case "transfer":
                return (
                  <ReadyTransferCard
                    key={index}
                    data={element as TransferResponse}
                  />
                );
              default:
                return null;
            }
          })}
        </div>

        {isAuthenticated && (
          <Button
            type="button"
            onClick={() => handleUpdateHotel(form)}
            className="bg-purple-400 rounded p-2 hover:bg-purple-500 text-black hover:text-white mt-8"
          >
            עריכה
          </Button>
        )}
      </div>
    </>
  );
};

export default ReadyBid;
