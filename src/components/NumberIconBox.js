import React from "react";
import { FaBattleNet } from "react-icons/fa";
import { BsFillPieChartFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function NumberIconBox(props) {
  const { icon, title, value, iconCode } = props;
  let staticIcon = "";
  switch (iconCode) {
    case "FaBattleNet":
      staticIcon = <FaBattleNet />;
      break;
    default:
      staticIcon = <BsFillPieChartFill />;
      break;
  }
  let titleIcon = <FaBattleNet />;
  switch (icon) {
    default:
      titleIcon = <FaBattleNet />;
      break;
  }
  return (
    <>
      <div className="row">
        <div className="col-2">
          <div className="card-icon-container">
            <IconContext.Provider value={{ color: "#82CA9D", size: "20px" }}>
              <div>{titleIcon}</div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="col-10">
          <p>{title}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-12">
          <div className="card-body-icon-container">
            <IconContext.Provider value={{ color: "#82CA9D", size: "35px" }}>
              {staticIcon}
            </IconContext.Provider>
             <p className="value">{value}</p>
          </div>
         
        </div>
      </div>
    </>
  );
}
