import Facilities from "../components/Facilities";
import StarRating from "../components/StarRating";

const HotelDetails = () => {
  const hotel = {
    userId: "user123",
    name: "Luxury Resort",
    city: "Miami",
    country: "USA",
    description: "A luxurious resort by the beach",
    type: "Resort",
    adultCount: 2,
    childCount: 1,
    facilities: [
      "Swimming Pool",
      "Spa",
      "Restaurant",
      "wifi",
      "parking",
      "Kitchen",
    ],
    pricePerNight: 300,
    starRating: 4,
    imageUrls: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    lastUpdated: "2024-01-25T12:00:00Z",
    bookings: [],
  };
  return (
    <div>
      <div className=" h-1/4">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-2 py-3">
        <p className="py-2 font-sans text-3xl font-medium text-stone-800">
          {hotel.description}
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
            ? `${hotel.adultCount} guests`
            : `${hotel.adultCount} guest`}{" "}
          and
          {hotel.childCount > 1
            ? ` ${hotel.childCount} kids`
            : ` ${hotel.childCount} kid`}
        </p>
        <StarRating rating={hotel.starRating} />
        <Facilities facilities={hotel.facilities} />
      </div>
    </div>
  );
};

export default HotelDetails;
