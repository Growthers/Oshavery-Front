import React from "react";
import { Route, Switch } from "wouter";
import { About, Home } from "./pages";

const Router: React.FC = () => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
);

export default Router;
