import { BsBuilding } from "react-icons/bs";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import { useAuth } from "../../contexts/AuthContext";
import { usePopupMessage } from "../../contexts/PopupMessageContext";
import { deleteMyHotel } from "../../services/hotel.services";
import { useManageHotel } from "../../contexts/ManageHotelContext";
import { useNavigate } from "react-router-dom";

const MyHotelCard = ({ hotel, pageData, setPageData }) => {
  const { headers } = useAuth();
  const { displayPopupMessage } = usePopupMessage();
  const { dispatch: manageHotelDispatch } = useManageHotel();
  const navigate = useNavigate();

  const handleDeleteHotel = async (hotelId) => {
    try {
      const res = await deleteMyHotel(headers, hotelId);
      console.log(res);
      if (res.ok) {
        const newData = pageData.filter((item) => item._id !== hotelId);
        displayPopupMessage("Hotel deleted successfully!");
        console.log(newData);
        setPageData(newData);
      }
    } catch (error) {
      displayPopupMessage(`${error.message}`, "red");
      console.error(error);
    }
  };

  const handleEditHotel = (hotel) => {
    manageHotelDispatch({ type: "editHotel", payload: hotel });
    navigate(`/edit-hotel/${hotel._id}`);
  };

  return (
    <div
      data-testid="hotel-card"
      className="mx-1 flex flex-wrap justify-between gap-4 rounded-lg border border-slate-300 p-2 shadow xl:flex-nowrap"
    >
      <h2 className="font text-2xl text-stone-500">{hotel.name}</h2>
      <div className="whitespace-pre-line">
        {hotel.city}, {hotel.country}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="flex items-center rounded-sm border border-slate-300 p-3">
          <BsBuilding className="mr-1" />
          {hotel.type}
        </div>
        <div className="flex items-center rounded-sm border border-slate-300 p-3">
          ${hotel.pricePerNight} /night
        </div>
        <div className="flex items-center rounded-sm border border-slate-300 p-3">
          {hotel.adultCount} adults, {hotel.childCount} children
        </div>
        <div className="flex items-center rounded-sm border border-slate-300 p-3">
          {hotel.starRating} Star Rating
        </div>
      </div>
      <span className="flex justify-between">
        <button
          onClick={() => handleEditHotel(hotel)}
          className=" flex items-center rounded-full bg-stone-700 px-3 py-1 text-lg font-normal text-white hover:bg-stone-600"
        >
          <HiOutlinePencilAlt />
        </button>
        <button
          type="button"
          onClick={() => handleDeleteHotel(hotel._id)}
          className="ml-2 flex items-center rounded-full  bg-red-500  px-3 py-1 text-lg font-normal text-white hover:bg-red-600"
        >
          <HiTrash />
        </button>
      </span>
    </div>
  );
};

export default MyHotelCard;
