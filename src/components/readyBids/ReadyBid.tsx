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
import Loader from "../loader/Loader";
import TermsOfUse from "./TermsOfUse";

const ReadyBid = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const { formName } = useParams<{ formName: string }>();
  const [form, setForm] = useState<MainBidServerResponse[] | undefined>();

  const { isAuthenticated } = useAuth0();

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
    return (
      <div className="flex justify-center mt-64">
        <Loader />
      </div>
    );
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
      isBidApproved: form.isBidApproved,
      fakeCountNumber: form.fakeCountNumber,
      totalSum: form.totalSum,
      currency: form.currency,
      sortedElements,
      idArray: form.idArray,
      id: form._id,
    };
  };

  const processedBidForms = flattenAndSortBidForm(form);
  // console.log("processedBidForms", processedBidForms);

  const handleUpdateHotel = (mainForm: MainBidServerResponse[]) => {
    navigate(`/update-main-form`, { state: { mainForm } });
  };

  return (
    <>
      {/* <ReadyBidsTopHeader /> */}

      <div className="sm:px-8 px-2">
        <ReadyBidHeader
          createDate={form[0].createDate}
          holidayStartDate={form[0].holidayStartDate}
          formName={processedBidForms?.formName}
          isBidApproved={processedBidForms?.isBidApproved}
          fakeCountNumber={processedBidForms?.fakeCountNumber}
        />
        <div className="space-y-2 lg:px-36">
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
        <div className="flex justify-center lg:px-36 mt-8">
          <div className="flex justify-center bg-orange-400 rounded-full p-2 lg:p-4 gap-2 font-semibold text-white text-sm md:text-lg w-60 md:w-80">
            <div className="flex gap-1">
              <p>{processedBidForms?.currency}</p>
              <p>{processedBidForms?.totalSum}</p>
            </div>

            <p>:סך הכל לתשלום</p>
          </div>
        </div>

        <TermsOfUse />

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
