import { createBrowserRouter } from "react-router-dom";
// import HomeTemplate from "../layouts/HomeTemplate"
// import AdminTemplate from "../layouts/AdminTemplate";
// import ClientComponent from "../components/ClientComponents/ClientComponent";
import BookingForm from "../components/BookingForm/BookingForm";
import { lazy } from "react";
const LazyHome = lazy(()=>import("../layouts/HomeTemplate"));
const LazyAdmin = lazy(()=>import("../layouts/AdminTemplate"));
const LazyClient = lazy(()=>import("../components/ClientComponents/ClientComponent"));
const LazyBooking = lazy(()=>import("../components/BookingForm/BookingForm"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyHome></LazyHome>,
    children:[
      {
        path: "/",
        element: <LazyClient></LazyClient>
      },
      {
        path: "/booking-now",
        element: <LazyBooking></LazyBooking>
      }
    ]
  },
  {
    path: "/adminCMH",
    element: <LazyAdmin></LazyAdmin>
  }
]);

export default router;
