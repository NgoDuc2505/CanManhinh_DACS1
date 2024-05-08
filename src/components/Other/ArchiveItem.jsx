// import React from 'react'

import { Typography } from "antd";
import style from "./archiveItem.module.css";
function ArchiveItem({imgSrc, detail}) {
  const { Paragraph } = Typography;
  const { item_display, img_show } = style;
  return (
    <div className={item_display}>
      <img className={img_show} src={imgSrc} alt="location" />
      <Paragraph style={{fontSize: '16px',fontWeight: 600 ,textAlign:'center', color:'#f2e7d1'}}>
        {detail.split(',')[0]}
        <br />
        {detail.split(',')[1]}
      </Paragraph>
    </div>
  );
}

export default ArchiveItem;
