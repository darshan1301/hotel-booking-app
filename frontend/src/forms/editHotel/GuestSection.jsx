import { useManageHotel } from "../../contexts/ManageHotelContext";

const GuestSection = () => {
  const { manageHotelState, dispatch } = useManageHotel();

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };
  const styles = {
    label: "flex-1 text-sm capitalize font-bold text-gray-700",
    input:
      "w-full rounded-full border border-stone-400 px-2 py-1 mt-2 font-normal",
  };

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Guests</h2>
      <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
        <div>
          <label className="mb-1 block text-sm font-bold">Adults</label>
          <input
            type="number"
            className={styles.input}
            onChange={(e) => handleChange(e)}
            name="adultCount"
            value={manageHotelState.adultCount}
            min={1}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold">Children</label>
          <input
            type="number"
            className={styles.input}
            onChange={(e) => handleChange(e)}
            name="childCount"
            value={manageHotelState.childCount}
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestSection;
