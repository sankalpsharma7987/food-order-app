import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import GoogleAnalytics from "./components/Analytics/GoogleAnalytics";
import CartProvider from "./store/CartProvider";
ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById("root")
);
ReactDOM.render(<GoogleAnalytics />, document.getElementById("analytics"));
