import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Welcome, Chat, ChatLog, Operator,BriefScreen } from "./screens";

import "bootstrap/dist/css/bootstrap.min.css";

const indexRoutes = [
  // { path: '/wizard/', component: Wizard },
  { path: "/chat/", component: Chat ,exact: true },
  { path: "/brief/:discussion_id", component: BriefScreen ,exact: true },

  { path: "/bot/", component: Chat ,exact: true, bot:'gpt3' },

  { path: "/chatlog/:discussion_id", component: ChatLog ,exact: false},
  { path: "/chatlog/", component: ChatLog ,exact: false},
  { path: "/operator", component: Operator ,exact: true },
  { path: "/", component: Welcome  ,exact: true},
];

const dom = (
  <Router>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={() => <prop.component {...prop}/> } key={key} exact={prop.exact} />;
      })}
    </Switch>
  </Router>
);

ReactDOM.render(dom, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
