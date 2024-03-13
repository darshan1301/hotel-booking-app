import Facilities from "../components/Facilities";
import StarRating from "../components/StarRating";
import { useLoaderData } from "react-router-dom";
import { getHotelDetails } from "../services/hotel.services";
import ReserveScreen from "../components/ReserveScreen";
import ImageSlider from "../components/ImageSlider";

const HotelDetails = () => {
  const hotel = useLoaderData();

  return (
    <div className="lg:mx-10 ">
      <div className="h-1/4 md:m-8 md:rounded-2xl lg:mx-14 lg:my-8 ">
        <ImageSlider
          images={hotel.imageUrls}
          styles="h-72 w-full object-cover md:h-96 md:rounded-2xl lg:h-[30rem]"
        />
      </div>
      <div className="grid grid-cols-1 px-4 pt-4 lg:mx-12 lg:grid-cols-2 lg:gap-4 lg:px-0 lg:pt-4 ">
        <div className="lg:px-4">
          <p className="font-sans text-3xl font-medium text-stone-500">
            {hotel.description}
          </p>
          <p className="my-2 rounded-md border border-red-400 px-2 py-2 font-sans text-xl font-light uppercase text-stone-500">
            ${hotel.pricePerNight}/per Night
          </p>
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
        <div>
          <ReserveScreen hotel={hotel} />
        </div>
      </div>
    </div>
  );
};

export async function loader({ params }) {
  const data = await getHotelDetails(params.hotelId);
  return data;
}

export default HotelDetails;
