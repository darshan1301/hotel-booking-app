/* eslint-disable react/prop-types */
import { hotelTypes } from "../../config/hotel-options-config";
import { useManageHotel } from "../../contexts/ManageHotelContext";
import { hotelFacilities } from "../../config/hotel-options-config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePopupMessage } from "../../contexts/PopupMessageContext";

const ManageHotel = ({ onSubmitHandler }) => {
  const { manageHotelState, dispatch } = useManageHotel();
  const existingImageUrls = manageHotelState.imageUrls;
  const navigate = useNavigate();
  const { displayPopupMessage } = usePopupMessage();

  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch({ type: "resetManageHotelForm" });
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.target;
      const formData = new FormData(form);
      manageHotelState.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });
      manageHotelState.imageUrls.forEach((image, index) => {
        formData.append(`imageUrls[${index}]`, image);
      });
      // console.log(formData);

      const res = await onSubmitHandler(formData);
      if (res.ok) {
        dispatch({ type: "resetManageHotelForm" });
        navigate(-1);
        displayPopupMessage("Successfully Saved!");
      }
    } catch (error) {
      displayPopupMessage(`${error.message}`, "red");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const handleTypeChange = (facility) => {
    if (manageHotelState.facilities.includes(facility)) {
      const facilities = manageHotelState.facilities.filter(
        (item) => item !== facility,
      );
      return dispatch({ type: "facilities", payload: [...facilities] });
    } else {
      dispatch({
        type: "facilities",
        payload: [...manageHotelState.facilities, facility],
      });
    }
  };

  const handleDelete = (e, url) => {
    dispatch({
      type: "deleteImage",
      payload: url,
    });
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        className="mx-2 flex flex-col gap-4 px-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label className="flex-1 text-sm font-bold capitalize text-gray-700">
            Name
          </label>
          <input
            className="w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
            type={"text"}
            onChange={handleChange}
            name="name"
            value={manageHotelState.name}
          />

          <div className="mt-4 flex items-center gap-4">
            <label className="flex-1 text-sm font-bold capitalize text-gray-700">
              City
            </label>
            <input
              className=" w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
              type="text"
              onChange={handleChange}
              name="city"
              value={manageHotelState.city}
            />

            <label className="flex-1 text-sm font-bold capitalize text-gray-700">
              Country
            </label>
            <input
              type="text"
              className=" w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
              name="country"
              onChange={handleChange}
              value={manageHotelState.country}
            />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <label className="flex-1 text-sm font-bold capitalize text-gray-700">
              Description
            </label>
            <input
              value={manageHotelState.description}
              name="description"
              className="w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
              type="text"
              rows={1}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <label className="flex-1 text-sm font-bold capitalize text-gray-700">
              Price Per Night
            </label>

            <input
              min={1}
              type="number"
              name="pricePerNight"
              value={manageHotelState.pricePerNight}
              className=" before: w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <label className="max-w-[50%] text-sm font-bold text-gray-700">
              Star Rating
            </label>
            <select
              name="starRating"
              onChange={handleChange}
              className="w-full rounded border p-2 font-normal text-gray-700"
            >
              <option
                value={manageHotelState.starRating}
                className="text-sm font-bold"
              >
                Select as Rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {/* {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )} */}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-bold">Type</h2>
          <div className="grid gap-2 md:grid-cols-5">
            {hotelTypes.map((type, index) => (
              <label
                key={index}
                className={
                  manageHotelState.type === type
                    ? "cursor-pointer rounded-full bg-blue-300 px-4 py-2 text-sm font-semibold"
                    : "cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold"
                }
              >
                <input
                  onChange={() => dispatch({ type: "type", payload: type })}
                  type="radio"
                  value={type}
                  name="type"
                  className="hidden"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold">Facilities</h2>
          <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-5">
            {hotelFacilities.map((facility) => (
              <label
                key={facility}
                className="flex gap-1 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  value={facility}
                  onChange={() => handleTypeChange(facility)}
                  checked={manageHotelState.facilities.includes(facility)}
                />
                {facility}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold">Guests</h2>
          <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
            <div>
              <label className="mb-1 block text-sm font-bold">Adults</label>
              <input
                type="number"
                className="mt-2 w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
                onChange={(e) => handleChange(e)}
                name="adultCount"
                value={manageHotelState.adultCount}
                min={1}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Children</label>
              <input
                type="number"
                className="mt-2 w-full rounded-full border border-stone-400 px-2 py-1 font-normal"
                onChange={(e) => handleChange(e)}
                name="childCount"
                value={manageHotelState.childCount}
                min={0}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold">Images</h2>
          <div className="flex flex-col gap-4 rounded border p-4">
            {existingImageUrls && (
              <div className="grid grid-cols-6 gap-4">
                {existingImageUrls.map((url) => (
                  <div className="group relative" key={url}>
                    <img src={url} className="min-h-full object-cover" />
                    <button
                      onClick={(e) => handleDelete(e, url)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              id="imageInput"
              name="photos"
              type="file"
              multiple
              accept="image/*"
              className="w-full font-normal text-gray-700"
            />
          </div>
        </div>
        <span className="flex justify-between">
          <button
            onClick={(e) => handleCancel(e)}
            disabled={isLoading}
            type="button"
            className="mb-4 flex rounded-full bg-stone-600 px-3 py-2 text-sm text-white hover:bg-stone-700"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className={`${isLoading ? " bg-stone-400" : "bg-red-500 hover:bg-red-700"} mb-4 flex rounded-full  px-3 py-2 text-sm text-white `}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </>
  );
};

export default ManageHotel;
