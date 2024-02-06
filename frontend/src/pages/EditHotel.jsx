import { useAuth } from "../contexts/AuthContext";
import ManageHotel from "../forms/editHotel/ManageHotel";
import { updateMyHotel } from "../services/hotel.services";
import { useParams } from "react-router-dom";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { headers } = useAuth();

  async function onsubmitHandler(formData) {
    return updateMyHotel(hotelId, formData, headers);
  }
  return (
    <div>
      <h1 className="my-4 px-4 text-2xl font-bold uppercase text-stone-700">
        Edit Hotel
      </h1>

      <ManageHotel onSubmitHandler={onsubmitHandler} />
    </div>
  );
};

export default EditHotel;
