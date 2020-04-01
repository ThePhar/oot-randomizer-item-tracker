import React from "react";
import ReactDOM from "react-dom";

import "normalize-css/normalize.css";
import "./index.scss";

import TestItemRendering from "./components/test-components/TestItemRendering";

ReactDOM.render(
    <TestItemRendering />,
    document.getElementById("root")
);
