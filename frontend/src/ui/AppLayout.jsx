import { Outlet, useNavigation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from "./LoadingScreen";
import { usePopupMessage } from "../contexts/PopupMessageContext";

const message = "Logged In!";
const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { displayPopupMessage } = usePopupMessage();

  // displayPopupMessage
  useEffect(() => {
    displayPopupMessage(message);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdownOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdownOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeDropdownOutsideClick);
    };
  }, []);

  return (
    <div className="">
      <Navbar
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
        dropdownRef={dropdownRef}
      />
      {isLoading && <LoadingScreen />}
      <Outlet />
    </div>
  );
};

export default AppLayout;
