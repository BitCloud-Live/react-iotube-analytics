import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Context } from '../reducer/Store';
import {runInfluxQuery} from '../api/query_runner';


export class AnalyticsList extends Component {

  static contextType = Context;

  constructor(props) {
    super(props);
    let query = 'tvl = from(bucket: "my-bucket") |> range(start: -30d) |> filter(fn: (r) => r["_measurement"] == "tvl") |> filter(fn: (r) => r["_field"] == "tvl") |> last() price = from(bucket: "my-bucket") |> range(start: 1593786824) |> filter(fn: (r) => r["_measurement"] == "price")|> last() usd_tvl = join(tables: {tvl: tvl, price: price}, on: ["symbol"]) |> map(fn: (r) => ({time: r._time_tvl, tvl: r._value_tvl, tvl_usd: r._value_tvl * r._value_price, price: r._value_price, symbol: r.symbol})) |> yield(name: "1")';

    this.state = {
      isFetching: false,
      data: [],
      query: query,
      network: 'ethereum'
    };
  }
  async fetchData() {
    let q = this.state.query.replace(/%\w+%/g, this.state.network);
    const result = await runInfluxQuery(q);
    this.setState({ data: result, isFetching: false });
  }
  componentDidMount() {
    const [contextState, ] = this.context;
    this.setState({ ...this.state, isFetching: true, 
    network: contextState.network });
    this.fetchData();
  }
  componentDidUpdate(){
    const [contextState, ] = this.context;
    if(contextState.network !== this.state.network){
      this.setState({ ...this.state, network: contextState.network });
      this.fetchData();
    }
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
