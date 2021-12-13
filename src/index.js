import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import GoogleAnalytics from "./components/Analytics/GoogleAnalytics";
ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<GoogleAnalytics />, document.getElementById("analytics"));
