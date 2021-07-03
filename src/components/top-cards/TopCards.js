import React, { Component } from "react";
import BigBarChart from "../charts/BigBarChart";
import NumberIconBox from "../NumberIconBox";

export class TopCards extends Component {
  render() {
    return (
      <div className="container p-1 top-cards-container">
        <div className="row no-gutters">
          <div className="col-lg-8 d-flex align-self-stretch col-sm-4 col-xs-12 card p-1">
            <div className="d-flex align-self-stretch justify-content-center no-gutters">
              <div className="col-lg-3 col-xs-12 top-card m-1">
                <NumberIconBox
                  icon=""
                  title="Some title"
                  value="20"
                  iconCode="BsFillPieChartFill"
                />
              </div>
              <div className="col-lg-3 col-xs-12 top-card m-1">
                <NumberIconBox
                  icon=""
                  title="Some title"
                  value="20"
                  iconCode="BsFillPieChartFill"
                />
              </div>
              <div className="col-lg-5 col-xs-12 top-card m-1">
                <NumberIconBox
                  icon=""
                  title="Some title"
                  value="20"
                  iconCode="BsFillPieChartFill"
                />
              </div>
            </div>

            <div className="d-flex align-self-stretch justify-content-center no-gutters">
              <div className="col-lg-5 col-xs-12 top-card m-1">
                <NumberIconBox
                  icon=""
                  title="Some title"
                  value="20"
                  iconCode="BsFillPieChartFill"
                />
              </div>

              <div className="col-lg-3 col-xs-12 top-card m-1">
                <NumberIconBox
                  icon=""
                  title="Some title"
                  value="20"
                  iconCode="BsFillPieChartFill"
                />
              </div>

              <div className="col-lg-3 col-xs-12 top-card m-1">
                <NumberIconBox
                  icon=""
                  title="Some title"
                  value="20"
                  iconCode="BsFillPieChartFill"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-4 col-xs-12 card top-card p-1">
            <BigBarChart />
          </div>
        </div>
      </div>
    );
  }
}

export default TopCards;
