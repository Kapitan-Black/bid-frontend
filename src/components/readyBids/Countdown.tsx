import React, { useEffect, useState } from "react";

interface CountdownProps {
  createDate: string;
  flightDate: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ createDate, flightDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // console.log(timeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, [createDate, flightDate]);

  // console.log(createDate, flightDate)

  const updateCountdown = () => {
    const now = new Date().getTime();
    const startDateTime = new Date(createDate).getTime();
    const futureDateTime = new Date(flightDate).getTime();

    if (isNaN(futureDateTime)) {
      console.error("Invalid flightDate:", flightDate);
      return;
    }

    // Ensure the countdown only runs if the start date is before the future date
    if (futureDateTime > now && startDateTime <= now) {
      const distance = futureDateTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

const isTimeUp =
  timeLeft.days === 0 &&
  timeLeft.hours === 0 &&
  timeLeft.minutes === 0 &&
  timeLeft.seconds === 0;

  return (
    <div dir="rtl" className="flex justify-center my-8">
      {/* <h1>
        Countdown to{" "}
        {isNaN(new Date(flightDate).getTime())
          ? "Invalid Date"
          : new Date(flightDate).toLocaleString()}
      </h1> */}

      <div className=" bg-blue-50 gap-2 p-4 rounded-md w-[500px]">
        {/* {Object.values(timeLeft).every((value) => value > 0) ? ( */}
        {!isTimeUp ? (
          <h2 className="text-center text-lg mb-2">
            איזה כיף! החופשה החלומית שלכם בתאילנד מתחילה בעוד...
          </h2>
        ) : (
          <h2 className="text-center text-lg mb-2">שתהיה לכם חופשה מהנה</h2>
        )}

        <div className="flex justify-center text-sky-600">
          <div className="flex justify-center bg-blue-100 gap-2 text-sky-600 sm:text-xl">
            {/* <div className="bg-sky-200 p-4 py-8 rounded-md">
              <p className="text-center"> {timeLeft.seconds}</p>
              <p> שניות</p>
            </div> */}
            {timeLeft.minutes > 0 && (
              <div className="bg-sky-200 p-4 py-8 rounded-md">
                <p className="text-center"> {timeLeft.minutes}</p>
                <p> דקות</p>
              </div>
            )}
            {timeLeft.hours > 0 && (
              <div className="bg-sky-200 p-4 py-8 rounded-md">
                <p className="text-center"> {timeLeft.hours}</p>
                <p> שעות</p>
              </div>
            )}

            {timeLeft.days > 0 && (
              <div className="bg-sky-200 p-4 py-8 rounded-md">
                <p className="text-center"> {timeLeft.days}</p>
                <p> ימים</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <p>מספר הצעה:</p>
          <p>0000</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
