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
    const result = await runInfluxQuery('tvl = from(bucket: "my-bucket") |> range(start: 1593786824) |> filter(fn: (r) => r["_measurement"] == "tvl") |> filter(fn: (r) => r["_field"] == "tvl") |> last() price = from(bucket: "my-bucket") |> range(start: 1593786824) |> filter(fn: (r) => r["_measurement"] == "price")|> last() usd_tvl = join(tables: {tvl: tvl, price: price}, on: ["symbol"]) |> map(fn: (r) => ({time: r._time_tvl, tvl: r._value_tvl, tvl_usd: r._value_tvl * r._value_price, price: r._value_price, symbol: r.symbol})) |> yield(name: "1")');
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
            <td>{currentRow.symbol}</td>
            <td>{currentRow.price}</td>
            <td>{currentRow.tvl}</td>
            <td>{currentRow.tvl_usd}</td>
            <td>{currentRow.time}</td>
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
                <th>Symbol</th>
                <th>Price</th>
                <th>Tvl</th>
                <th>Tvl_usd</th>
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
