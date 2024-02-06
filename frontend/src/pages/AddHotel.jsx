import { useAuth } from "../contexts/AuthContext";
import ManageHotel from "../forms/editHotel/ManageHotel";
import { addMyHotel } from "../services/hotel.services";

const AddHotel = () => {
  const { headers } = useAuth();
  async function onsubmitHandler(formData) {
    return addMyHotel(formData, headers);
  }
  return (
    <div>
      <h1 className="my-4 px-4 text-2xl font-bold uppercase text-stone-700">
        Add Hotel
      </h1>
      <ManageHotel onSubmitHandler={onsubmitHandler} />
    </div>
  );
};

export default AddHotel;
