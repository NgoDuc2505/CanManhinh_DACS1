import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Spin } from "antd";

const LazyHome = lazy(() => import("../layouts/HomeTemplate"));
const LazyAdmin = lazy(() => import("../layouts/Admin/AdminTemplate"));
const LazyClient = lazy(() =>
  import("../components/ClientComponents/ClientComponent")
);
const LazyBooking = lazy(() => import("../components/BookingForm/BookingForm"));
const LazyLogin = lazy(() =>
  import("../components/AdminComponents/Login/Login")
);
const LazyRegister = lazy(() =>
  import("../components/AdminComponents/Register/Register.jsx")
);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LazyHome></LazyHome>,
//     errorElement: <Spin spinning={true} fullscreen style={{opacity: '.7'}} />,
//     children:[
//       {
//         path: "/",
//         element: <LazyClient></LazyClient>
//       },
//       {
//         path: "/booking-now",
//         element: <LazyBooking></LazyBooking>
//       },
//       {
//         path: "/login",
//         element: <LazyLogin></LazyLogin>
//       },
//       {
//         path: "/register",
//         element: <LazyRegister></LazyRegister>
//       }
//     ]
//   },
//   {
//     path: "/adminCMH",
//     errorElement: <Spin spinning={true} fullscreen style={{opacity: '.7'}} />,
//     element: <LazyAdmin></LazyAdmin>
//   }
// ]);
const RootRouterComponent = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  let { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <Suspense>
      <Outlet></Outlet>
    </Suspense>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouterComponent></RootRouterComponent>,
    children: [
      {
        path: "/",
        element: <LazyHome></LazyHome>,
        errorElement: (
          <Spin spinning={true} fullscreen style={{ opacity: ".7" }} />
        ),
        children: [
          {
            path: "/",
            element: <LazyClient></LazyClient>,
          },
          {
            path: "/booking-now",
            element: <LazyBooking></LazyBooking>,
          },
          {
            path: "/login",
            element: <LazyLogin></LazyLogin>,
          },
          {
            path: "/register",
            element: <LazyRegister></LazyRegister>,
          },
        ],
      },
      {
        path: "/adminCMH",
        errorElement: (
          <Spin spinning={true} fullscreen style={{ opacity: ".7" }} />
        ),
        element: <LazyAdmin></LazyAdmin>,
      },
    ],
  },
]);

export default router;
export { RootRouterComponent };
