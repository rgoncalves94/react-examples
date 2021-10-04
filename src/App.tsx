import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/3-evolucao/1-class" />
        <Route exact path="/3-evolucao/2-high-order-components" />
        <Route exact path="/3-evolucao/3-hooks" />
        <Route exact path="/3-evolucao/4-custom-hooks" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
