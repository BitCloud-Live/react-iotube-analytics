import React, { Component } from "react";
import { Table } from "react-bootstrap";
import {runInfluxQuery} from '../api/query_runner';

export class AnalyticsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
    };
  }
  async fetchData() {
    this.setState({ ...this.state, isFetching: true });
    const result = await runInfluxQuery('from(bucket: "my-bucket") |> range(start: -1h) |> filter(fn: (r) => r["_measurement"] == "blockchain") |> filter(fn: (r) => r["_field"] == "block_number") |> filter(fn: (r) => r["network"] == "ethereum") |> last()');
    this.setState({ data: result, isFetching: false });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    let tableRows = [];
    for (let i = 0; i <= this.state.data.length; i++) {
      let currentRow = this.state.data[i];
      if (typeof currentRow != "undefined") {
        tableRows.push(
          <tr key={i}>
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
          <Table responsive striped bordered hover>
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
