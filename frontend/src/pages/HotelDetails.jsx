import Facilities from "../components/Facilities";
import StarRating from "../components/StarRating";
import { useLoaderData } from "react-router-dom";
import { getHotelDetails } from "../services/hotel.services";
import ReserveScreen from "../components/ReserveScreen";

const HotelDetails = () => {
  const hotel = useLoaderData();

  return (
    <div>
      <div className=" h-1/4">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="h-72 w-full object-cover md:h-96 "
        />
      </div>
      <div className="px-4 pt-4">
        <p className="font-sans text-3xl font-medium text-stone-800">
          {hotel.description}
        </p>
        {/* <p className="font-sans text-xl font-normal text-stone-400">
          ${hotel.pricePerNight} Per Night
        </p> */}
        <p className="py-1 font-sans text-base font-medium tracking-wide text-stone-800">
          {hotel.name}
        </p>
        <p className="pb-1 font-sans text-base font-light tracking-wide text-stone-800">
          {hotel.city}, {hotel.country}
        </p>
        <p className="pb-1 font-sans text-base font-light tracking-wide text-stone-800">
          {hotel.type} for{" "}
          {hotel.adultCount > 1
            ? `${hotel.adultCount} adults`
            : `${hotel.adultCount} adult`}{" "}
          and
          {hotel.childCount > 1
            ? ` ${hotel.childCount} kids`
            : ` ${hotel.childCount} kid`}
        </p>
        <StarRating rating={hotel.starRating} />
        <Facilities facilities={hotel.facilities} />
      </div>
      <ReserveScreen hotel={hotel} />
    </div>
  );
};

export async function loader({ params }) {
  const data = await getHotelDetails(params.hotelId);
  return data;
}

export default HotelDetails;
