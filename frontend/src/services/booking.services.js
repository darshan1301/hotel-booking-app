import base_url from "../base_url";

/////////GET MY BOOKINGS
export const getMyBookings = async (headers) => {
  try {
    const response = await fetch(`${base_url}/bookings/`, {
      headers: {
        ...headers,
      },
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

/////////PAYMENT INTENT
export const createPaymentIntent = async (headers, hotelId, dateRange) => {
  try {
    const response = await fetch(
      `${base_url}/bookings/${hotelId}/payment-intent`,
      {
        method: "POST",
        headers: {
          ...headers,
          "content-type": "application/json",
        },
        body: JSON.stringify({ dateRange }),
      },
    );

    return response;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

////////ADD MY BOOKING
export const createMyBooking = async (headers, hotelId, body) => {
  try {
    const response = await fetch(
      `${base_url}/bookings/create-booking/${hotelId}`,
      {
        method: "POST",
        headers: {
          ...headers,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    return response;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
