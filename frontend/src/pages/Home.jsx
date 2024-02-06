import { useLoaderData } from "react-router-dom";
import HotelCard from "../components/HotelCard";
import { getAllHotels } from "../services/hotel.services";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
const Home = () => {
  const data = useLoaderData();
  const [hotels, setHotels] = useState(() => data || []);
  if (!hotels) {
    return (
      <p className="text-md m-4 flex font-medium text-stone-500">
        No Hotels Found
      </p>
    );
  }
  const handleSetHotels = (hotels) => {
    setHotels(hotels);
  };
  return (
    <div>
      <SearchBar handleSetHotels={handleSetHotels} allHotels={data} />
      <div className=" mx-3 grid-cols-2 sm:mx-auto sm:flex sm:flex-wrap sm:justify-center md:grid-cols-4 md:justify-center lg:mx-14">
        {hotels.map((item) => (
          <HotelCard key={item._id} hotel={item} />
        ))}
      </div>
    </div>
  );
};

export async function loader() {
  const data = await getAllHotels();
  return data.data;
}

export default Home;
