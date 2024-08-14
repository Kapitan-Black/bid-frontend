
import { FlightResponse } from "@/types/mainBidFormResponse";


type Props = {
  data: FlightResponse;
};

const PasangersDetails = ({ data }: Props) => {
  const sum =
    data.numberOfAdults * data.priceForAdult +
    data.numberOfChildren * data.priceForChild +
    data.numberOfBabies * data.priceForBaby;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-36 mx-2 sm:mx-8 mt-4">
      <div>
        <h2 className="font-bold mb-2">הרכב הנוסעים</h2>
        <div className="flex gap-8">
          <div className="flex flex-col">
            {data.numberOfAdults > 0 && (
              <div className="flex gap-24">
                <span className="flex gap-2">
                  <p>מבוגרים:</p>
                  <p>{data.numberOfAdults}</p>
                </span>
              </div>
            )}
            {data.numberOfChildren > 0 && (
              <div className="flex gap-24">
                <span className="flex gap-2">
                  <p>ילדים:</p>
                  <p>{data.numberOfChildren}</p>
                </span>
              </div>
            )}
            {data.numberOfBabies > 0 && (
              <div className="flex gap-24">
                <span className="flex gap-2">
                  <p>תינוקות:</p>
                  <p>{data.numberOfBabies}</p>
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p>{data.priceForAdult > 0 && data.priceForAdult}</p>
            <p>{data.priceForChild > 0 && data.priceForChild}</p>
            <p>{data.priceForBaby > 0 && data.priceForBaby}</p>
          </div>
        </div>
        <div className="flex gap-4 font-bold">
          <p>סה׳׳כ לתשלום</p>
          <p> {sum}</p>
        </div>
      </div>

      <div className="w-1/2 sm:w-1/3 ">
        <p className="font-bold mb-2">הערות סוכן</p>
        <p>{data.agentComments}</p>
      </div>
    </div>
  );
};

export default PasangersDetails;
