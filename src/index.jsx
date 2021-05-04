import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Welcome, Chat, ChatLog, Operator } from "./screens";

import "bootstrap/dist/css/bootstrap.min.css";

const indexRoutes = [
  // { path: '/wizard/', component: Wizard },
  { path: "/chat/", component: Chat },
  { path: "/chatlog/", component: ChatLog },
  { path: "/operator", component: Operator },
  { path: "/", component: Welcome },
];

const dom = (
  <Router>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>
);

ReactDOM.render(dom, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
