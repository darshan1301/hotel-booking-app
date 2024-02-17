/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import ImageSlider from "./ImageSlider";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const onHotel = () => navigate(`/hotel/${hotel._id}`);
  return (
    <div
      onClick={onHotel}
      className="mx-2 mt-4 overflow-hidden rounded-lg bg-white shadow sm:mx-4 sm:mt-8 sm:h-auto sm:w-[18rem] sm:flex-shrink-0 md:mx-3 md:mt-8 md:h-auto md:w-[20rem] md:rounded-2xl"
    >
      <div className="h-60 md:h-60">
        <ImageSlider
          images={hotel.imageUrls}
          styles={"h-60 w-full object-cover"}
        />
      </div>
      <div className="mb-4 mt-4 flex flex-col px-3  pt-2 md:px-4">
        <p className="text-xs font-medium uppercase text-stone-800 md:text-lg">
          {hotel.city}, {hotel.country}
        </p>
        <p className="mb-1 text-xs  font-light text-stone-500 md:text-base">
          {hotel.type}
        </p>
        <p className="text-xs font-semibold text-stone-800 md:text-base">
          ${hotel.pricePerNight}{" "}
          <span className="text-xs font-light uppercase text-stone-500 md:text-base">
            night
          </span>
        </p>
        <StarRating rating={hotel.starRating} />
      </div>
    </div>
  );
};

export default HotelCard;
