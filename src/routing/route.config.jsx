import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { Spin } from "antd";
const LazyHome = lazy(()=>import("../layouts/HomeTemplate"));
const LazyAdmin = lazy(()=>import("../layouts/Admin/AdminTemplate"));
const LazyClient = lazy(()=>import("../components/ClientComponents/ClientComponent"));
const LazyBooking = lazy(()=>import("../components/BookingForm/BookingForm"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyHome></LazyHome>,
    errorElement: <Spin spinning={true} fullscreen style={{opacity: '.7'}} />,
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
