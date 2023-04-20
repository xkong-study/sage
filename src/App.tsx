import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import Register from "./pages/Register";
import Page2 from "./pages/page2";
import Page4 from "./pages/page4";
import store from "./store/index";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import DestinationSearch from "./pages/DestinationSearch";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* <ScrollToTop /> */}
        <Routes>
          {/* <Route
            path="/home"
            element={<Login />}
          /> */}
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/Page4" element={<Page4 />} />
          <Route
            path="/destination-search/:predictionSearchStateKey"
            element={<DestinationSearch />}
          />
          {/* <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}
