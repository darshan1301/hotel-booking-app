// eslint-disable-next-line react/prop-types
const HotelCard = ({ imageUrls, name, city, country, type, pricePerNight }) => {
  return (
    <div className="mx-1 my-2 overflow-hidden rounded-lg bg-white shadow-md sm:mx-2 sm:h-auto sm:w-[13rem] sm:flex-shrink-0">
      <div className="h-48">
        <img
          src={imageUrls}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mb-2 px-2 py-1">
        <p className="mb-1 text-xs font-medium text-stone-800">
          {city}, {country}
        </p>
        <p className="mb-1 text-xs font-light text-stone-500">{type}</p>
        <p className="text-xs font-medium text-stone-800">
          ${pricePerNight}{" "}
          <span className="text-xs font-light text-stone-500">night</span>
        </p>
      </div>
    </div>
  );
};

export default HotelCard;
