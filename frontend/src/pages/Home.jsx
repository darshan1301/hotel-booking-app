import HotelCard from "../components/HotelCard";
import { getAllHotels } from "../services/hotel.services";
import SearchBar from "../components/SearchBar";
import store from "../reduxStore/reduxStore";
import { getHotels, setHotels } from "../features/hotels/hotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
const Home = () => {
  const hotels = useSelector(getHotels);
  const allHotels = useLoaderData();
  const dispatch = useDispatch();

  if (hotels.length === 0) {
    return (
      <p className="text-md m-4 flex font-medium text-stone-500 md:mx-14">
        No Hotels Found
      </p>
    );
  }
  const handleSetHotels = (hotels) => {
    dispatch(setHotels(hotels));
  };
  return (
    <div>
      <SearchBar handleSetHotels={handleSetHotels} allHotels={allHotels} />
      <div className="mx-3 mb-6 grid-cols-2 sm:mx-auto sm:flex sm:flex-wrap sm:justify-center md:mb-6 md:grid-cols-4 md:justify-center lg:mx-14 lg:mb-10">
        {hotels.map((item) => (
          <HotelCard key={item._id} hotel={item} />
        ))}
      </div>
    </div>
  );
};

export async function loader() {
  const data = await getAllHotels();
  // console.log(data.data);
  store.dispatch(setHotels(data.data));
  return data.data;
}

export default Home;
