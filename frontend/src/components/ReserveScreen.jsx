import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Checkout from "./CheckOut";
import {
  createMyBooking,
  createPaymentIntent,
} from "../services/booking.services";
import { useAuth } from "../contexts/AuthContext";
import { usePopupMessage } from "../contexts/PopupMessageContext";
import { Elements } from "@stripe/react-stripe-js";
import { useStripePromise } from "../contexts/StripeContext";

const ReserveScreen = ({ hotel }) => {
  const { headers } = useAuth();
  const { displayPopupMessage } = usePopupMessage();
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(1);
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState({});
  const { stripePromise } = useStripePromise();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // console.log(hotel);
  const onReserve = async () => {
    if (!localStorage.getItem("jwtToken"))
      return displayPopupMessage("Please login first.", "red");
    if (!getTotalNights())
      return displayPopupMessage("Please select a date range.", "red");
    try {
      const res = await createPaymentIntent(headers, hotel._id, dateRange);
      if (res.ok) {
        const data = await res.json();
        setPaymentIntent(data);

        // console.log(data);
      }
    } catch (error) {
      console.error(error.message);
    }

    setOpenCheckoutForm(true);
  };

  const confirmBooking = async ({ firstName, lastName }) => {
    const body = {
      firstName,
      lastName,
      adultCount: adultCount,
      childCount: childCount,
      checkIn: new Date(dateRange[0].startDate),
      checkOut: new Date(dateRange[0].endDate),
      totalCost: (paymentIntent.totalCost / 100).toFixed(2),
      paymentIntent,
    };
    try {
      const res = await createMyBooking(headers, hotel._id, body);
      // console.log(res);
      if (res.ok) {
        displayPopupMessage("Success!");
        setOpenCheckoutForm(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTotalNights = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      const timeDiff =
        dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime();
      const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return nightCount;
    }
    return 0;
  };

  const getTotalPrice = () => {
    const totalNights = getTotalNights();
    return totalNights * hotel.pricePerNight;
  };

  const cancelForm = () => {
    setOpenCheckoutForm(false);
  };

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div className=" m-4 flex flex-col items-center justify-center space-y-2 divide-y rounded-lg border border-stone-400 p-4 lg:m-2">
      {openCheckoutForm && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntent.clientSecret }}
        >
          <Checkout
            hotel={hotel}
            cancelForm={cancelForm}
            paymentIntent={paymentIntent}
            confirmBooking={confirmBooking}
          />
        </Elements>
      )}
      <div className="grow py-1 ">
        <label className="px-2 text-sm">Adults:</label>
        <input
          onChange={(e) => setAdultCount(e.target.value)}
          className="input rounded-full border px-2 py-2 text-xs text-stone-400"
          type="number"
          min={0}
          max={hotel.adultCount}
          value={adultCount}
        />
        <label className="px-2 text-sm">Children:</label>
        <input
          onChange={(e) => setChildCount(e.target.value)}
          className="input rounded-full border px-2 py-2 text-xs text-stone-400"
          type="number"
          min={0}
          max={hotel.childCount}
          value={childCount}
        />
      </div>
      <div className="grow">
        <DateRange
          ranges={dateRange}
          onChange={handleDateChange}
          editableDateInputs={true}
          className="mb-4 w-full"
          rangeColors={["black"]}
        />
      </div>
      <div className="flex w-full items-center justify-between px-8 pt-4 ">
        <p className="text-lg font-medium">Total: ${getTotalPrice()}</p>
        <button
          onClick={onReserve}
          className="mx rounded-full bg-red-500 px-3 py-2 text-sm uppercase text-stone-50"
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default ReserveScreen;
