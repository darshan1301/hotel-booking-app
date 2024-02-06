/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const onHotel = () => navigate(`/hotel/${hotel._id}`);
  return (
    <div
      onClick={onHotel}
      className="mx-2 mt-4 overflow-hidden rounded-lg bg-white shadow sm:mx-4 sm:mt-8 sm:h-auto sm:w-[18rem] sm:flex-shrink-0 md:mx-4 md:mt-8 md:h-auto md:w-[20rem] md:rounded-2xl"
    >
      <div className="h-60 md:h-48">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mb-2 flex flex-col px-2 py-1">
        <p className="mb-1 text-xs font-medium text-stone-800">
          {hotel.city}, {hotel.country}
        </p>
        <p className="mb-1 text-xs font-light text-stone-500">{hotel.type}</p>
        <p className="text-xs font-medium text-stone-800">
          ${hotel.pricePerNight}{" "}
          <span className="text-xs font-light text-stone-500">night</span>
        </p>
        <StarRating rating={hotel.starRating} />
      </div>
    </div>
  );
};

export default HotelCard;
