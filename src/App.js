import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/navigation/Navigation";
import { TopCards } from "./components/top-cards/TopCards";
import { StackedBarChart } from "./components/charts/StackedBarChart";
import { SearchBox } from "./components/SearchBox";
import { Footer } from "./components/Footer";
import { AnalyticsList } from "./components/AnalyticsList";
import Store from "./reducer/Store";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/App.css";

function App() {
  return (
    <>
      <Store>
        <Navigation />
        <SearchBox />
        <TopCards />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xs-12">
              <StackedBarChart
                chartTitle="#Tx in vs #Tx out"
                toggleVariable="bridge_side"
                dateRenderer="dropDown"
                aggregateApproach="count"
                query={`from(bucket: "my-bucket") |> range(start: -12d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount") |> filter(fn: (r) => r["bridge"] == "%bridge%") |> group(columns: ["bridge_side"]) |> sort(columns: ["_time"]) |> map(fn: (r) => ({ time: r._time, symbol: r.symbol, bridge_side: r.bridge_side }))`}
              />
            </div>
            <div className="col-lg-6 col-xs-12">
              <StackedBarChart
                chartTitle="New users history"
                toggleVariable="bridge_side"
                dateRenderer="dropDown"
                aggregateApproach="count"
                query={`from(bucket: "my-bucket") |> range(start: -12d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["bridge"] == "%bridge%") |> group(columns: ["from", "_time", "_field", "bridge_side"], mode: "by") |> count() |> group(columns: ["_field", "bridge_side"], mode: "by") |> sort(columns: ["_time"]) |> map(fn: (r) => ({time: r._time, bridge_side: r.bridge_side }))`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-xs-12">
              <StackedBarChart
                chartTitle="#Tx by symbol"
                toggleVariable="symbol"
                dateRenderer="dropDown"
                aggregateApproach="count"
                query={`from(bucket: "my-bucket") |> range(start: -12d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount") |> filter(fn: (r) => r["bridge"] == "%bridge%") |> group(columns: ["symbol"]) |> sort(columns: ["_time"]) |> map(fn: (r) => ({time: r._time,symbol: r.symbol}))`}
              />
            </div>
            <div className="col-lg-12 col-xs-12">
              <StackedBarChart
                chartTitle="#Total transfer in USD by symbol"
                toggleVariable="symbol"
                dateRenderer="dropDown"
                aggregateApproach="sum"
                query={`from(bucket: "my-bucket") |> range(start: -12d) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount") |> filter(fn: (r) => r["bridge"] == "%bridge%") |> group(columns: ["symbol"]) |> sort(columns: ["_time"]) |> map(fn: (r) => ({ time: r._time, symbol: r.symbol, value: r._value }))`}
              />
            </div>
          </div>
        </div>
        <AnalyticsList />
      </Store>
      <Footer />
    </>
  );
}

export default App;
