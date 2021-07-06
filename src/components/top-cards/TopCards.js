import React, { Component } from "react";
import NumberIconBox from "../NumberIconBox";

export class TopCards extends Component {
  render() {
    return (
      <div className="container top-cards-container">
        <div className="row no-gutters">
          <div className="col-lg-12 d-flex align-self-stretch col-sm-12 col-xs-12 card p-1">
            <div className="row d-flex align-self-stretch justify-content-center no-gutters">
              <div className="col-lg-3 col-sm-12 col-xs-12 top-card m-1">
                <NumberIconBox
                  title="Total TXS"
                  query='from(bucket: "my-bucket") |> range(start: -30d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount" and r["bridge"] == "ethereum") |> group(columns: [ "_field"]) |> count()'
                  iconCode="BsFillPieChartFill"
                />
              </div>
              <div className="col-lg-3 col-sm-12 col-xs-12 top-card m-1">
                <NumberIconBox
                  title="Total bridge user"
                  query='from(bucket: "my-bucket") |> range(start: 1593786824) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["bridge"] == "ethereum") |> group(columns: ["from"], mode: "by") |> count() |> group(columns: ["_field"], mode: "by") |> count()'
                  iconCode="BsPeopleFill"
                />
              </div>
              <div className="col-lg-5 col-sm-12 col-xs-12 top-card m-1">
                <NumberIconBox
                  title="Total bridge user"
                  query='from(bucket: "my-bucket") |> range(start: 1593786824) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["bridge"] == "ethereum") |> group(columns: ["from"], mode: "by") |> count() |> group(columns: ["_field"], mode: "by") |> count()'
                  iconCode="BsPeopleFill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopCards;
