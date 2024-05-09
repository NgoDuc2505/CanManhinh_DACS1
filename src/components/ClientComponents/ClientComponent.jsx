// import React from 'react'

import Banner from "../Banner/Banner";
import BookingNow from "../BookingNow/BookingNow";
import DefineContent from "../DefineServices/DefineContent";
import Description from "../Desciption/Description";
import Feedback from "../Feedback/Feedback";
import Introduce from "../Introduce/Introduce";
import Needer from "../Needer/Needer";
import QandA from "../QandA/QandA";

function ClientComponent() {
  return (
    <div>
      <Banner></Banner>
      <DefineContent></DefineContent>
      <Description></Description>
      <Needer></Needer>
      <QandA></QandA>
      <Introduce></Introduce>
      <Feedback></Feedback>
      <BookingNow></BookingNow>
    </div>
  );
}

export default ClientComponent;
