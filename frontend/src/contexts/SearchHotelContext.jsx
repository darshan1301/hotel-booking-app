/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SearchHotelContext = createContext();

export const SearchHotelProvider = ({ children }) => {
  const [query, setQuery] = useState({
    destination: "",
    adultCount: 1,
    childCount: 0,
    stars: "",
    facilities: "",
    types: "",
    maxPrice: 1000,
  });

  const clearQuery = () => {
    setQuery({
      destination: "",
      adultCount: 1,
      childCount: 0,
      stars: "",
      facilities: "",
      types: "",
      maxPrice: 1000,
    });
  };

  return (
    <SearchHotelContext.Provider value={{ query, setQuery, clearQuery }}>
      {children}
    </SearchHotelContext.Provider>
  );
};

export const useSearchHotel = () => {
  const context = useContext(SearchHotelContext);
  return context;
};
