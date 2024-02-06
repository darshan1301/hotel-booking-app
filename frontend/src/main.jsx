import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./reduxStore/reduxStore.js";
import { ManageHotelProvider } from "./contexts/ManageHotelContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PopupMessageProvider } from "./contexts/PopupMessageContext.jsx";
import { SearchHotelProvider } from "./contexts/SearchHotelContext.jsx";
import { StripeProvider } from "./contexts/StripeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PopupMessageProvider>
      <SearchHotelProvider>
        <AuthProvider>
          <StripeProvider>
            <Provider store={store}>
              <ManageHotelProvider>
                <App />
              </ManageHotelProvider>
            </Provider>
          </StripeProvider>
        </AuthProvider>
      </SearchHotelProvider>
    </PopupMessageProvider>
  </React.StrictMode>,
);
