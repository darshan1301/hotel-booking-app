import HotelCard from "../components/HotelCard";
import { useSelector } from "react-redux";
import { getHotels } from "../features/hotels/hotelSlice";
import { Link } from "react-router-dom";

const SearchHotels = () => {
  const hotels = useSelector(getHotels);
  console.log(hotels);

  if (!hotels) {
    return (
      <>
        <p className="text-md m-4 flex font-medium text-stone-500">
          No Hotels Found
        </p>
        <Link
          className=" const className = 'text-sm hover:underline'; text-blue-500 hover:text-blue-600"
          to="/"
        >
          &larr; Go back
        </Link>
      </>
    );
  }
  return (
    <div>
      <div className="mx-3 sm:mx-auto sm:flex sm:flex-wrap">
        {hotels.map((item) => (
          <HotelCard key={item._id} hotel={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchHotels;
