import { useLoaderData } from "react-router-dom";
import { getMyBookings } from "../services/booking.services";
import BackBtn from "../ui/BackBtn";
import HeaderBar from "../ui/HeaderBar";

const MyBookings = () => {
  const myBookings = useLoaderData();

  if (!myBookings)
    return (
      <div className="m-10 flex justify-center">
        <p>No Bookings Found!</p>
      </div>
    );

  return (
    <div className="space-y-4 md:mx-10 lg:mx-20">
      <HeaderBar>
        <BackBtn to={-1} />
        <h1 className="px-4 text-2xl font-bold uppercase text-stone-500">
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
            <p className="uppercase text-stone-500">Your Bookings</p>
            {hotel.bookings.map((booking, index) => (
              <div key={index}>
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
  if (res.length > 0) return res;
  return null;
};

export default MyBookings;
