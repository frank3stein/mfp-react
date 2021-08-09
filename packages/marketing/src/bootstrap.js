import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();
  // when history changes it will call onNavigate
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);

  // in order for container to be able to communicate with marketing, we return an object
  return {
    onParentNavigate({ pathname: nextPathname }) {
      //   console.log("Container just navigated");
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const el = document.getElementById("marketing-dev-root");
  // in development we can use the browser history as it is isolated.
  if (el) mount(el, { defaultHistory: createBrowserHistory() });
}

export { mount };
