import React, { Component } from "react";
import axois from "axios";
import { Table } from "react-bootstrap";

export class AnalyticsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
    };
  }
  fetchData() {
    const url = "http://127.0.0.1:9090/api/v1/query";
    const params =
      'from(bucket: "my-bucket") |> range(start: -1h) |> filter(fn: (r) => r["_measurement"] == "blockchain") |> filter(fn: (r) => r["_field"] == "block_number") |> filter(fn: (r) => r["network"] == "ethereum") |> last()';
    return new Promise((resolve) => {
      axois
        .post(url, params, {
          headers: {},
        })
        .then(function (response) {
          resolve(response.data.data.result);
        })
        .catch(function (error) {
          console.log(error);
          resolve(error);
        });
    });
  }
  async startFetchData() {
    this.setState({ ...this.state, isFetching: true });
    const result = await this.fetchData();
    console.log(result[0]);
    this.setState({ data: result, isFetching: false });
  }
  componentDidMount() {
    this.startFetchData();
  }
  render() {
    let tableRows = [];
    for (let i = 0; i <= this.state.data.length; i++) {
      let currentRow = this.state.data[i];
      if (typeof currentRow != "undefined") {
        tableRows.push(
          <tr>
            <td>{i+1}</td>
            <td>{currentRow.network}</td>
            <td>{currentRow._measurement}</td>
            <td>{currentRow._value}</td>
            <td>{currentRow._start}</td>
            <td>{currentRow._stop}</td>
            <td>{currentRow._time}</td>
          </tr>
        );
      }
    }
    return (
      <>
        <div className="container" style={{ marginTop: "20px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Network</th>
                <th>Measurement</th>
                <th>Value</th>
                <th>Start</th>
                <th>Stop</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default AnalyticsList;
