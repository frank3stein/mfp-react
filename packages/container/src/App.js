import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp";
import Header from "./components/Header";

// In this way we add another level of unique prefix to css so they wont clash when they are build.
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
// In order to make the component generic, we create a react component separetely using the mount function
// import { mount } from 'marketing/Marketing'

// console.log(mount)
export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Switch>
            {/* so any route /auth/asdasdas goes to first route */}
            <Route path="/auth" component={AuthApp} />
            <Route path="/" component={MarketingApp} />
          </Switch>
          {/* <MarketingApp /> */}
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
