import React, { Component } from "react";
import { FaBattleNet } from "react-icons/fa";
import { BsFillPieChartFill, BsPeopleFill } from "react-icons/bs";
import { FaCommentDollar } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { MdTimeline } from 'react-icons/md';
import { IconContext } from "react-icons";
import { runInfluxQuery } from "../api/query_runner";
import { Context } from '../reducer/Store';

export class NumberIconBox extends Component {

  static contextType = Context;

  constructor(props) {
    super(props);
    this.title = props.title;
    this.iconCode = props.iconCode;
    this.valueType = props.valueType;
    // the graphic related props
    this.staticIcon = "";
    switch (this.iconCode) {
      case "FaBattleNet":
        this.staticIcon = <FaBattleNet />;
        break;
      case "BsPeopleFill":
        this.staticIcon = <BsPeopleFill />;
        break;
      case "FaCommentDollar":
        this.staticIcon = <FaCommentDollar />
        break;
      case "BiDollar":
        this.staticIcon = <BiDollar />
        break;
      default:
        this.staticIcon = <BsFillPieChartFill />;
        break;
    }

    this.state = {
      isFetching: false,
      data: [],
      network: 'ethereum',
      query: props.query
    };
  }

  async fetchData(network) {
    let q = this.state.query.replace(/%\w+%/g, network);
    const result = await runInfluxQuery(
      q
    );
    this.setState({ ...this.state, network: network, data: result[0], isFetching: false });
  }

  componentDidMount() {
    this.fetchData('ethereum');
  }
  componentDidUpdate() {
    const [contextState,] = this.context;
    if (contextState.network !== this.state.network) {
      this.setState({ ...this.state, network: contextState.network });
      this.fetchData(contextState.network);
    }
  }

  render() {
    let value = 0;
    if (this.valueType === 'int') {
      value = typeof (this.state.data) != "undefined" && typeof (this.state.data._value) != "undefined" && parseInt(this.state.data._value);
    } else {
      value = typeof (this.state.data) != "undefined" && typeof (this.state.data._value) != "undefined" && this.state.data._value.toFixed(4);

    }

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
              {!this.state.isFetching && <p className="value">{value}</p>}
              {this.state.isFetching && <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NumberIconBox;
