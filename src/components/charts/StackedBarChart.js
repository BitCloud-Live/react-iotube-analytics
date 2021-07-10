import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { runInfluxQuery } from "../../api/query_runner";
import DatePicker from "react-datepicker";
import { Context } from "../../reducer/Store";
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
  static contextType = Context;

  constructor(props) {
    super(props);
    this.chartTitle = props.chartTitle;
    this.toggleVariable = props.toggleVariable;
    // this supports two values: dropDown and Date
    // Date will renders date component and dropDown renders a dropDown component
    this.dateRenderer = props.dateRenderer;
    console.log(props.aggregateApproach);
    this.aggregateApproach =
      typeof props.aggregateApproach === "undefined"
        ? "count"
        : props.aggregateApproach;
    this.state = {
      isFetching: false,
      data: {},
      startDate: new Date(),
      query: props.query,
      network: "ethereum",
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
  async fetchData(network, query) {
    let q = query.replace(/%\w+%/g, network);
    const result = await runInfluxQuery(q);
    if (!Array.isArray(result)) {
      return [];
    }
    // process data
    const dailyResult = result.map(this.groupday);
    // group array based on their symbol
    let grouped = _.groupBy(dailyResult, "day");
    let labels = [];
    let dataArrays = {};
    const priceResult = await runInfluxQuery(
      `from(bucket: "my-bucket") |> range(start: -14d) |> filter(fn: (r) => r["_measurement"] == "price") |> last()`
    );
    const priceDictionary = {};
    for (let index in priceResult) {
      if (!(priceResult[index].symbol in priceDictionary)) {
        priceDictionary[priceResult[index].symbol] = priceResult[index]._value;
      }
    }
    console.log(priceDictionary);
    for (const gdata in grouped) {
      const counter = {};
      // grouped[gdata][0]["time"].toString().substr(0, 10)
      labels.push("");

      if (this.aggregateApproach === "sum") {
        for (const item in grouped[gdata]) {
          const key = grouped[gdata][item][this.toggleVariable];
          if (typeof grouped[gdata][item].value !== "undefined") {
            if (key in counter) {
              counter[key] +=
                grouped[gdata][item].value *
                priceDictionary[grouped[gdata][item].symbol];
            } else {
              counter[key] =
                grouped[gdata][item].value *
                priceDictionary[grouped[gdata][item].symbol];
            }
          }
        }
      } else {
        for (const item in grouped[gdata]) {
          const key = grouped[gdata][item][this.toggleVariable];
          if (key in counter) {
            counter[key] += 1;
          } else {
            counter[key] = 1;
          }
        }
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

    let datasets = [];
    let colorChanger = 0;
    for (let d in dataArrays) {
      let datum = {
        label: d,
        backgroundColor: colors[colorChanger],
        stack: "2",
        data: dataArrays[d],
      };
      if (d === "left") {
        datum.label = `left=from ${this.state.network}`;
      }
      if (d === "right") {
        datum.label = `right=from iotex`;
      }
      datasets.push(datum);
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
    this.fetchData(this.state.network, this.state.query);
  }
  onDateChanged(date) {
    // here the query should be updated
    let query = this.state.query;
    query = query.replace(
      / *\(start:[^)]*\) */g,
      `(start: ${date.getTime() / 1000}) `
    );
    this.setState({
      ...this.state,
      startDate: new Date(date),
      query: query,
    });
    this.fetchData(this.state.network);
  }
  onDropDownChange(date) {
    let query = this.state.query;
    query = query.replace(/ *\(start:[^)]*\) */g, `(start: ${date.value})`);
    this.setState({
      ...this.state,
      startDate: date.value,
      query: query,
    });
    this.fetchData(this.state.network, query);
  }
  componentDidUpdate() {
    const [contextState] = this.context;
    if (contextState.network !== this.state.network) {
      this.setState({ ...this.state, network: contextState.network });
      this.fetchData(contextState.network);
    }
  }
  render() {
    return (
      <>
        <div className="chart-box" style={{ marginTop: "10px" }}>
          <div>
            <div className="row">
              <div className="col-6">
                <h4>{this.chartTitle}</h4>
              </div>
              <div className="col-6" style={{ textAlign: "right" }}>
                <label>Start time: </label> &nbsp; &nbsp;
                {this.dateRenderer === "Date" && (
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={(date) => this.onDateChanged(date)}
                  />
                )}
                {this.dateRenderer === "dropDown" && (
                  <select
                    onChange={(e) =>
                      this.onDropDownChange({ value: e.target.value })
                    }
                    defaultValue='-12d'
                  >
                    <option value="-1d">Last Day</option>
                    <option value="-12d">
                      Last Week
                    </option>
                    <option value="-1mo">Last Month</option>
                    <option value="-1y">Last Year</option>
                  </select>
                )}
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
