import { hotelFacilities } from "../../config/hotel-options-config";
import { useManageHotel } from "../../contexts/ManageHotelContext";

const Facilities = () => {
  const { manageHotelState, dispatch } = useManageHotel();

  const handleTypeChange = (facility) => {
    if (manageHotelState.facilities.includes(facility)) {
      const facilities = manageHotelState.facilities.filter(
        (item) => item !== facility,
      );
      return dispatch({ type: "facilities", payload: [...facilities] });
    } else {
      dispatch({
        type: "facilities",
        payload: [...manageHotelState.facilities, facility],
      });
    }
  };

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Facilities</h2>
      <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-5">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="flex gap-1 text-sm text-gray-700">
            <input
              type="checkbox"
              value={facility}
              onChange={() => handleTypeChange(facility)}
              checked={manageHotelState.facilities.includes(facility)}
            />
            {facility}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
