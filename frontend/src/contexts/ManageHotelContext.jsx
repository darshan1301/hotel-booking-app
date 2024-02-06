/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

import { initialState, manageHotelReducer } from "./manageHotelReducer";

const ManageHotelContext = createContext();

export const ManageHotelProvider = ({ children }) => {
  const [manageHotelState, dispatch] = useReducer(
    manageHotelReducer,
    initialState,
  );

  return (
    <ManageHotelContext.Provider value={{ manageHotelState, dispatch }}>
      {children}
    </ManageHotelContext.Provider>
  );
};

export const useManageHotel = () => {
  const context = useContext(ManageHotelContext);
  return context;
};
