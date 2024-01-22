import hotels from "../hotels.json";
import AddHotel from "../components/AddHotel";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  return (
    <div>
      <AddHotel />
      <div className="grid grid-cols-1 gap-8">
        {hotels.map((hotel) => (
          <div
            key={hotel.userId}
            data-testid="hotel-card"
            className="flex flex-wrap justify-between gap-5 rounded-lg border border-slate-300 p-6 shadow"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">
              {hotel.city}, {hotel.country}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {/* <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div> */}
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                ${hotel.pricePerNight} /night
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-red-500 p-2 text-xl font-bold text-white hover:bg-red-600"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
