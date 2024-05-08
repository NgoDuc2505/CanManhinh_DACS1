// import React, {  } from "react";
import { Layout } from "antd";

import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import DefineContent from "../components/DefineServices/DefineContent";
import Description from "../components/Desciption/Description";
import Needer from "../components/Needer/Needer";
import QandA from "../components/QandA/QandA";
import Introduce from "../components/Introduce/Introduce";
import Feedback from "../components/Feedback/Feedback";
import BookingNow from "../components/BookingNow/BookingNow";
import FooterComponent from "../components/Footer/FooterComponent";

function HomeTemplate() {
  const { Footer } = Layout;

  return (
    <Layout>
      <Header></Header>
      <Banner></Banner>
      <DefineContent></DefineContent>
      <Description></Description>
      <Needer></Needer>
      <QandA></QandA>
      <Introduce></Introduce>
      <Feedback></Feedback>
      <BookingNow></BookingNow>
      <FooterComponent></FooterComponent>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ngo Minh Duc 23CE014 Design ©{new Date().getFullYear()} Created by Ant | React 
      </Footer>
    </Layout>
  );
}

export default HomeTemplate;
