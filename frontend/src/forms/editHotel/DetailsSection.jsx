/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import InputBar from "../../components/InputBar";
import { useManageHotel } from "../../contexts/ManageHotelContext";

const DetailsSection = () => {
  const { dispatch, manageHotelState } = useManageHotel();

  const handleChange = (e) => {
    console.log(e);
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="flex-1 text-sm font-bold capitalize text-gray-700">
        Name
      </label>
      <input
        className="w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
        type={"text"}
        onChange={handleChange}
        name="name"
        value={manageHotelState.name}
      />

      <div className="mt-4 flex items-center gap-4">
        <label className="flex-1 text-sm font-bold capitalize text-gray-700">
          City
        </label>
        <input
          className=" w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
          type="text"
          onChange={handleChange}
          name="city"
          value={manageHotelState.city}
        />

        <label className="flex-1 text-sm font-bold capitalize text-gray-700">
          Country
        </label>
        <input
          type="text"
          className=" w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
          name="country"
          onChange={handleChange}
          value={manageHotelState.country}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <label className="flex-1 text-sm font-bold capitalize text-gray-700">
          Description
        </label>
        <input
          value={manageHotelState.description}
          name="description"
          className="w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
          type="text"
          rows={1}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <label className="flex-1 text-sm font-bold capitalize text-gray-700">
          Price Per Night
        </label>

        <input
          min={1}
          type="number"
          name="pricePerNight"
          value={manageHotelState.pricePerNight}
          className=" before: w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <label className="max-w-[50%] text-sm font-bold text-gray-700">
          Star Rating
        </label>
        <select
          name="starRating"
          onChange={handleChange}
          className="w-full rounded border p-2 font-normal text-gray-700"
        >
          <option
            value={manageHotelState.starRating}
            className="text-sm font-bold"
          >
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {/* {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )} */}
      </div>
    </div>
  );
};

export default DetailsSection;
