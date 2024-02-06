export const initialState = {
  name: "",
  city: "",
  country: "",
  description: "",
  pricePerNight: 1,
  starRating: null,
  type: "",
  facilities: [],
  adultCount: 1,
  childCount: 0,
  imageUrls: [],
};

export function manageHotelReducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "city":
      return { ...state, city: action.payload };
    case "country":
      return { ...state, country: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "pricePerNight":
      return { ...state, pricePerNight: action.payload };
    case "starRating":
      return { ...state, starRating: action.payload };
    case "type":
      return { ...state, type: action.payload };
    case "facilities":
      return { ...state, facilities: action.payload };
    case "adultCount":
      return { ...state, adultCount: action.payload };
    case "childCount":
      return { ...state, childCount: action.payload };
    case "imageUrls":
      return { ...state, imageUrls: action.payload };
    case "deleteImage": {
      const newImages = state.imageUrls.filter(
        (item) => item !== action.payload,
      );
      console.log("New Images:", newImages);

      return { ...state, imageUrls: newImages };
    }

    case "editHotel":
      return {
        ...state,
        name: action.payload.name,
        city: action.payload.city,
        country: action.payload.country,
        description: action.payload.description,
        pricePerNight: action.payload.pricePerNight,
        starRating: action.payload.starRating,
        type: action.payload.type,
        facilities: action.payload.facilities,
        adultCount: action.payload.adultCount,
        childCount: action.payload.childCount,
        imageUrls: action.payload.imageUrls,
      };
    case "resetManageHotelForm":
      return initialState;
    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
}
