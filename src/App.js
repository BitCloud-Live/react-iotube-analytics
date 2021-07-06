import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/navigation/Navigation";
import { TopCards } from "./components/top-cards/TopCards";
import { StackedBarChart } from "./components/charts/StackedBarChart";
import { SearchBox } from "./components/SearchBox";
import { Footer } from "./components/Footer";
// import { AnalyticsList } from "./components/AnalyticsList";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/App.css";

function App() {
  return (
    <>
      <Navigation />
      <SearchBox />
      <TopCards />
      <StackedBarChart
        chartTitle="#Tx in vs #Tx out"
        toggleVariable="bridge_side"
        query='from(bucket: "my-bucket") |> range(start: 2021-06-06T07:08:22.669468983Z) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount") |> filter(fn: (r) => r["bridge"] == "ethereum") |> group(columns: ["bridge_side"]) |> sort(columns: ["_time"]) |> map(fn: (r) => ({ time: r._time, symbol: r.symbol, bridge_side: r.bridge_side }))'
      />
      <StackedBarChart
        chartTitle="New users history"
        toggleVariable="bridge_side"
        query='from(bucket: "my-bucket") |> range(start: 1593786824) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["bridge"] == "ethereum") |> group(columns: ["from", "_time", "_field", "bridge_side"], mode: "by") |> count() |> group(columns: ["_field", "bridge_side"], mode: "by") |> sort(columns: ["_time"]) |> map(fn: (r) => ({time: r._time, bridge_side: r.bridge_side }))'
      />
      <StackedBarChart
        chartTitle="#Tx by symbol"
        toggleVariable="symbol"
        query='from(bucket: "my-bucket") |> range(start: 1593786824) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount") |> filter(fn: (r) => r["bridge"] == "ethereum") |> group(columns: ["symbol"]) |> sort(columns: ["_time"]) |> map(fn: (r) => ({time: r._time, symbol: r.symbol }))'
      />
      <StackedBarChart
        chartTitle="Stablecoins #Tx"
        toggleVariable="bridge_side"
        query='from(bucket: "my-bucket") |> range(start: 2021-06-06T07:08:22.669468983Z) |> filter(fn: (r) => r["_measurement"] == "tx") |> filter(fn: (r) => r["_field"] == "amount") |> filter(fn: (r) => r["bridge"] == "ethereum") |> filter(fn: (r) => r["symbol"] =~ /.*USD.*/) |> group(columns: ["symbol", "bridge_side"]) |> sort(columns: ["_time"]) |> map(fn: (r) => ({time: r._time, symbol: r.symbol, bridge_side: r.bridge_side }))'
      />
      {/* <AnalyticsList /> */}
      <Footer />
    </>
  );
}

export default App;
