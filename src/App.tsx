import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dictionary } from "./examples/2-ciclos-de-vida";
import { DictionaryHooks } from "./examples/3-hooks/2-context";
import { DictionaryReducer } from "./examples/3-hooks/3-reducer";
import { DictionaryCallbackMemo } from "./examples/3-hooks/4-callback-e-memo";
import { TodoListClasses } from "./examples/4-evolucao/1-class";
import { TodoListHighOrder } from "./examples/4-evolucao/2-high-order-component/component";
import { TodoListHooks } from "./examples/4-evolucao/3-hooks";
import { TodoListCustomHook } from "./examples/4-evolucao/4-custom-hooks/component";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/2-ciclos-de-vida" component={Dictionary} />
        <Route exact path="/3-hooks/2-context" component={DictionaryHooks} />
        <Route exact path="/3-hooks/3-reducer" component={DictionaryReducer} />
        <Route
          exact
          path="/3-hooks/4-memo-e-callback"
          component={DictionaryCallbackMemo}
        />
        <Route exact path="/4-evolucao/1-class" component={TodoListClasses} />
        <Route
          exact
          path="/4-evolucao/2-high-order-components"
          component={TodoListHighOrder}
        />
        <Route exact path="/4-evolucao/3-hooks" component={TodoListHooks} />
        <Route
          exact
          path="/4-evolucao/4-custom-hooks"
          component={TodoListCustomHook}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
