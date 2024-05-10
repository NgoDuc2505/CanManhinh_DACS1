// import React, {  } from "react";
import { Layout, Skeleton } from "antd";

import Header from "../components/Header/Header";
import FooterComponent from "../components/Footer/FooterComponent";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeTemplate() {
  const { Footer } = Layout;

  return (
    <Layout>
      <Header></Header>
      <Suspense fallback={<Skeleton active />}>
        <Outlet></Outlet>
      </Suspense>
      <FooterComponent></FooterComponent>
      <Footer
        style={{
          textAlign: "center",
          fontWeight: 800
        }}
      >
        Ngo Minh Duc 23CE014 Design ©{new Date().getFullYear()} Created by Ant |
        React
      </Footer>
    </Layout>
  );
}

export default HomeTemplate;
