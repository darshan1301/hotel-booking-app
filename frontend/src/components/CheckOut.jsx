import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const Checkout = ({ hotel, cancelForm, paymentIntent, confirmBooking }) => {
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const elements = useElements();
  const onCancel = () => {
    cancelForm();
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(res);

      if (res.paymentIntent?.status === "succeeded") {
        confirmBooking({
          firstName: e.target.elements.firstName.value,
          lastName: e.target.elements.lastName.value,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onConfirm}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-lg backdrop-filter">
        <div className="rounded-lg border border-stone-500 bg-stone-50 p-8 text-stone-700">
          <div className="mb-4 flex items-center justify-center rounded-xl border bg-white px-2 py-3">
            <div>
              <img src="/airbnb.png" alt={`nodenest Logo`} className="h-8" />
            </div>
            <div className="px-4 text-2xl font-medium text-red-500">
              nodenest
            </div>
          </div>
          <div className="flex w-full justify-center">
            <h2 className="my-4 text-3xl font-extralight uppercase text-stone-500 ">
              Checkout Summary
            </h2>
          </div>

          <div className="mb-6 mt-4">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <p>
              {hotel.city}, {hotel.country}
            </p>
            <p>{paymentIntent.totalNights} Nights</p>
          </div>

          <div className="mb-4 flex items-center justify-between border-t pt-4">
            <p className="uppercase">Total Cost:</p>
            <div className="text-xl font-bold">
              ${(paymentIntent.totalCost / 100).toFixed(2)}
            </div>
          </div>
          <div className="mb-2 border-t pt-6">
            <div>
              <label>First Name: </label>
              <input
                name="firstName"
                type="text"
                placeholder="first Name"
                className="mb-1 w-fit rounded-xl border px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label>Last Name: </label>
              <input
                name="lastName"
                type="text"
                placeholder="last Name"
                className="mb-1 w-fit rounded-xl border px-2 py-1 text-sm"
              />
            </div>
          </div>

          <label className="text-sm text-stone-700">
            Enter Your Card Details:
          </label>
          <CardElement
            className="mb-4 rounded-xl border p-2 text-stone-700"
            id="payment-element"
            options={{
              style: {
                base: {
                  fontSize: "12px",
                  color: "#000",
                },
              },
            }}
          />
          <div className="flex justify-between">
            <button
              className="focus:shadow-outline-red mr-6 rounded-full  bg-gray-500 px-4 py-2 uppercase text-white hover:bg-gray-500 focus:outline-none active:bg-gray-700"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus:shadow-outline-gray ml-6 rounded-full bg-red-500 px-4  py-2 uppercase text-white hover:bg-red-600 focus:outline-none active:bg-gray-700"
            >
              {isLoading ? "...Processing" : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
