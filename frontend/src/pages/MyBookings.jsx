import { cancelMyBooking, getMyBookings } from "../services/booking.services";
import BackBtn from "../ui/BackBtn";
import HeaderBar from "../ui/HeaderBar";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import store from "../reduxStore/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  clearBookings,
  getBookings,
  setBookings,
} from "../features/myBookings/myBookingsSlice";

const MyBookings = () => {
  const myBookings = useSelector(getBookings);
  // console.log(myBookings);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { headers } = useAuth();

  const onCancelReservation = async (hotelId, bookingId) => {
    setIsLoading(true);
    try {
      const res = await cancelMyBooking(headers, hotelId, bookingId);
      if (res.ok) {
        // const data = await res.json();
        dispatch(cancelBooking(bookingId));
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!myBookings.length)
    return (
      <div className="m-10 flex justify-center">
        <p>No Bookings Found!</p>
      </div>
    );

  return (
    <div className="space-y-4 md:mx-10 lg:mx-20">
      <HeaderBar>
        <BackBtn to={-1} />
        <h1 className="px-4 text-2xl font-medium uppercase text-stone-500">
          My Bookings
        </h1>
      </HeaderBar>
      {myBookings.map((hotel) => (
        <div
          key={hotel._id}
          className="mx-6 grid grid-cols-1 gap-5 border-t-2 py-4 lg:grid-cols-[1fr_3fr] lg:py-4"
        >
          <div className=" lg:h-[250px] lg:w-full">
            <img
              src={hotel.imageUrls[0]}
              className="h-full w-full rounded-lg object-cover object-center"
            />
          </div>
          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
            <div className="text-xl font-bold">
              {hotel.name}
              <p className="mb-1 text-xs font-medium text-stone-800">
                {hotel.city}, {hotel.country}
              </p>
            </div>
            <p className="divide uppercase text-stone-500">Your Bookings</p>
            {hotel.bookings.map((booking, index) => (
              <div
                key={index}
                className="flex items-center  justify-between rounded-lg border-b border-red-200 bg-stone-50 px-3 py-3"
              >
                <div>
                  <div>
                    <span className="mr-2 font-bold">Dates: </span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="mr-2 font-bold">Guests:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={() => onCancelReservation(hotel._id, booking._id)}
                    className="rounded-full bg-red-500 px-3 py-2 text-xs uppercase text-stone-50"
                  >
                    {isLoading ? "...Canceling" : "Cancel"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const loader = async () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  const res = await getMyBookings(headers);
  // console.log(res);
  if (res.length > 0) {
    store.dispatch(setBookings(res));
    return res;
  }
  store.dispatch(clearBookings());
  return null;
};

export default MyBookings;
