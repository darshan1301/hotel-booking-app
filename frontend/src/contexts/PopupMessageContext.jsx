import { useState, useContext, createContext } from "react";

const PopupMessageContext = createContext();

export const PopupMessageProvider = ({ children }) => {
  const [popupMessage, setPopupMessage] = useState("");
  const [color, setColor] = useState(true);

  const displayPopupMessage = (message, color = "green") => {
    setPopupMessage(message);
    setColor(color);
    setTimeout(() => {
      setPopupMessage(null);
    }, 2000); // Set the duration for how long the message should be displayed
  };

  return (
    <PopupMessageContext.Provider value={{ displayPopupMessage, popupMessage }}>
      <div
        className={`fixed left-0 top-0 z-50 flex h-24 w-full items-center justify-center ${
          popupMessage ? "visible opacity-100" : "invisible opacity-0"
        } duration-600 transition-opacity ease-in-out`}
      >
        {color === "green" ? (
          <div
            className={`rounded-md border-y border-l-4 border-r border-green-500 bg-white px-4 py-2 text-sm font-bold uppercase text-green-600`}
          >
            {popupMessage}
          </div>
        ) : (
          <div
            className={`rounded-md   border-y border-l-4 border-r  border-red-500 bg-stone-50 px-4 py-2 text-sm font-bold uppercase text-red-500`}
          >
            {popupMessage}
          </div>
        )}
      </div>
      {children}
    </PopupMessageContext.Provider>
  );
};

export const usePopupMessage = () => {
  return useContext(PopupMessageContext);
};
