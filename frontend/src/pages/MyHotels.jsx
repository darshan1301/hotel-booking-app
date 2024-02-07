import AddHotelBtn from "../components/AddHotelBtn";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import HeaderBar from "../ui/HeaderBar";
import BackBtn from "../ui/BackBtn";
import { useManageHotel } from "../contexts/ManageHotelContext";
import { deleteMyHotel, getMyHotels } from "../services/hotel.services";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { usePopupMessage } from "../contexts/PopupMessageContext";

const MyHotels = () => {
  const { dispatch: manageHotelDispatch } = useManageHotel();
  const navigate = useNavigate();
  const { hotels } = useLoaderData();
  const { headers } = useAuth();
  const { displayPopupMessage } = usePopupMessage();
  const [pageData, setPageData] = useState(() =>
    hotels.length === 0 ? [] : hotels,
  );

  const handleEditHotel = (hotel) => {
    manageHotelDispatch({ type: "editHotel", payload: hotel });
    navigate(`/edit-hotel/${hotel._id}`);
  };

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

  return (
    <div className="md:mx-10 lg:mx-20">
      <HeaderBar>
        <BackBtn to={-1} />
        <AddHotelBtn />
      </HeaderBar>
      {hotels.length === 0 ? (
        <p className="m-4">No Hotels Found!</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {pageData.map((hotel) => (
            <div
              key={hotel._id}
              data-testid="hotel-card"
              className="mx-1 flex flex-wrap justify-between gap-4 rounded-lg border border-slate-300 p-2 shadow"
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
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
                  className=" flex items-center rounded-full bg-red-500 px-3 py-2 text-sm font-normal text-white hover:bg-red-600"
                >
                  Edit Hotel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteHotel(hotel._id)}
                  className="ml-2 flex items-center rounded-full bg-stone-700 px-3 py-2 text-sm font-normal text-white hover:bg-stone-500"
                >
                  Delete Hotel
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export async function loader() {
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  const res = await getMyHotels(headers);
  const data = await res.json();
  // console.log(data);
  if (res.ok) return data;
  return null;
}

export default MyHotels;
