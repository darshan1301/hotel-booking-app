import { hotelTypes } from "../../config/hotel-options-config.js";
import { useManageHotel } from "../../contexts/ManageHotelContext.jsx";

const TypeSection = () => {
  const { manageHotelState, dispatch } = useManageHotel();
  return (
    <div>
      <h2 className="mb-3 text-xl font-bold">Type</h2>
      <div className="grid gap-2 md:grid-cols-5">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={
              manageHotelState.type === type
                ? "cursor-pointer rounded-full bg-blue-300 px-4 py-2 text-sm font-semibold"
                : "cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold"
            }
          >
            <input
              onChange={() => dispatch({ type: "type", payload: type })}
              type="radio"
              value={type}
              name="hotelType"
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {/* {errors.type && (
        <span className="text-sm font-bold text-red-500">
          {errors.type.message}
        </span>
      )} */}
    </div>
  );
};

export default TypeSection;
