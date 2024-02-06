import base_url from "../base_url";

//////////GET ALL HOTEL FOR HOME PAGE
export const getAllHotels = async () => {
  try {
    const response = await fetch(`${base_url}/api/`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};

///////////GET SEARCHED HOTELS
export const getSearchHotels = async (queryParams) => {
  const query = Object.keys(queryParams)
    .map((item) => `${item}=${queryParams[item]}`)
    .join("&");
  try {
    console.log("query", query);
    const response = await fetch(`${base_url}/api/search?${query}`, {
      method: "POST",
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error finding the hotels.", error.message);
    return null;
  }
};

/////////GET HOTEL DETAILS
export const getHotelDetails = async (hotelId) => {
  try {
    const response = await fetch(`${base_url}/api/${hotelId}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

///AUTHED SERVICES

//////////GET  MY HOTELS
export const getMyHotels = async (headers) => {
  try {
    const response = await fetch(`${base_url}/myhotels`, {
      method: "GET",
      headers: {
        ...headers,
      },
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/////////DELETE MY HOTEL
export const deleteMyHotel = async (headers, hotelId) => {
  try {
    const response = await fetch(`${base_url}/myhotels/${hotelId}`, {
      method: "DELETE",
      headers: { ...headers },
    });
    return response;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

//////////ADD MY HOTEL
export const addMyHotel = async (formData, headers) => {
  try {
    const response = await fetch(`${base_url}/myhotels/addHotel`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        ...headers,
      },
      body: formData,
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//////////UPDATE MY HOTEL
export const updateMyHotel = async (hotelId, formData, headers) => {
  try {
    const response = await fetch(`${base_url}/myhotels/${hotelId}`, {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        ...headers,
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
