import AddHotelBtn from "../components/AddHotelBtn";
import { useLoaderData } from "react-router-dom";
import HeaderBar from "../ui/HeaderBar";
import BackBtn from "../ui/BackBtn";
import { useState } from "react";
import MyHotelCard from "../features/myHotels/MyHotelCard";
import { getMyHotels } from "../services/hotel.services";

const MyHotels = () => {
  const { hotels } = useLoaderData();
  const [pageData, setPageData] = useState(() => hotels);

  return (
    <div className="sm:mx-4 md:mx-10 md:px-24 lg:mx-8">
      <HeaderBar>
        <BackBtn to={-1} />
        <AddHotelBtn />
      </HeaderBar>
      {!hotels ? (
        <p className="m-4 md:mx-14">No Hotels Found!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-8 md:gap-8">
          {pageData.map((hotel) => (
            <MyHotelCard
              hotel={hotel}
              key={hotel._id}
              pageData={pageData}
              setPageData={setPageData}
            />
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
