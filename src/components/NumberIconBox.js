import React, { Component } from "react";
import { FaBattleNet } from "react-icons/fa";
import { BsFillPieChartFill, BsPeopleFill } from "react-icons/bs";
import { MdTimeline } from 'react-icons/md';
import { IconContext } from "react-icons";
import { runInfluxQuery } from "../api/query_runner";

export class NumberIconBox extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.iconCode = props.iconCode;
    this.query = props.query;
    // the graphic related props
    this.staticIcon = "";
    switch (this.iconCode) {
      case "FaBattleNet":
        this.staticIcon = <FaBattleNet />;
        break;
      case "BsPeopleFill":
        this.staticIcon = <BsPeopleFill />;
        break;
      default:
        this.staticIcon = <BsFillPieChartFill />;
        break;
    }
    this.state = {
      isFetching: false,
      data: [],
    };
  }

  async fetchData() {
    const result = await runInfluxQuery(
      this.query
    );
    this.setState({ data: result[0], isFetching: false });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-2">
            <div className="card-icon-container">
              <IconContext.Provider value={{ color: "#82CA9D", size: "20px" }}>
                <div><MdTimeline /></div>
              </IconContext.Provider>
            </div>
          </div>
          <div className="col-10">
            <p>{this.title}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-12">
            <div className="card-body-icon-container">
              <IconContext.Provider value={{ color: "#82CA9D", size: "35px" }}>
                {this.staticIcon}
              </IconContext.Provider>
              <p className="value">{typeof(this.state.data) != "undefined" && this.state.data._value}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NumberIconBox;
