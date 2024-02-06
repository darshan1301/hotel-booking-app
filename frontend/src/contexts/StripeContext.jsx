import { loadStripe } from "@stripe/stripe-js";
import { createContext, useContext } from "react";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PK;

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const StripeContext = createContext();
export const StripeProvider = ({ children }) => {
  return (
    <StripeContext.Provider value={{ stripePromise }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripePromise = () => {
  return useContext(StripeContext);
};
