import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Spin } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import PageNoteExits from "../components/PageNotExits/PageNoteExits.jsx";
import TableBooking from "../components/AdminComponents/TableOfUser/TableBooking.jsx";
import TableOfBookingPage from "../components/AdminComponents/TableOfBooking/TableOfBookingPage.jsx";

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

const LazyProfile = lazy(() => import("../components/Profile/Profile.jsx"));
const LazyDescription = lazy(() =>
  import("../components/DefineServices/DefineContent.jsx")
);
const LazyBookingNow = lazy(() =>
  import("../components/BookingNow/BookingNow.jsx")
);
const LazyLogout = lazy(() => import("../components/Logout/Logout.jsx"));
const queryClient = new QueryClient({});
const RootRouterComponent = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  let { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouterComponent></RootRouterComponent>,
    errorElement: <PageNoteExits></PageNoteExits>,
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
          {
            path: "/profile",
            element: <LazyProfile></LazyProfile>,
          },
          {
            path: "/services",
            element: (
              <div style={{ marginTop: "100px" }}>
                <LazyDescription></LazyDescription>
              </div>
            ),
          },
          {
            path: "support",
            element: (
              <div style={{ marginTop: "100px" }}>
                <LazyBookingNow></LazyBookingNow>
              </div>
            ),
          },
          {
            path: "logOut",
            element: <LazyLogout></LazyLogout>,
          },
        ],
      },
      {
        path: "/adminCMH",
        errorElement: (
          <Spin spinning={true} fullscreen style={{ opacity: ".7" }} />
        ),
        element: <LazyAdmin></LazyAdmin>,
        children: [
          {
            path: "",
            element: <TableBooking></TableBooking>,
          },
          {
            path: "bookingManage",
            element: <TableOfBookingPage></TableOfBookingPage>,
          },
          {
            path: "income",
            element: <h1>income</h1>,
          },
          {
            path: "feature",
            element: <h1>feat</h1>,
          },
        ],
      },
    ],
  },
]);

export default router;
export { RootRouterComponent };
