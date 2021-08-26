import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

// import MarketingApp from "./components/MarketingApp";
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
// import AuthApp from "./components/AuthApp";
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));
import Header from "./components/Header";

import Progress from "./components/Progress";

// In this way we add another level of unique prefix to css so they wont clash when they are build.
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
// In order to make the component generic, we create a react component separetely using the mount function
// import { mount } from 'marketing/Marketing'

// console.log(mount)

const history = createBrowserHistory();
export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push(`/dashboard`);
    }
  }, [isSignedIn]);
  return (
    // browser router to router https://www.udemy.com/course/microfrontend-course/learn/lecture/23275366#questions/14501458
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              {/* so any route /auth/asdasdas goes to first route */}
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/">
                <MarketingLazy isSignedIn={isSignedIn} />
              </Route>
            </Switch>
          </Suspense>
          {/* <MarketingApp /> */}
        </div>
      </StylesProvider>
    </Router>
  );
};
