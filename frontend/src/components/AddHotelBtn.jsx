import { useNavigate } from "react-router-dom";
import { useManageHotel } from "../contexts/ManageHotelContext";

const AddHotel = () => {
  const navigate = useNavigate();
  const { dispatch } = useManageHotel();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "resetManageHotelForm" });
    navigate("/hotel/addhotel");
  };
  return (
    <div>
      <button
        onClick={(e) => handleClick(e)}
        className="m-1  rounded-full bg-stone-600 px-2 py-2 text-sm text-stone-50"
      >
        Add Hotel
      </button>
    </div>
  );
};

export default AddHotel;
