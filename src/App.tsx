import React from "react";
import MyCombobox from "./pages/page5";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import Register from "./pages/Register";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import Page4 from "./pages/page4";
import store from "./store/index";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop";

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
          <Route path="/Page3" element={<Page3 />} />
          <Route path="/Page4" element={<Page4 />} />
          {/* <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}
