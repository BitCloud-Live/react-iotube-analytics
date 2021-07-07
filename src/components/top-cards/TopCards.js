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
                  query={`from(bucket: "my-bucket") |> range(start: -30d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount" and r["bridge"] == "%bridge%") |> group(columns: [ "_field"]) |> count()`}
                  iconCode="BsFillPieChartFill"
                />
              </div>
              <div className="col-lg-3 col-sm-12 col-xs-12 top-card m-1">
                <NumberIconBox
                  title="Total bridge user"
                  query={`from(bucket: "my-bucket") |> range(start: -30d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["bridge"] == "%bridge%") |> group(columns: ["from"], mode: "by") |> count() |> group(columns: ["_field"], mode: "by") |> count()`}
                  iconCode="BsPeopleFill"
                />
              </div>
              <div className="col-lg-5 col-sm-12 col-xs-12 top-card m-1">
                <NumberIconBox
                  title="Total bridge user"
                  query={`from(bucket: "my-bucket") |> range(start: -30d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["bridge"] == "%bridge%") |> group(columns: ["from"], mode: "by") |> count() |> group(columns: ["_field"], mode: "by") |> count()`}
                  iconCode="BsPeopleFill"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-12 d-flex align-self-stretch col-sm-12 col-xs-12 card p-1">
            <div className="row d-flex align-self-stretch justify-content-center no-gutters">
              <div className="col-lg-5 col-sm-12 col-xs-12 top-card m-1">
                <NumberIconBox
                  title="$Total value locked (all bridges)"
                  query='tvl = from(bucket: "my-bucket") |> range(start: -30d) |> filter(fn: (r) => r["_measurement"] == "tvl") |> filter(fn: (r) => r["_field"] == "tvl") |> last() price = from(bucket: "my-bucket") |> range(start: -10d) |> filter(fn: (r) => r["_measurement"] == "price") |> last() usd_tvl = join(tables: {tvl: tvl, price: price}, on: ["symbol"])|> map(fn: (r) => ({_time: r._time,_value: r._value_tvl * r._value_price})) |> sum(column: "_value") |> yield(name: "symbol")'
                  iconCode="FaCommentDollar"
                />
              </div>
              <div className="col-lg-5 col-sm-12 col-xs-12 top-card m-1">
                <NumberIconBox
                  title="$Total value locked (in usd)"
                  query={`tvl = from(bucket: "my-bucket") |> range(start: -30d) |> filter(fn: (r) => r["_measurement"] == "tvl") |> filter(fn: (r) => r["_field"] == "tvl") |> filter(fn: (r) => r["network"] == "%bridge%") |> last() price = from(bucket: "my-bucket") |> range(start: -5d) |> filter(fn: (r) => r["_measurement"] == "price") |> last() usd_tvl = join(tables: {tvl: tvl, price: price}, on: ["symbol"])|> map(fn: (r) => ({_time: r._time,_value: r._value_tvl * r._value_price}))|> sum(column: "_value") |> yield(name: "symbol")`}
                  iconCode="BiDollar"
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
