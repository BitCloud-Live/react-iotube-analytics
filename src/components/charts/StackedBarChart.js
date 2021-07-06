import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { runInfluxQuery } from "../../api/query_runner";
import DatePicker from "react-datepicker";
var _ = require("lodash");

const colors = [
  "#a88add",
  "#0cc2aa",
  "#FFA500",
  "#ff2500",
  "#005aff",
  "#a500ff",
];

export class StackedBarChart extends Component {
  constructor(props) {
    super(props);
    this.query = props.query;
    this.chartTitle = props.chartTitle;
    this.toggleVariable = props.toggleVariable;
    this.startDate = new Date();
    this.state = {
      isFetching: false,
      data: {},
    };
  }
  /*
    the following code is for group by month 
    d = (d.getFullYear() - 1970) * 12 + d.getMonth();
    the following code is for group by week  
    d = Math.floor(d.getTime() / (1000 * 60 * 60 * 24 * 7)); 
  */
  groupday(value, index, array) {
    let d = new Date(value["time"]);
    d = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
    value = { ...value, day: d };
    return value;
  }
  async fetchData() {
    const result = await runInfluxQuery(this.query);
    // process data
    const dailyResult = result.map(this.groupday);
    // group array based on their symbol
    let grouped = _.groupBy(dailyResult, "day");
    let labels = [];
    let dataArrays = {};
    for (const gdata in grouped) {
      const counter = {};
      labels.push(grouped[gdata][0]["time"].toString());
      for (const item in grouped[gdata]) {
        const key = grouped[gdata][item][this.toggleVariable];
        if (key in counter) {
          counter[key] += 1;
        } else {
          counter[key] = 1;
        }
        counter[grouped[gdata][item][this.toggleVariable]] += 1;
      }
      for (const d in counter) {
        if (d in dataArrays) {
          dataArrays[d].push(counter[d]);
        } else {
          dataArrays[d] = [];
          dataArrays[d].push(counter[d]);
        }
      }
    }
    this.startDate = Date.parse(labels[0]);
    console.log(dataArrays);
    let datasets = [];
    let colorChanger = 0;
    for (const d in dataArrays) {
      datasets.push({
        label: d,
        backgroundColor: colors[colorChanger],
        stack: "2",
        data: dataArrays[d],
      });
      colorChanger += 1;
      if (colorChanger > colors.length) {
        colorChanger = 0;
      }
    }
    let data = {
      labels: labels,
      datasets: datasets,
    };
    this.setState({ ...this.state, data: data, isFetching: false });
  }
  componentDidMount() {
    this.fetchData();
  }
  onDateChanged(date) {
    // here the query should be updated
    this.query = this.query.replace(
      / *\(start:[^)]*\) */g,
      `(start: ${date.getTime() / 1000}) `
    );
    this.startDate = new Date(date);
    this.fetchData();
  }
  render() {
    return (
      <>
        <div className="container chart-box" style={{marginTop: '10px'}}>
          <div>
            <div className="row">
              <div className="col-6">
                <h4>{this.chartTitle}</h4>
              </div>
              <div className="col-6" style={{ textAlign: "right" }}>
                <label>Start time: </label> &nbsp; &nbsp;
                <DatePicker
                  selected={this.startDate}
                  onChange={(date) => this.onDateChanged(date)}
                />
              </div>
            </div>
          </div>
          <div>
            <Bar
              data={this.state.data}
              height={400}
              options={{
                offsetGridLines: true,
                drawTicks: true,
                layout: {
                  padding: {
                    top: 30,
                    right: 40,
                    bottom: 40,
                  },
                },
                legend: {
                  display: true,
                  position: "right",
                  align: "start",
                  labels: {
                    usePointStyle: true,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [
                    {
                      stacked: true,
                      ticks: {
                        padding: 5,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      stacked: true,
                      gridLines: {
                        drawBorder: false,
                      },
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 6,
                        padding: 20,
                        callback(n) {
                          if (n < 1e3) return n;
                          if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
                        },
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default StackedBarChart;
