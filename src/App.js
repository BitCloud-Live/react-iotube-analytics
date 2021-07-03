import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/navigation/Navigation";
import { TopCards } from "./components/top-cards/TopCards";
import {SearchBox} from './components/SearchBox';
import {Footer} from './components/Footer';
import {AnalyticsList} from './components/AnalyticsList';
import "./styles/App.css";

function App() {
  return (
    <>
      <Navigation />
      <SearchBox />
      <TopCards />
      <AnalyticsList />
      <Footer />
    </>
  );
}

export default App;
