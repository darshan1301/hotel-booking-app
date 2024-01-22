import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());

  return (
    <div className="flex flex-wrap items-center border bg-stone-100  stroke-neutral-200 px-2 py-1 md:mx-16 md:gap-1 md:rounded-full md:px-16 md:py-3">
      <div className="grow py-1">
        <label className="px-2 text-sm">Destination:</label>
        <input
          onChange={(e) => setDestination(e.target.value)}
          type="text"
          id="destination"
          name="destination"
          placeholder="where are you going?"
          required
          autoComplete="off"
          className="input rounded-full border px-2 py-2 text-xs"
        />
      </div>
      <div className="grow py-1">
        <label className="px-2 text-sm">Children:</label>
        <input
          onChange={(e) => setChildCount(e.target.value)}
          className="input rounded-full border px-2 py-2 text-xs text-stone-400"
          type="number"
          min={0}
          max={20}
          value={childCount}
        />

        <label className="px-2 text-sm">Adults:</label>
        <input
          onChange={(e) => setAdultCount(e.target.value)}
          className="input rounded-full border px-2 py-2 text-xs text-stone-400"
          type="number"
          min={0}
          max={20}
          value={adultCount}
        />
      </div>
      <div className="grow py-1">
        <label className="px-2 text-sm">Check In:</label>
        <DatePicker
          className="input rounded-full border px-2 py-2 text-xs text-stone-400"
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
        />
      </div>
      <div className="grow py-1">
        <label className="px-2 text-sm">Check Out:</label>
        <DatePicker
          className="input rounded-full border px-2 py-2 text-xs text-stone-400"
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
        />
      </div>
      <div className="grow py-1">
        <button className="mx-2 rounded-full bg-red-500 px-3 py-2 text-sm uppercase text-stone-50">
          Search
        </button>
        <button className="mx-1 rounded-full bg-stone-700 px-3 py-2 text-sm uppercase text-stone-50">
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
