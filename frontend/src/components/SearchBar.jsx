import { useState } from "react";
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getSearchHotels } from "../services/hotel.services";
import { useDispatch } from "react-redux";
import { setHotels } from "../features/hotels/hotelSlice";
import { Outlet } from "react-router-dom";
import { useSearchHotel } from "../contexts/SearchHotelContext";

const SearchBar = ({ handleSetHotels, allHotels }) => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);

  const { query, setQuery, clearQuery } = useSearchHotel();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSearch = async () => {
    console.log(query);
    try {
      const res = await getSearchHotels(query);
      const { data } = await res.json();
      // console.log(data);
      dispatch(setHotels(data));
      handleSetHotels(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    clearQuery();
    handleSetHotels(allHotels);
  };

  const handleCloseFilter = () => {
    setShowFilters(false);
  };

  return (
    <>
      <div className="w-ful sm: md:mx-30 mx-2 flex flex-wrap   items-center stroke-neutral-200 px-2  py-2 md:mx-32 md:gap-1 md:px-2 md:py-3 lg:mx-64  xl:mx-72">
        <div className="grow justify-between py-1">
          <input
            onChange={handleInputChange}
            type="text"
            id="destination"
            name="destination"
            placeholder="where are you going?"
            required
            autoComplete="off"
            className="input w-2/3 rounded-full border px-4 py-2 text-xs md:text-lg"
            value={query.destination}
            onClick={() => setShowFilters(true)}
          />
          <button
            onClick={handleSearch}
            className="mx-2 rounded-full bg-red-500 px-3 py-2 text-sm uppercase text-stone-50"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="grow py-1 transition-all duration-300">
            <div>
              <label className="px-2 text-sm">Adults:</label>
              <input
                onChange={handleInputChange}
                className="input rounded-full border px-2 py-2 text-xs text-stone-500"
                type="number"
                min={0}
                max={20}
                name="adultCount"
                value={query.adultCount}
              />
              <label className="px-2 text-sm">Children:</label>
              <input
                onChange={handleInputChange}
                className="input rounded-full border px-2 py-2 text-xs text-stone-500"
                type="number"
                min={0}
                max={20}
                name="childCount"
                value={query.childCount}
              />
            </div>
            <div>
              <select
                name="stars"
                value={query.stars}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-full border p-2 text-sm md:w-32"
              >
                <option value={0}>Select Rating</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </select>
            </div>
            <div className="mt-2">
              <span>Max Price : ${query.maxPrice}</span>
              <input
                type="range"
                min={50}
                max={1000}
                name="maxPrice"
                value={query.maxPrice}
                onChange={handleInputChange}
                className="range-sm mb-6 h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 md:w-32 dark:bg-gray-700"
              />
            </div>
            <div className="flex justify-between  py-1">
              <button
                onClick={handleClear}
                className="mx-1 rounded-full bg-stone-700 px-3 py-2 text-sm uppercase text-stone-50"
              >
                Clear
              </button>
              <button
                onClick={handleCloseFilter}
                className="rounded-full bg-stone-200 px-3 py-2 text-lg font-semibold"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default SearchBar;
