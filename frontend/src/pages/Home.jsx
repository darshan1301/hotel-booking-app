import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import hotels from "../hotels.json";
const Home = () => {
  return (
    <div>
      <SearchBar />
      <div className="mx-3 sm:mx-auto sm:flex sm:flex-wrap">
        {hotels.map((item) => (
          <HotelCard
            imageUrls={item.imageUrls[0]}
            name={item.name}
            city={item.city}
            country={item.country}
            type={item.type}
            pricePerNight={item.pricePerNight}
            key={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
